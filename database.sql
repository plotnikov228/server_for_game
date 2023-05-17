
create TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(32),
    mail VARCHAR(80),
    password VARCHAR(80)
);

create TABLE tableScore(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    user_nickname VARCHAR(32),
    user_score INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE tokens(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);