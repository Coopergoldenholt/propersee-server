CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(100) UNIQUE,
  "name" varchar(100),
  "type_of_user" varchar(40),
  "password" varchar(200),
  "company_id" int,
   "managed_company_id" int
);

CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY,
  "company" varchar(100) UNIQUE
);
CREATE TABLE "managed_companies" (
  "id" SERIAL PRIMARY KEY,
  "managing_company_id" int,
  "company_name" varchar(200) 
);


CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "managed_company_id" int,
  "name" varchar(200) 
);

CREATE TABLE "forms" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "property_id" int,
  "managed_company_id" int,
  "date" timestamp,
  "employee_id" int,
  "summary" varchar(200),
  "title" varchar(20),
  "type_of_form" varchar(50),
  "related_form_id" int,
  "completed" boolean,
  "image_one" text,
  "image_two" text,
  "image_three" text,
);

ALTER TABLE "users" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "properties" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "properties" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");

ALTER TABLE "managed_companies" ADD FOREIGN KEY ("managing_company_id") REFERENCES "companies" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("employee_id") REFERENCES "users" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("related_form_id") REFERENCES "forms" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");