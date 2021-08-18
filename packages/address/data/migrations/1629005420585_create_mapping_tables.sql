-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.map_user_address (
    user_id UUID NOT NULL,
    address_id UUID NOT NULL
);

CREATE TABLE IF NOT EXISTS public.map_organization_address (
    organization_id UUID NOT NULL,
    address_id UUID NOT NULL
);

CREATE INDEX ix_map_user_address_user_id
ON public.map_user_address USING btree (user_id ASC NULLS LAST);

CREATE INDEX ix_map_organization_address_organization_id
ON public.map_organization_address USING btree (organization_id ASC NULLS LAST);

-- !DOWN
DROP INDEX ix_map_organization_address_organization_id;
DROP INDEX ix_map_user_address_user_id;
DROP TABLE IF EXISTS public.map_organization_address;
DROP TABLE IF EXISTS public.map_user_address;
