insert into forms (company_id, managed_company_id, property_id, date, image_one, image_two, image_three, image_four, summary, title, type_of_form, related_form_id, completed, name)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning *;