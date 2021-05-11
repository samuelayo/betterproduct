/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE users(
    uuid VARCHAR PRIMARY KEY DEFAULT 'bet-prod-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    username VARCHAR unique,
    first_name VARCHAR,
    last_name VARCHAR,
    user_group VARCHAR,
    user_password VARCHAR,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);

INSERT INTO users (uuid, first_name, last_name, user_group, username, user_password, created_at, updated_at) VALUES ('3cfbfd84-cdc4-41bb-b92c-ccd0687d0338', 'Fulano', 'Admin', 'admin', 'admin', crypt('one.admin.two.three', gen_salt('bf', 8)), NOW(), NOW());
INSERT INTO users (uuid, first_name, last_name, user_group, username, user_password, created_at, updated_at) VALUES ('0b6a3eaf-58de-43b1-9a5a-c0be8745e167', 'Mengano', 'User', 'user', 'user', crypt('one.user.two.three', gen_salt('bf', 8)), NOW(), NOW());
