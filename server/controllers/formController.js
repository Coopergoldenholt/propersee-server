let cloudinary = require("cloudinary").v2;

module.exports = {
	saveRequestForm: async (req, res) => {
		const db = req.app.get("db");
		const {
			imageOne,
			imageTwo,
			imageThree,
			imageFour,
			summary,
			propertyId,
			title,
			typeOfRequest,
		} = req.body;
		const date = `${new Date().getFullYear()}-${
			new Date().getMonth() + 1
		}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;

		const properties = await db.form.insert_request_form([
			req.session.user.companyId,
			req.session.user.managedCompanyId,
			propertyId,
			date,
			imageOne,
			imageTwo,
			imageThree,
			imageFour,
			req.session.user.id,
			summary,
			title,
			typeOfRequest,
			null,
			false,
		]);

		res.status(200).send("request created");
	},

	getPropertyForms: async (req, res) => {
		const db = req.app.get("db");
		const { propertyId } = req.params;
		const { page } = req.query;
		const property = await db.properties.get_property_data([propertyId, page]);

		res.status(200).send(property);
	},
};
