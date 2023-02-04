const User = require('../models/userModel')
const Shop = require('../models/shopModel')
const Product = require('../models/productModel')
const { sendEmail } = require('../utils/mailer')
const crypto = require('crypto');
const asyncHandler = require('../middleware/async');



const sendTokenResponse = (user, statusCode, res) => {
  const token = user.signJWTToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      username: user.username,
      email: user.email,
      _id: user._id,
role: user.role
    }
  });
}



let code = Math.floor(1000 + Math.random() * 9000).toString()
let emailToken = crypto.createHash('sha256').update(code).digest('hex')
let emailTokenExpires = Date.now() + 15 * 60 * 1000;

const otp = Math.floor(1000 + Math.random() * 9000).toString()
const hash = crypto.createHash('sha256').update(otp).digest('hex')


/**********
// @desc: User Sign up 
// @access: Public Route
// @api: /api/v1/auth/signin
 *****/
exports.signup = async (req, res) => {
  try {
    let { email, password, username, role, name, owner } = req.body
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: 'Email and Password is required'
      })
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Email is taken'
      })
    }
    const message = `This is your verification code ${code}. It expires in 15 minutes`
    await sendEmail({ email, subject: 'Email verification', message })
    const user = await User.create({ username, email, password, emailToken, emailTokenExpires, role });
    const shopowner = await User.findOne({ email })
    await Shop.create({ name: shopowner.username, owner: shopowner._id });
    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(404).json({
      success: false,
      err: err.message
    })
  }
}


/**********
// @desc: User Sign in 
// @access: Public Route
// @api: /api/v1/auth/signin
 *****/
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Enter email and password'
      })
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }
    const isMatch = await user.comparedPassword(password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'You must verify your email to activate your account'
      })
    }
    sendTokenResponse(user, 200, res)
    // const token = signJWTToken()
    // if (user) {
    //   res.json({
    //     _id: user._id,
    //     username: user.username,
    //     email: user.email,
    //     token: sendTokenResponse()
    //   })
    // }


  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}


/**********
// @desc: Activate User
// @access: Public Route
// @api: /api/v1/auth/verify
 *****/
exports.activateUser = async (req, res) => {
  try {
    let { email, code } = req.body
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email and otp'
      })
    }
    let emailToken = crypto.createHash('sha256').update(code).digest('hex')
    const user = await User.findOne({
      email,
      emailToken,
      emailTokenExpires: { $gt: Date.now() }
      // emailTokenExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Credentials'
      })
    }
    // else if (user.emailTokenExpires > Date.now()) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Verification token is expires..Please visit http://verify.com'
    //   })

    // }
    else {
      if (user.isActive)
        return res.status(400).json({
          success: false,
          message: 'Account already activated'
        })
    }

    user.emailToken = undefined;
    user.emailTokenExpires = undefined;
    user.isActive = true;
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true,
      message: 'Account Activated'
    })

  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message
    })
  }
}



exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({
        message: "Please enter an email"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "This email does not exist in our database"
      })
    }



    const message = `Your are getting an otp ${otp}`

    await sendEmail({ email: user.email, subject: 'Password Reset', message })

    //email expires 15 minutes after
    let emailExpiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordOtp = hash;
    user.resetPasswordOtpExpires = emailExpiry;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Please check your email for otp code"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}


exports.resetPassword = async (req, res, next) => {
  try {
    const { code, newPassword, confirmPassword } = req.body

    if (!code || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }
    let resetPasswordOtp = crypto.createHash('sha256').update(code).digest('hex')

    const user = await User.findOne({
      resetPasswordOtp,
      resetPasswordOtpExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
        message: "Password reset token is invalid or expired"
      })
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match. Please check and try again"
      })
    }

    user.password = req.body.newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully."
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}


exports.getUsers = async (req, res, next) => {
  try {

    const users = await User.find({
    }).sort({ "role": 1 })

    if (!users) {
      return res.status(400).json({
        message: "Users not found"
      })
    }
    if (req.user.role !== "admin") {
      return res.status(400).json({
        message: "Not auth"
      })

    }
    res.status(200).json(
      users
    )

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

/**********
// @desc: Delete User
// @access: Private Route
// @api: /api/v1/users/:id
 *****/
exports.deleteUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) {
      return res.status(400).json({
        message: "Users not found"
      })
    }
    // make sure it is owner before giving permission to delete
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        message: "Not authorized to perform this action!"
      })
    }
    user = await User.findByIdAndDelete(req.params.id)
    await Shop.deleteOne({ owner: req.params.id })
    await Product.deleteMany({ postedBy: req.params.id })

    res.status(200).json({
      success: true,
      user,
      "message": "User deleted successfully"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }

}



/**********
// @desc: Get User Own Profile
// @access: Private Route
// @api: /api/v1/me
 *****/
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  })
}
)


exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user)
}
)



/**********
// @desc: Logout User
// @access: Public Route
// @api: /api/v1/logout
 *****/
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    data: {}
  })
})



exports.followSeller = asyncHandler(async (req, res, next) => {
  let result = await User.findByIdAndUpdate(req.params.id, { $push: { followSeller: req.user.id } }, { new: true })
  console.log(req.user.id)
  res.status(200).json({
    success: true,
    result
  })
})

exports.unfollowSeller = asyncHandler(async (req, res, next) => {
  let result = await User.findByIdAndUpdate(req.params.id, { $push: { followSeller: req.user.id } }, { new: true })
  console.log(req.user.id)
  res.status(200).json({
    success: true,
    result
  })
})









exports.resendVerification = async (req, res, next) => {
  try {
    let { email } = req.body
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email is required'
      })
    }

    const userExists = await User.findOne({ email })
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    if (userExists.isActive === true) {
      return res.status(404).json({
        success: false,
        err: "You accout is already activated. Please login"
      })
    }


    const message = `This is your verification code ${code}. It expires in 15 minutes`
    userExists.emailToken = emailToken
    userExists.emailTokenExpires = emailTokenExpires
    await sendEmail({ email, subject: 'Email verification', message })
    await userExists.save();

    res.json({
      message: "Please check your email for your verification code"
    })

  } catch (err) {
    res.status(404).json({
      success: false,
      err: err.message
    })
  }
}