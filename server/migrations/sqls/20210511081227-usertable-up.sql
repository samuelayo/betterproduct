/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE requests(
    id VARCHAR PRIMARY KEY DEFAULT 'bet-prod-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    username VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    user_group VARCHAR,
    user_password VARCHAR,
    accepted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
