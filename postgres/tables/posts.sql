BEGIN TRANSACTION;

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	body VARCHAR,
	user_id INT REFERENCES users(id),
	author VARCHAR REFERENCES users(username),
	date_created TIMESTAMP
);

COMMIT;