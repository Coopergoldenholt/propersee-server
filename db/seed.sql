CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY,
  "company" varchar(100) UNIQUE
);
CREATE TABLE "managed_companies" (
  "id" SERIAL PRIMARY KEY,
  "managing_company_id" int,
  "company_name" varchar(200) 
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(100) UNIQUE,
  "name" varchar(100),
  "type_of_user" varchar(40),
  "password" varchar(200),
  "company_id" int,
   "managed_company_id" int,
   "projects"int
);

CREATE TABLE "properties" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "managed_company_id" int,
  "name" varchar(200)
);

CREATE TABLE "groups"(
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100)
)

CREATE TABLE "group_properties"(
  "id" SERIAL PRIMARY KEY,
  "group_id" int,
  "property_id" int
)

CREATE TABLE "property_auth"(
  "id" SERIAL PRIMARY KEY,
  "property_id" int,
  "user_id" int,
  "group_id" int
)


CREATE TABLE "forms" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "property_id" int,
  "managed_company_id" int,
  "type_of_work" text,
  "date" timestamp,
 "name" varchar(100),
  "project_id" int,
  "completed" boolean,
  "image_one" text,
  "image_two" text,
  "image_three" text,
  "image_four" text,
  "image_five" text,
  "image_six" text,
  "image_seven" text,
  "image_eight" text
);

ALTER TABLE "users" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "properties" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "properties" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");

ALTER TABLE "managed_companies" ADD FOREIGN KEY ("managing_company_id") REFERENCES "companies" ("id");

ALTER TABLE "group_properties" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");

ALTER TABLE "group_properties" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "property_auth" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "property_auth" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "property_auth" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("property_id") REFERENCES "properties" ("id");

ALTER TABLE "forms" ADD FOREIGN KEY ("managed_company_id") REFERENCES "managed_companies" ("id");

