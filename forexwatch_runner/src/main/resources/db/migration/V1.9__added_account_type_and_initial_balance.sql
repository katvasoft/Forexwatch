ALTER TABLE account_info ADD COLUMN account_type character varying(255) COLLATE pg_catalog."default";

ALTER TABLE account_info ADD COLUMN account_initial_balance double precision;