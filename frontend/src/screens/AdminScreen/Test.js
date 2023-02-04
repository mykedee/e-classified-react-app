import React from 'react'
import { Card } from 'react-bootstrap'

// const Profile = () => {
//  return (
//   <>
//    <Avatar person={{ username: 'Lin Lanying', lastname: "Olalekan", imageId: '1bX5QH6' }}
//     size={500} />

//    <Avatar person={{ username: 'Lin Lanying0', lastname: "Mike", imageId: '1bX5QH7' }}
//     size={300} />
//   </>
//  )
// }




// function Avatar({ person, size }) {
//  return (
//   <img
//    className="avatar"
//    src="https://i.imgur.com/1bX5QH6.jpg"
//    alt={person.name}
//    width={size}
//    height={size}
//   />
//  );
// }

const Booklist = () => {
 return (
  <>
   <Book description="This is a good book" />
   <Book />
  </>
 )
}



function Book(props) {
 return (
  <Card>
   <p>Title</p>
   <p>Name</p>
   <p>Auhor</p>
   <p>{props.description}</p>
  </Card>
 )
}


// export default function Profile() {
//   return (
//     <Avatar />
//   );
// }

export default Booklist