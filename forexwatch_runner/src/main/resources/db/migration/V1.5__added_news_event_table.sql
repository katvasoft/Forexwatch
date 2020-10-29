
CREATE TABLE public.news_event
(
  id character varying(255) NOT NULL,
  actual double precision,
  buy boolean,
  currency character varying(255),
  expected double precision,
  news_event_date timestamp without time zone,
  news_event_msg character varying(255),
  previous double precision,
  volatility integer,
  CONSTRAINT news_event_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.news_event
  OWNER TO forexwatch;
