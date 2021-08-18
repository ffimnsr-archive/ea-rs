-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.address (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address_1 VARCHAR (254) NOT NULL,
    address_2 VARCHAR (254) NOT NULL,
    city VARCHAR (100) NOT NULL,
    state VARCHAR (100) NOT NULL,
    country_id UUID NOT NULL,
    postal_code VARCHAR (12) NOT NULL,
    is_deleted BOOL NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.address
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.address;
DROP TABLE IF EXISTS public.address;
