-- Deploy fresh database tables

-- \i means execute script. 
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/posts.sql'
\i '/docker-entrypoint-initdb.d/tables/comments.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'