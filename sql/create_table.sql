CREATE DATABASE reading_platform;
USE reading_platform;

CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(10),
    stu_character VARCHAR(10),
    theme VARCHAR(10),
    type VARCHAR(10),
    book_period VARCHAR(10),
    nationality VARCHAR(10),
    focus VARCHAR(10),
    orientation_level FLOAT,
    behavior_cognitive FLOAT,
    parental FLOAT,
    peer FLOAT,
    family FLOAT,
    relaxed FLOAT,
    intelligence FLOAT,
    morality FLOAT,
    plasticity FLOAT,
    resilience FLOAT
);

CREATE TABLE student_statistics (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(10),
    masterpiece INT,
    traditional_chinese_culture INT,
    others INT,
    science_fantasy INT,
    red_literature INT,
    classical_chinese INT,
    zero_four INT,
    four_eight INT,
    eight_twelve INT,
    literary_stories INT,
    picture_stories INT,
    general_knowledge INT,
    popular_science INT,
    education INT,
    art INT,
    encyclopedia INT
);

CREATE TABLE book_info (
    book_id INT PRIMARY KEY,
    name VARCHAR(128), 
    author_country VARCHAR(32), 
    book_period VARCHAR(32),  
    book_type VARCHAR(32),
    book_content_theme VARCHAR(32),
    readability_range VARCHAR(32),  
    word_count VARCHAR(32),
    mainly_affects_character VARCHAR(32),  
    special_attention VARCHAR(32)  
);

CREATE TABLE book_info1 (
    book_id INT PRIMARY KEY,
    name VARCHAR(30), 
    author_country INT, 
    book_period INT,  
    book_type VARCHAR(64),
    book_content_theme VARCHAR(64),
    readability_range INT,  
    word_count INT,
    mainly_affects_character VARCHAR(64),  
    special_attention VARCHAR(64)  
);

CREATE TABLE student_score (
    student_id INT PRIMARY KEY,
    psychology INT,
    social INT,
    emotion INT,
    stu_character INT,
    learn INT
);
