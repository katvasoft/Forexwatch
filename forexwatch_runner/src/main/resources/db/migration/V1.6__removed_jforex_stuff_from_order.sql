ALTER TABLE order_info DROP COLUMN strategyjforex_id;

ALTER TABLE order_info DROP COLUMN orderjforex_id;

ALTER TABLE order_info ADD COLUMN order_close_date timestamp without time zone;

ALTER TABLE order_info ADD COLUMN order_id character varying(255);

ALTER TABLE order_info ADD COLUMN user_id character varying(255);