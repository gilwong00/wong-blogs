BEGIN TRANSACTION;

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	comment VARCHAR(255),
	author VARCHAR REFERENCES users(username),
	user_id INT REFERENCES users(id),
	post_id INT REFERENCES posts(id),
	date_created TIMESTAMP
);

COMMIT;