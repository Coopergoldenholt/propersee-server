INSERT INTO users (email, type_of_user, managed_company_id, company_id)
VALUES ($1, $2, $3, $4)

returning *;