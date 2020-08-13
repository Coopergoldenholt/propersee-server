const bcrypt = require("bcryptjs");
const saltRounds = 12;
const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_PASS } = process.env;

let transporter = nodemailer.createTransport({
	host: "smtp.mail.outlook.com",
	service: "outlook",
	auth: {
		user: "coopergoldenholt@outlook.com",
		pass: EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	loginUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, password } = req.body;
		email = email.toLowerCase();
		const [user] = await db.login.get_user_by_email(email);

		if (!user) {
			return res.status(401).send("Username or password incorrect");
		}
		const result = await bcrypt.compare(password, user.password);

		if (result) {
			req.session.user = {
				email: user.email,
				name: user.name,
				loggedIn: true,
				companyId: user.company_id,
				user: user.type_of_user,
				id: user.id,
				managedCompanyId: user.managed_company_id,
			};
			res.status(200).send(req.session.user);
		} else res.status(401).send("Username or password incorrect");
	},
	registerUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, password, managedCompany, typeOfUser, companyId } = req.body;
		email = email.toLowerCase();
		const [existingUser] = await db.login.get_user_by_email(email);
		if (existingUser) {
			return res.status(400).send("Email is already in use");
		}
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		const [user] = await db.register.create_user([
			email,
			typeOfUser,
			hash,
			managedCompany,
			companyId,
		]);
		// transporter.sendMail({
		// 	from: "coopergoldenholt@outlook.com", // sender address
		// 	to: user.email, // list of receivers
		// 	subject: "You Have Been Invited To Register", // Subject line
		// 	html: `<p><b>Hello</b> to myself </p>
		// 	<p>You have been added to Matiencsee. Download the app and register with this email, and you will be able to view your properties.<br/></p>`,
		// });

		req.session.user = {
			email: user.email,
			loggedIn: true,
			company: user.company,
			user: user.type_of_user,
			id: user.id,
		};
		res.status(200).send(req.session.user);
	},
	setUserPassword: async (req, res) => {
		const db = req.app.get("db");
		let { email, password } = req.body;
		email = email.toLowerCase();
		const [existingUser] = await db.login.get_user_by_email(email);
		if (!existingUser) {
			return res.status(400).send("No Email Was Found");
		}
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);
		const [user] = await db.register.set_user_password([email, hash]);

		req.session.user = {
			email: user.email,
			loggedIn: true,
			companyId: user.company_id,
			user: user.type_of_user,
			id: user.id,
		};
		res.status(200).send(req.session.user);
	},
};
