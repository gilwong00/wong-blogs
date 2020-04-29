BEGIN TRANSACTION;

INSERT INTO users (
	username, 
	email, 
	date_created, 
	password
)
VALUES (
	'test', 
	'test@test.com', 
	NOW(), 
	'$2a$10$93yzrt.c0YRT2zRA7a4D5ONKcFq9tjjJboHQuOYi.rxOLDHoeM54u'
);

COMMIT;