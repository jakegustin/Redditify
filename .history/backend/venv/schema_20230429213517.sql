DROP TABLE IF EXISTS posts;

CREATE TABLE userinfo (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    userpassword TEXT NOT NULL,
    redditname Text NOT NULL
);
