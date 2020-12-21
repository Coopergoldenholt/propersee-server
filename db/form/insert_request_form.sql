insert into forms (company_id, managed_company_id, property_id, date, name, type_of_work, image_one, image_two, image_three, image_four, image_five, image_six, image_seven, image_eight)
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning *;