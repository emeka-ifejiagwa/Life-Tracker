CREATE TABLE followers(
    userid BIGINT REFERENCES users(id),
    followerid BIGINT REFERENCES users(id),
    PRIMARY KEY(userid, followerid)                                                       
);