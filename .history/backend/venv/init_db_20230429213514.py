import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO userinfo (username, userpassword, redditname) VALUES (?, ?, ?)",
            ('Usertest 1', 'password for 1', 'redname 1')
            )

cur.execute("INSERT INTO userinfo (username, userpassword, redditname) VALUES (?, ?, ?)",
            ('Usertest 2', 'password for 2', 'redname 2')
            )

connection.commit()
connection.close()
