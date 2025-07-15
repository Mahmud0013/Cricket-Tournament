const tournaments = [];
const teams = [];
const players = [];
const matches = [];
const innings = [];

// Tournament Form
document.getElementById("tournamentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("tournamentName").value;
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const id = Date.now();
  tournaments.push({ id, name, start, end });
  updateTournamentList();
  updateTournamentDropdown();
  this.reset();
});

function updateTournamentList() {
  const list = document.getElementById("tournamentList");
  list.innerHTML = "";
  tournaments.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.name} (${t.start} to ${t.end})`;
    list.appendChild(li);
  });
}

function updateTournamentDropdown() {
  const teamDropdown = document.getElementById("teamTournament");
  const matchDropdown = document.getElementById("matchTournament");
  teamDropdown.innerHTML = "";
  matchDropdown.innerHTML = "";

  tournaments.forEach(t => {
    const opt1 = document.createElement("option");
    opt1.value = t.id;
    opt1.textContent = t.name;
    teamDropdown.appendChild(opt1);

    const opt2 = opt1.cloneNode(true);
    matchDropdown.appendChild(opt2);
  });
}

// Team Form
document.getElementById("teamForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const tournamentId = document.getElementById("teamTournament").value;
  const name = document.getElementById("teamName").value;
  const location = document.getElementById("teamLocation").value;
  const id = Date.now();
  teams.push({ id, tournamentId, name, location });
  updateTeamList();
  updateTeamDropdown();
  this.reset();
});

function updateTeamList() {
  const list = document.getElementById("teamList");
  list.innerHTML = "";
  teams.forEach(t => {
    const tournament = tournaments.find(tr => tr.id == t.tournamentId)?.name || "Unknown";
    const li = document.createElement("li");
    li.textContent = `${t.name} (${t.location}) - ${tournament}`;
    list.appendChild(li);
  });
}

function updateTeamDropdown() {
  const playerTeam = document.getElementById("playerTeam");
  const team1 = document.getElementById("team1");
  const team2 = document.getElementById("team2");

  playerTeam.innerHTML = "";
  team1.innerHTML = "";
  team2.innerHTML = "";

  teams.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.name;
    playerTeam.appendChild(opt);

    const opt1 = opt.cloneNode(true);
    const opt2 = opt.cloneNode(true);
    team1.appendChild(opt1);
    team2.appendChild(opt2);
  });
}

// Player Form
document.getElementById("playerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const teamId = document.getElementById("playerTeam").value;
  const name = document.getElementById("playerName").value;
  const dob = document.getElementById("dob").value;
  const bat = document.getElementById("battingStyle").value;
  const bowl = document.getElementById("bowlingStyle").value;
  const id = Date.now();
  players.push({ id, teamId, name, dob, bat, bowl });
  updatePlayerList();
  updatePlayerDropdown();
  this.reset();
});

function updatePlayerList() {
  const list = document.getElementById("playerList");
  list.innerHTML = "";
  players.forEach(p => {
    const team = teams.find(t => t.id == p.teamId)?.name || "Unknown";
    const li = document.createElement("li");
    li.textContent = `${p.name} - ${team} (${p.bat}, ${p.bowl})`;
    list.appendChild(li);
  });
}

function updatePlayerDropdown() {
  const dropdown = document.getElementById("inningsPlayer");
  dropdown.innerHTML = "";
  players.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.name;
    dropdown.appendChild(option);
  });
}

// Match Form
document.getElementById("matchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = Date.now();
  const tournamentId = document.getElementById("matchTournament").value;
  const matchDate = document.getElementById("matchDate").value;
  const venue = document.getElementById("venue").value;
  const team1Id = document.getElementById("team1").value;
  const team2Id = document.getElementById("team2").value;
  const team1Runs = +document.getElementById("team1Runs").value;
  const team1Wickets = +document.getElementById("team1Wickets").value;
  const team2Runs = +document.getElementById("team2Runs").value;
  const team2Wickets = +document.getElementById("team2Wickets").value;

  matches.push({ id, tournamentId, matchDate, venue, team1Id, team2Id, team1Runs, team1Wickets, team2Runs, team2Wickets });
  updateMatchList();
  updateMatchDropdown();
  this.reset();
});

function updateMatchList() {
  const list = document.getElementById("matchList");
  list.innerHTML = "";
  matches.forEach(m => {
    const team1 = teams.find(t => t.id == m.team1Id)?.name || "Team 1";
    const team2 = teams.find(t => t.id == m.team2Id)?.name || "Team 2";
    const li = document.createElement("li");
    li.textContent = `${m.matchDate} - ${m.venue}: ${team1} ${m.team1Runs}/${m.team1Wickets} vs ${team2} ${m.team2Runs}/${m.team2Wickets}`;
    list.appendChild(li);
  });
}

function updateMatchDropdown() {
  const dropdown = document.getElementById("inningsMatch");
  dropdown.innerHTML = "";
  matches.forEach(m => {
    const team1 = teams.find(t => t.id == m.team1Id)?.name;
    const team2 = teams.find(t => t.id == m.team2Id)?.name;
    const option = document.createElement("option");
    option.value = m.id;
    option.textContent = `${m.matchDate}: ${team1} vs ${team2}`;
    dropdown.appendChild(option);
  });
}

// Player Innings Form
document.getElementById("inningsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const matchId = document.getElementById("inningsMatch").value;
  const playerId = document.getElementById("inningsPlayer").value;
  const runs = +document.getElementById("playerRuns").value;
  const balls = +document.getElementById("ballsFaced").value;
  const wickets = +document.getElementById("playerWickets").value;

  innings.push({ matchId, playerId, runs, balls, wickets });
  updateInningsList();
  this.reset();
});

function updateInningsList() {
  const list = document.getElementById("inningsList");
  list.innerHTML = "";
  innings.forEach(i => {
    const player = players.find(p => p.id == i.playerId)?.name || "Unknown";
    const li = document.createElement("li");
    li.textContent = `${player} - ${i.runs} runs, ${i.balls} balls, ${i.wickets} wickets`;
    list.appendChild(li);
  });
}
