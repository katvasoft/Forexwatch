	CREATE TABLE public.account_alert
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    account_id character varying(255) COLLATE pg_catalog."default",
    strategy_id character varying(255) COLLATE pg_catalog."default",
    min_balance double precision
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.account_alert
    OWNER to forexwatch;
