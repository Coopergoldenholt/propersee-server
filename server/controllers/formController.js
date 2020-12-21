let cloudinary = require("cloudinary").v2;

module.exports = {
	saveRequestForm: async (req, res) => {
		const db = req.app.get("db");
		const {
			typeOfWork,
			imageOne,
			imageTwo,
			imageThree,
			imageFour,
			imageFive,
			imageSix,
			imageSeven,
			imageEight,
			propertyId,
		} = req.body;
		const date = `${new Date().getFullYear()}-${
			new Date().getMonth() + 1
		}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;

		const properties = await db.form.insert_request_form([
			req.session.user.companyId,
			req.session.user.managedCompanyId,
			propertyId,
			date,
			req.session.user.name,
			typeOfWork,
			imageOne,
			imageTwo,
			imageThree,
			imageFour,
			imageFive,
			imageSix,
			imageSeven,
			imageEight,
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
	getAllCompanyForms: async (req, res) => {
		const db = req.app.get("db");

		const { page } = req.query;
		const propertyList = await db.form.get_forms_by_managed_company([page]);

		res.status(200).send(propertyList);
	},
};
