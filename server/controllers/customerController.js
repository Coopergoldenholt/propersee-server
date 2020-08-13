module.exports = {
	getCustomerProperties: async (req, res) => {
		const db = req.app.get("db");
		console.log(req.session.user);
		console.log(req.session.user.managedCompanyId);
		const properties = await db.properties.get_user_properties(
			req.session.user.managedCompanyId
		);
		console.log(properties);
		res.status(200).send(properties);
	},
};
