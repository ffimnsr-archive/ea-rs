-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.experience_level (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.rank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.experience_level
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.rank
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

INSERT INTO public.experience_level (name, description, is_deleted)
VALUES
    ('Less than 1 year', 'Must have work only for a year.', false),
    ('1 to 4 years', 'Must have work for a year to 4 years.', false),
    ('4 to 7 years', 'Must have work for more than 4 years and not greater than 7 years.', false),
    ('7 to 10 years', 'Must have work for more than 7 years and not greater than 10 years', false),
    ('More than 10 years', 'Must have work for more than 10 years.', false);

INSERT INTO public.rank (name, description, is_deleted)
VALUES
    ('Mythic', '', false),
    ('Legend', '', false),
    ('Epic', '', false),
    ('Grandmaster', '', false),
    ('Master', '', false),
    ('Elite', '', false),
    ('Warrior', '', false);

-- !DOWN
TRUNCATE TABLE ONLY public.rank RESTART IDENTITY CASCADE;
TRUNCATE TABLE ONLY public.experience_level RESTART IDENTITY CASCADE;
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.rank;
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.experience_level;
DROP TABLE IF EXISTS public.rank;
DROP TABLE IF EXISTS public.experience_level;
