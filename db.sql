CREATE TABLE IF NOT EXISTS experience
(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    jobdesk VARCHAR (200) ,
    corps_name VARCHAR (200) ,
    work_time VARCHAR (200) ,
    description VARCHAR (1000)
);

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS portofolio
(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    app_name VARCHAR(200),
    link_repo VARCHAR(200) ,
    app_type VARCHAR(200) ,
    app_image VARCHAR(200) ,
    user_id VARCHAR(200) 
);

CREATE TABLE IF NOT EXISTS hiring
(
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    id_jobseeker VARCHAR(200) NOT NULL,
    rec_id VARCHAR(200) NOT NULL,
    rec_name VARCHAR(200),
    rec_email VARCHAR(200),
    rec_phone VARCHAR(200),
    message TEXT,
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE skills
(
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(200),
    skill_name VARCHAR(20)
);
 

CREATE TABLE recruiters (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    full_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE ,
    corps_name VARCHAR(64) ,
    position VARCHAR(64),
    roles VARCHAR(10) DEFAULT 'recruiter',
    hp VARCHAR(14) ,
    password VARCHAR(128),
    role VARCHAR(10),
    recStatus VARCHAR(20),
    img_recruiter VARCHAR (200),
    corps_description text,
    instagram VARCHAR (200),
    linkedin VARCHAR(200),
    address VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE users (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    full_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE ,
    password VARCHAR(128),
    roles VARCHAR(10) DEFAULT 'user',
    hp VARCHAR(14) ,
    jobdesk VARCHAR(200) ,
    address VARCHAR(200) ,
    workplace VARCHAR(200) ,
    photo VARCHAR(200) ,
    description VARCHAR(1000) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);