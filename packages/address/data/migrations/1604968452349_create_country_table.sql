-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.country (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR (100) UNIQUE NOT NULL,
    alpha2 VARCHAR (3) NULL,
    alpha3 VARCHAR (4) NULL,
    phone_code VARCHAR (5) NULL,
    currency_code VARCHAR (5) NULL,
    is_deleted BOOL NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.country
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

INSERT INTO public.country (name, alpha2, alpha3, phone_code, currency_code, is_deleted)
VALUES
    ('Philippines', 'PH', 'PHL', '+63', 'PHP', false),
    ('Vietnam', 'VN', 'VNM', '+84', 'VND', false),
    ('Singapore', 'SG', 'SGO', '+65', 'SGD', false),
    ('Indonesia', 'ID', 'IDN', '+62', 'IDR', false),
    ('Malaysia', 'MY', 'MYS', '+60', 'MYR', false);

-- !DOWN
TRUNCATE TABLE ONLY public.country RESTART IDENTITY CASCADE;
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.country;
DROP TABLE IF EXISTS public.country;
