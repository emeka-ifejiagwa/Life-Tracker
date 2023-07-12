require("dotenv").config();

const getDatabaseURI = () =>
 process.env.DATABASE_HOSTED_URL
  
// local database uri: 
// `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

module.exports = getDatabaseURI;
