CREATE TABLE public."user" (
    name text,
    id uuid NOT NULL
);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_name_key UNIQUE (name);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
