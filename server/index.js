const express = require("express");
require("dotenv").config();
const session = require("express-session");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const massive = require("massive");
const userCtrl = require("./controllers/sessionController");
const companyCtrl = require("./controllers/companyController");
const formCtrl = require("./controllers/formController");
const customerCtrl = require("./controllers/customerController");
const projectCtrl = require("./controllers/projectController");

const app = express();

app.use(express.json({ limit: "10mb", extended: true }));

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

//Authentication Calls
app.post("/api/login", userCtrl.loginUser);
app.post("/api/register", userCtrl.registerUser);
app.post("/api/signup", userCtrl.setUserPassword);
app.get("/api/companies/:id", companyCtrl.getManagedCompanies);
app.post("/api/user/logout", userCtrl.logoutUser);

//Admin Calls
app.get("/api/company/users", companyCtrl.getUsers);
app.get("/api/company/employees", companyCtrl.getEmployees);
app.get("/api/company/properties", companyCtrl.getAdminProperties);
app.post("/api/company/properties", companyCtrl.addProperty);
app.post("/api/company/managing-company", companyCtrl.addManagedCompany);
app.put("/api/user/delete/:id", userCtrl.deleteUser);
app.put("/api/company/property/delete/:companyId", companyCtrl.deleteProperty);
app.put("/api/company/delete/:companyId", companyCtrl.deleteCompany);

//Property Calls
app.get(
	"/api/company/managed-company/properties/:id",
	companyCtrl.getPropertiesByMangagedCompany
);

//Form Calls
app.post("/api/company/photo", formCtrl.saveRequestForm);
app.get("/api/company/property/:propertyId", formCtrl.getPropertyForms);

//Employee Calls
app.get("/api/user/properties", customerCtrl.getCustomerProperties);

//Project Calls
app.get("/api/projects", projectCtrl.getProjects);
app.get("/api/project/:id", projectCtrl.getProject);
app.post("/api/projects", projectCtrl.createProject);
app.get("/api/project/forms/:id", projectCtrl.getProjectForms);
app.put("/api/project/delete/:id", projectCtrl.deleteProject);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then(async (db) => {
	await app.set("db", db);
	app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is listening`));
});
