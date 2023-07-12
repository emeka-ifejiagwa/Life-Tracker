CREATE TABLE nutrition(
    nutritionid SERIAL NOT NULL,
    userid BIGINT NOT NULL,
    name varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    calories BIGINT NOT NULL,
    imageurl varchar(255),
    createdat timestamp without time zone default CURRENT_TIMESTAMP,
    PRIMARY KEY(nutritionid) 
);