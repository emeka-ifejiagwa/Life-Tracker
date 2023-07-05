CREATE TABLE users(
    id SERIAL NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at  TIMESTAMP  DEFAULT current_timestamp,
    PRIMARY KEY(id) 
);