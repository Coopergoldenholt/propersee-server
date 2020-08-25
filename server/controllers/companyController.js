module.exports = {
	getManagedCompanies: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const companies = await db.register.get_managed_companies_by_company_id(id);
		res.status(200).send(companies);
	},
	addManagedCompany: async (req, res) => {
		const db = req.app.get("db");
		const { companyName } = req.body;

		await db.companies.create_managing_company([
			req.session.user.companyId,
			companyName,
		]);
		res.status(200).send("Company Created");
	},

	getUsers: async (req, res) => {
		const db = req.app.get("db");
		const users = await db.users.get_all_users_by_admin(
			req.session.user.companyId
		);

		res.status(200).send(users);
	},
	getEmployees: async (req, res) => {
		const db = req.app.get("db");
		const users = await db.users.get_all_employees_by_admin(
			req.session.user.companyId
		);

		res.status(200).send(users);
	},
	getAdminProperties: async (req, res) => {
		const db = req.app.get("db");
		const properties = await db.properties.get_all_admin_properties(
			req.session.user.companyId
		);

		res.status(200).send(properties);
	},
	getAdminProperties: async (req, res) => {
		const db = req.app.get("db");
		const properties = await db.properties.get_all_admin_properties(
			req.session.user.companyId
		);

		res.status(200).send(properties);
	},
	addProperty: async (req, res) => {
		const db = req.app.get("db");
		let { name, managedCompany, companyId } = req.body;

		const user = await db.properties.add_property([
			companyId,
			managedCompany,
			name,
		]);

		res.status(200).send("Created");
	},
	deleteProperty: async (req, res) => {
		const db = req.app.get("db");
		let { companyId } = req.params;

		const deleted = await db.properties.delete_property([companyId]);
		res.status(200).send("Deleted");
	},
	deleteCompany: async (req, res) => {
		const db = req.app.get("db");
		let { companyId } = req.params;

		const deleted = await db.companies.delete_managing_company([companyId]);
		res.status(200).send("Deleted");
	},
	getPropertiesByMangagedCompany: async (req, res) => {
		const db = req.app.get("db");
		const { id } = req.params;
		const properties = await db.properties.get_properties_by_managed_company(
			id
		);
		res.status(200).send(properties);
	},
};
