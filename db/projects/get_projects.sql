select p.name, p.completed, p.property_id, p.date from projects p
join user_projects up on up.project_id = p.id
join users u on up.user_id = u.id
where u.id = 2
order by p.date desc;
