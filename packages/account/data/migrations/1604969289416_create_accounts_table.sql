-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    global_id UUID UNIQUE NOT NULL,
    public_code VARCHAR (30) UNIQUE NOT NULL,
    username VARCHAR(60) UNIQUE NOT NULL,
    avatar TEXT NOT NULL,
    given_name VARCHAR(50) NULL,
    family_name VARCHAR(50) NULL,
    middle_name VARCHAR(50) NULL,
    email VARCHAR(90) UNIQUE NOT NULL,
    email_verified BOOL NOT NULL DEFAULT false,
    is_deleted BOOL NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

CREATE INDEX ix_accounts_created_at
ON public.accounts USING btree (created_at ASC NULLS LAST);

CREATE INDEX ix_accounts_id_with_created_at
ON public.accounts USING btree (id ASC NULLS LAST, created_at ASC NULLS LAST);

-- !DOWN
DROP INDEX ix_accounts_created_at;
DROP TRIGGER IF EXISTS set_timestamp ON public.accounts;
DROP TABLE IF EXISTS public.accounts;
