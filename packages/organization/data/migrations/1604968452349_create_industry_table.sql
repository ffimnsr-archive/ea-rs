-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.industry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.industry
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

INSERT INTO public.industry (name, description, is_deleted)
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

-- !DOWN
TRUNCATE TABLE ONLY public.industry RESTART IDENTITY CASCADE;
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.industry;
DROP TABLE IF EXISTS public.industry;
