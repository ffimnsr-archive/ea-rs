-- # Put the your SQL below migration seperator.
-- !UP
INSERT INTO public.countries (name, alpha2, alpha3, phone_code, currency_code, is_deleted)
VALUES
    ('Philippines', 'PH', 'PHL', '+63', 'PHP', false),
    ('Vietnam', 'VN', 'VNM', '+84', 'VND', false),
    ('Singapore', 'SG', 'SGO', '+65', 'SGD', false),
    ('Indonesia', 'ID', 'IDN', '+62', 'IDR', false),
    ('Malaysia', 'MY', 'MYS', '+60', 'MYR', false);

INSERT INTO public.experience_levels (name, description, is_deleted)
VALUES
    ('Less than 1 year', 'Must have work only for a year.', false),
    ('1 to 4 years', 'Must have work for a year to 4 years.', false),
    ('4 to 7 years', 'Must have work for more than 4 years and not greater than 7 years.', false),
    ('7 to 10 years', 'Must have work for more than 7 years and not greater than 10 years', false),
    ('More than 10 years', 'Must have work for more than 10 years.', false);

INSERT INTO public.industries (name, description, is_deleted)
VALUES
    ('Ecommerce', '', false),
    ('Professional Services', '', false),
    ('Financial Tech', '', false),
    ('General Internet', '', false),
    ('Ad Tech', '', false),
    ('Media', '', false),
    ('Logistics & Transportation', '', false),
    ('Enterprise Solution', '', false),
    ('Others', '', false),
    ('General Software', '', false),
    ('Marketplace & Platforms', '', false),
    ('Lifestyle', '', false),
    ('Security', '', false),
    ('Software as a Service', '', false),
    ('Artificial Intelligence', '', false),
    ('Health', '', false),
    ('Design', '', false),
    ('Travel', '', false),
    ('Search & Discovery', '', false),
    ('Big Data', '', false),
    ('Food Tech', '', false),
    ('Social Networking & Communication', '', false),
    ('Investments', '', false),
    ('Real Estate', '', false),
    ('Gaming', '', false),
    ('Internet Infrastracture', '', false),
    ('Music & Entertainment', '', false),
    ('Cloud Computing', '', false),
    ('Analytics', '', false),
    ('Clean Tech', '', false),
    ('Heavy Industry', '', false),
    ('Crowd Sourcing', '', false),
    ('Productivity Software', '', false),
    ('Recognition Tech', '', false),
    ('Developer Tools', '', false),
    ('Video', '', false),
    ('Outsourcing', '', false),
    ('Publishing', '', false),
    ('Agri Tech', '', false),
    ('Science', '', false),
    ('Space', '', false),
    ('Navigation', '', false);

INSERT INTO public.project_categories (name, description, is_deleted)
VALUES
    ('Full Development & Maintainance', 'Built software from ground up and includes future software maintenance.', false),
    ('Partial Development & Maintainance', 'Upgrade existing software and do future software maintenance.', false),
    ('Development Only', 'Build software from ground up only.', false),
    ('Maintainance Only', 'Do software maintenance.', false);

INSERT INTO public.ranks (name, description, is_deleted)
VALUES
    ('Mythic', '', false),
    ('Legend', '', false),
    ('Epic', '', false),
    ('Grandmaster', '', false),
    ('Master', '', false),
    ('Elite', '', false),
    ('Warrior', '', false);

INSERT INTO public.work_functions (name, description, is_deleted)
VALUES
    ('Web Development', 'Develop and implement specs for back-end and front-end.', false),
    ('Mobile Development', 'Develop apps, libraries on mobile platform (Android, iOS).', false),
    ('Game & AR/VR Development', 'Develop games for desktop and new tech system.', false),
    ('DevOps & Cloud Management', 'Develop, deploy and manage cloud infrasctracture.', false),
    ('Sales & Business Development', 'Connect channels, identify business leads and maintain good working relationship with business contacts.', false),
    ('Marketing & PR', 'Be responsible for managing the image and reputation of product and services.', false),
    ('UI/UX Design', 'Develop user interface and user experience.', false),
    ('Graphic & Motion Design', 'Create artwork and visual effects for products and services.', false),
    ('QA Testing', 'Ensure quality of product or services using whitebox and blackbox testing.', false),
    ('Community Management', 'Manage social media interaction and relationship', false),
    ('Customer Service', 'Provide assitance to people who buy or use products or services.', false);

-- !DOWN
TRUNCATE TABLE ONLY work_functions RESTART IDENTITY CASCADE;
TRUNCATE TABLE ONLY ranks RESTART IDENTITY CASCADE;
TRUNCATE TABLE ONLY project_categories RESTART IDENTITY CASCADE;
TRUNCATE TABLE ONLY industries RESTART IDENTITY CASCADE;
TRUNCATE TABLE ONLY experience_levels RESTART IDENTITY CASCADE;
TRUNCATE TABLE ONLY countries RESTART IDENTITY CASCADE;
