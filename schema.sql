CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) UNIQUE,
	password VARCHAR(255),
	email VARCHAR(255),
	email_verified BOOLEAN,
	date_created DATE,
	last_login DATE
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	body VARCHAR,
	user_id INT REFERENCES users(id),
	author VARCHAR REFERENCES users(username),
	date_created TIMESTAMP
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	comment VARCHAR(255),
	author VARCHAR REFERENCES users(username),
	user_id INT REFERENCES users(id),
	post_id INT REFERENCES posts(id),
	date_created TIMESTAMP
);