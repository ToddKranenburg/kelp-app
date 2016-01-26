# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## businesses
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
type            | string    | not null
lat             | float     | not null
lng             | float     | not null

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
rating      | integer   | not null
author_id   | integer   | not null, foreign key (references users), indexed
business_id | integer   | not null, foreign key (references businesses), indexed


## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
commenter_id| integer   | not null, foreign key (references users), indexed
review_id   | integer   | not null, foreign key (references reviews), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
liker_id    | integer   | not null, foreign key (references users), indexed
review_id   | string    | not null, foreign key (references reviews), indexed

## school_memberships
column name    | data type | details
---------------|-----------|-----------------------
school_owner_id| integer   | not null, foreign key (references schools), indexed
member_id      | string    | not null, foreign key (references users), indexed
