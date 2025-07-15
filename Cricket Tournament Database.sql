-- ✅ 1. Drop & Create Database
DROP DATABASE IF EXISTS CRICKET_TOURNAMENT;
CREATE DATABASE CRICKET_TOURNAMENT;
USE CRICKET_TOURNAMENT;

-- ✅ 2. Create Tables

CREATE TABLE Tournament (
    tournament_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    start_date DATE,
    end_date DATE
);

CREATE TABLE Team (
    team_id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT,
    name VARCHAR(100),
    location VARCHAR(100),
    FOREIGN KEY (tournament_id) REFERENCES Tournament(tournament_id)
);

CREATE TABLE Player (
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT,
    name VARCHAR(100),
    d_o_b DATE,
    batting_style ENUM('Right-hand', 'Left-hand'),
    bowling_style ENUM('Right-arm', 'Left-arm', 'None'),
    FOREIGN KEY (team_id) REFERENCES Team(team_id)
);

CREATE TABLE C_Match (
    match_id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT,
    match_date DATE,
    venue VARCHAR(100),
    team1_id INT,
    team2_id INT,
    team1_runs INT,
    team2_runs INT,
    team1_wickets INT,
    team2_wickets INT,
    FOREIGN KEY (tournament_id) REFERENCES Tournament(tournament_id),
    FOREIGN KEY (team1_id) REFERENCES Team(team_id),
    FOREIGN KEY (team2_id) REFERENCES Team(team_id)
);

CREATE TABLE Player_Innings (
    player_id INT,
    match_id INT,
    runs INT,
    balls_faced INT,
    wickets INT,
    PRIMARY KEY (player_id, match_id),
    FOREIGN KEY (player_id) REFERENCES Player(player_id),
    FOREIGN KEY (match_id) REFERENCES C_Match(match_id)
);

-- ✅ 3. Insert Sample Data

-- Tournaments
INSERT INTO Tournament (name, start_date, end_date) VALUES
('Asia Cup 2024', '2024-09-01', '2024-09-15'),
('World T20 2024', '2024-10-10', '2024-11-05'),
('Bangladesh Premier League', '2024-12-01', '2025-01-15'),
('IPL 2025', '2025-03-23', '2025-05-28'),
('Big Bash 2024', '2024-12-10', '2025-01-25');

-- Teams
INSERT INTO Team (tournament_id, name, location) VALUES
(1, 'India', 'Delhi'),
(1, 'Bangladesh', 'Dhaka'),
(2, 'Australia', 'Sydney'),
(2, 'England', 'London'),
(3, 'Dhaka Dynamites', 'Dhaka');

-- Players
INSERT INTO Player (team_id, name, d_o_b, batting_style, bowling_style) VALUES
(1, 'Virat Kohli', '1988-11-05', 'Right-hand', 'None'),
(2, 'Shakib Al Hasan', '1987-03-24', 'Left-hand', 'Left-arm'),
(3, 'David Warner', '1986-10-27', 'Left-hand', 'None'),
(4, 'Joe Root', '1990-12-30', 'Right-hand', 'Right-arm'),
(5, 'Mushfiqur Rahim', '1987-05-09', 'Right-hand', 'None');

-- Matches
INSERT INTO C_Match (tournament_id, match_date, venue, team1_id, team2_id, team1_runs, team2_runs, team1_wickets, team2_wickets) VALUES
(1, '2024-09-02', 'Colombo', 1, 2, 240, 230, 8, 9),
(2, '2024-10-15', 'Melbourne', 3, 4, 180, 175, 6, 10),
(3, '2024-12-03', 'Dhaka', 5, 2, 150, 140, 7, 9),
(2, '2024-10-20', 'London', 4, 1, 210, 220, 10, 8),
(4, '2025-03-25', 'Mumbai', 1, 3, 200, 195, 7, 10);

-- Player Innings
INSERT INTO Player_Innings (player_id, match_id, runs, balls_faced, wickets) VALUES
(1, 1, 75, 60, 0),
(2, 1, 68, 55, 2),
(3, 2, 90, 50, 0),
(4, 2, 55, 45, 1),
(5, 3, 40, 30, 0);

-- ✅ 4. SELECT Queries (Data Retrieval)

-- View all players with their team and tournament
SELECT 
  p.player_id,
  p.name AS player_name,
  p.batting_style,
  p.bowling_style,
  t.name AS team_name,
  tm.name AS tournament_name
FROM Player p
JOIN Team t ON p.team_id = t.team_id
JOIN Tournament tm ON t.tournament_id = tm.tournament_id;

-- Match results with team names
SELECT 
  m.match_id,
  m.match_date,
  m.venue,
  t1.name AS team1,
  t2.name AS team2,
  m.team1_runs,
  m.team2_runs,
  m.team1_wickets,
  m.team2_wickets
FROM C_Match m
JOIN Team t1 ON m.team1_id = t1.team_id
JOIN Team t2 ON m.team2_id = t2.team_id;

-- Player innings for a match
SELECT 
  pi.player_id,
  p.name,
  pi.match_id,
  pi.runs,
  pi.balls_faced,
  pi.wickets
FROM Player_Innings pi
JOIN Player p ON pi.player_id = p.player_id
WHERE pi.match_id = 1;

-- ✅ 5. UPDATE Player Info

-- Update a player's name
UPDATE Player
SET name = 'Virat K. Sharma'
WHERE player_id = 1;

-- ✅ 6. DELETE Player (Safe Way)

-- Step-by-step to avoid foreign key issues
DELETE FROM Player_Innings WHERE player_id = 5;
DELETE FROM Player WHERE player_id = 5;
