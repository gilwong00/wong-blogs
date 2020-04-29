BEGIN TRANSACTION;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) UNIQUE,
	password VARCHAR(255),
	email VARCHAR(255),
	email_verified BOOLEAN,
	date_created DATE,
	last_login DATE
);

COMMIT;