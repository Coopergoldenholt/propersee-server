select * from forms 
where property_id = $1 
ORDER BY date desc
OFFSET $2
Limit 15;