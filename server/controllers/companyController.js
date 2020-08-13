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
		// transporter.sendMail({
		// 	from: "coopergoldenholt@outlook.com", // sender address
		// 	to: user.email, // list of receivers
		// 	subject: "You Have Been Invited To Register", // Subject line
		// 	html: `<p><b>Hello</b> to myself </p>
		// 	<p>You have been added to Matiencsee. Download the app and register with this email, and you will be able to view your properties.<br/></p>`,
		// });

		res.status(200).send("Created");
	},
};
