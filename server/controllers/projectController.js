module.exports = {
	getProjects: async (req, res) => {
		const db = req.app.get("db");
		let projects;

		switch (req.session.user.user) {
			case "Admin":
				projects = await db.projects.get_admin_projects([
					req.session.user.companyId,
				]);
				break;
			case "employee":
				projects = await db.projects.get_projects([req.session.user.id]);

				// const names = await db.projects.get_names_for_projects([]);
				break;
			default:
				projects = "user";
		}

		res.status(200).send(projects);
	},
	getProject: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const project = await db.projects.get_project(id);

		res.status(200).send(project);
	},

	getProjectForms: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const forms = await db.projects.get_project_forms(id);

		res.status(200).send(forms);
	},

	createProject: async (req, res) => {
		const db = req.app.get("db");
		const { name, managedCompanyId, propertyId } = req.body;
		const date = `${new Date().getFullYear()}-${
			new Date().getMonth() + 1
		}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
		await db.projects.create_project([
			req.session.user.companyId,
			managedCompanyId,
			name,
			propertyId,
			date,
		]);

		res.status(200).send("Project Created");
	},
	deleteProject: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		await db.projects.delete_project(id);
		res.status(200).send("Project Deleted");
	},
};
