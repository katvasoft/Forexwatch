	CREATE TABLE public.account_info
(
    id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    account_equity double precision,
    account_free_margin double precision,
    account_leverage double precision,
    account_balance double precision,
    account_name character varying(255) COLLATE pg_catalog."default",
    account_used_margin double precision,
    CONSTRAINT account_info_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.account_info
    OWNER to forexwatch;