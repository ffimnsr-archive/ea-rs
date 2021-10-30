-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.project_category (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.work_function (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.project_category
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.work_function
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

INSERT INTO public.project_category (name, description, is_deleted)
VALUES
    ('Full Development & Maintainance', 'Built software from ground up and includes future software maintenance.', false),
    ('Partial Development & Maintainance', 'Upgrade existing software and do future software maintenance.', false),
    ('Development Only', 'Build software from ground up only.', false),
    ('Maintainance Only', 'Do software maintenance.', false);

INSERT INTO public.work_function (name, description, is_deleted)
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
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.work_function;
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.project_category;
DROP TABLE IF EXISTS public.work_function;
DROP TABLE IF EXISTS public.project_category;
