CREATE TABLE public.order_info
(
  id character varying(255) NOT NULL,
  lots double precision NOT NULL,
  order_ask_price double precision NOT NULL,
  order_bid_price double precision NOT NULL,
  order_close_price double precision NOT NULL,
  order_date timestamp without time zone,
  order_instrument character varying(255),
  orderjforex_id character varying(255),
  order_label character varying(255),
  order_open boolean NOT NULL,
  order_profit_loss double precision NOT NULL,
  order_profit_loss_pips double precision NOT NULL,
  order_stop_loss double precision NOT NULL,
  order_take_profit double precision NOT NULL,
  order_type character varying(255),
  strategyjforex_id bigint,
  strategy_name character varying(255),
  CONSTRAINT order_info_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.order_info
  OWNER TO forexwatch;


CREATE TABLE public.strategy_log_message
(
  id character varying(255) NOT NULL,
  account_id character varying(255),
  detail_log_message character varying(255),
  log_date timestamp without time zone,
  log_message character varying(255),
  message_type character varying(255),
  order_id character varying(255),
  order_label character varying(255),
  CONSTRAINT strategy_log_message_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.strategy_log_message
  OWNER TO forexwatch;


CREATE TABLE public.setting
(
  id character varying(255) NOT NULL,
  setting_group_name character varying(255),
  setting_name character varying(255),
  setting_value character varying(255),
  CONSTRAINT setting_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.setting
  OWNER TO forexwatch;


  CREATE TABLE public.fstrategy
(
  id character varying(255) NOT NULL,
  clazz_class_location character varying(255),
  complete_classname character varying(255),
  jforex_id bigint,
  running boolean NOT NULL,
  strategy_name character varying(255),
  CONSTRAINT fstrategy_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.fstrategy
  OWNER TO forexwatch;

CREATE TABLE public.fstrategy_parameter
(
  id character varying(255) NOT NULL,
  parameter_name character varying(255),
  parameter_value character varying(255),
  strategy_id character varying(255),
  CONSTRAINT fstrategy_parameter_pkey PRIMARY KEY (id),
  CONSTRAINT fkn9otm94345pdpkoqr49dseuxq FOREIGN KEY (strategy_id)
      REFERENCES public.fstrategy (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.fstrategy_parameter
  OWNER TO forexwatch;


CREATE TABLE public.app_user
(
  id character varying(255) NOT NULL,
  password character varying(255),
  username character varying(255),
  CONSTRAINT app_user_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.app_user
  OWNER TO forexwatch;
