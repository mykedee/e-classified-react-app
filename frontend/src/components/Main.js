import React from 'react';

const Person = {
	twitterName: 'Fireworks',
	slackName: 'Dice',
	twitterLink: 'https:twitter.com/lakeside99',
	team: 'https://training.zuri.team/',
	books: 'http://books.zuri.team',
	pythonBook: 'https://books.zuri.team/python-for-beginners?ref_id=Dice',
	coderBgCheck: 'https://background.zuri.team',
	designBooks: 'https://books.zuri.team/design-rules',
};

const Links = () => {
	return (
		<>
			<section className="profile-section">
				<div className="profile-container">
					<img
						src="./assets/profile__img.svg"
						alt="profile"
						id="profile__img"
					/>

					<div className="overlay">
						<img
							src="./assets/camera-icon.svg"
							alt="camera icon"
							className="camera-icon"
						/>
					</div>
				</div>
				<h1 id="twitter">{Person.twitterName}</h1>
				<h1 id="slack">{Person.slackName}</h1>
			</section>
			<section className="link-section">
				<a href={Person.twitterLink} className="link-btn">
					Twitter Link
				</a>
				<a href={Person.books} className="link-btn" id="btn__zuri">
					Zuri Team
				</a>
				<a href={Person.books} className="link-btn" id="books">
					Zuri Books
				</a>
				<a href={Person.pythonBook} className="link-btn" id="book__python">
					Pyhton Books
				</a>
				<a href={Person.coderBgCheck} className="link-btn" id="pitch">
					Zuri Books
				</a>
				<a href={Person.designBooks} className="link-btn" id="book__design">
					Design Books
				</a>
			</section>

			<section className="git-slack">
				<span>
					<a href="http://github.com/brainstormy">
						<img src="./assets/github.svg" alt="camera icon" />
					</a>
				</span>
				<span>
					<img src="./assets/slack.svg" alt="camera icon" />
				</span>
			</section>
			<hr />
		</>
	);
};

export default Links;
