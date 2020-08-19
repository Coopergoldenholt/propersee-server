UPDATE users
SET password = $2, name = $3
WHERE email = $1

returning *