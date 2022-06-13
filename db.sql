CREATE TABLE IF NOT EXISTS public.experience
(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    jobdesk VARCHAR (200) COLLATE ,
    corps_name VARCHAR (200) ,
    work_time VARCHAR (200) ,
    description VARCHAR (1000),
)

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.portofolio
(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    app_name VARCHAR(200) COLLATE ,
    link_repo character varying(200) ,
    app_type character varying(200) ,
    app_image character varying(200) ,
    user_id character varying(200) ,
)

CREATE TABLE profile
(
    user_id VARCHAR(200),
    jobdesk VARCHAR(200) ,
    address VARCHAR(200) ,
    workplace VARCHAR(200) ,
    photo VARCHAR(200) ,
    description VARCHAR(1000) ,
    skill json,
)
 

CREATE TABLE recruiters (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    full_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE ,
    corps_name VARCHAR(64) ,
    position VARCHAR(64),
    hp VARCHAR(14) ,
    password VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE users (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    full_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE ,
    password VARCHAR(128),
    hp VARCHAR(14) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);