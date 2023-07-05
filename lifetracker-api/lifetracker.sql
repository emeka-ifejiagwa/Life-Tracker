\echo 'You are about to delete and recreate lifetracker database?'
\echo 'return for yes or Control-C to cancel (All data will be lost) >>' answer


DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql

