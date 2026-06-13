const TEAMS = {
    ARG: { name: "Argentina", flag: "🇦🇷" }, FRA: { name: "Francia", flag: "🇫🇷" },
    BRA: { name: "Brasil", flag: "🇧🇷" }, ENG: { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    ESP: { name: "España", flag: "🇪🇸" }, GER: { name: "Alemania", flag: "🇩🇪" },
    ITA: { name: "Italia", flag: "🇮🇹" }, POR: { name: "Portugal", flag: "🇵🇹" },
    NED: { name: "Países Bajos", flag: "🇳🇱" }, BEL: { name: "Bélgica", flag: "🇧🇪" },
    CRO: { name: "Croacia", flag: "🇭🇷" }, URU: { name: "Uruguay", flag: "🇺🇾" },
    COL: { name: "Colombia", flag: "🇨🇴" }, MAR: { name: "Marruecos", flag: "🇲🇦" },
    USA: { name: "Estados Unidos", flag: "🇺🇸" }, MEX: { name: "México", flag: "🇲🇽" },
    CAN: { name: "Canadá", flag: "🇨🇦" }, JPN: { name: "Japón", flag: "🇯🇵" },
    SEN: { name: "Senegal", flag: "🇸🇳" }, KOR: { name: "Corea del Sur", flag: "🇰🇷" },
    AUS: { name: "Australia", flag: "🇦🇺" }, IRN: { name: "Irán", flag: "🇮🇷" },
    TUN: { name: "Túnez", flag: "🇹🇳" }, KSA: { name: "Arabia Saudita", flag: "🇸🇦" },
    ECU: { name: "Ecuador", flag: "🇪🇨" }, PER: { name: "Perú", flag: "🇵🇪" },
    CHI: { name: "Chile", flag: "🇨🇱" }, PAR: { name: "Paraguay", flag: "🇵🇾" },
    VEN: { name: "Venezuela", flag: "🇻🇪" }, CRC: { name: "Costa Rica", flag: "🇨🇷" },
    PAN: { name: "Panamá", flag: "🇵🇦" }, JAM: { name: "Jamaica", flag: "🇯🇲" },
    DZA: { name: "Argelia", flag: "🇩🇿" }, NGA: { name: "Nigeria", flag: "🇳🇬" },
    GHA: { name: "Ghana", flag: "🇬🇭" }, CMR: { name: "Camerún", flag: "🇨🇲" },
    EGY: { name: "Egipto", flag: "🇪🇬" }, RSA: { name: "Sudáfrica", flag: "🇿🇦" },
    UKR: { name: "Ucrania", flag: "🇺🇦" }, SWE: { name: "Suecia", flag: "🇸🇪" },
    POL: { name: "Polonia", flag: "🇵🇱" }, WAL: { name: "Gales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
    SCO: { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" }, TUR: { name: "Turquía", flag: "🇹🇷" },
    SUI: { name: "Suiza", flag: "🇨🇭" }, AUT: { name: "Austria", flag: "🇦🇹" },
    NZL: { name: "Nueva Zelanda", flag: "🇳🇿" }, UAE: { name: "Emiratos Árabes", flag: "🇦🇪" }
};

const INITIAL_GROUPS = {
    A: ["MEX", "USA", "CAN", "NZL"],
    B: ["ARG", "ECU", "VEN", "UAE"],
    C: ["FRA", "TUN", "AUT", "JAM"],
    D: ["ENG", "COL", "KOR", "RSA"],
    E: ["BRA", "SUI", "GHA", "PAN"],
    F: ["ESP", "PER", "UKR", "CRC"],
    G: ["GER", "JPN", "CMR", "CHI"],
    H: ["ITA", "SEN", "POL", "PAR"],
    I: ["POR", "MAR", "SWE", "AUS"],
    J: ["NED", "NGA", "TUR", "KSA"],
    K: ["BEL", "CRO", "DZA", "IRN"],
    L: ["URU", "EGY", "WAL", "SCO"]
};

const VENUES = ["Estadio Azteca, CDMX", "MetLife Stadium, NY/NJ", "SoFi Stadium, LA", "Hard Rock Stadium, Miami", "AT&T Stadium, Dallas"];
const BASE_DATE = new Date("2026-06-11T16:00:00-03:00");

function generateGroupMatches() {
    let matches = {};
    let matchId = 1;
    let currentMatchDate = new Date(BASE_DATE);

    Object.keys(INITIAL_GROUPS).forEach((group, gIdx) => {
        const teams = INITIAL_GROUPS[group];
        const pairings = [
            [teams[0], teams[1]], [teams[2], teams[3]],
            [teams[0], teams[2]], [teams[1], teams[3]],
            [teams[3], teams[0]], [teams[1], teams[2]]
        ];

        pairings.forEach((pair, pIdx) => {
            if(pIdx % 2 === 0 && pIdx > 0) {
                currentMatchDate.setDate(currentMatchDate.getDate() + 1);
            }
            matches[`G-${group}-${matchId}`] = {
                id: `G-${group}-${matchId}`,
                group: group,
                home: pair[0],
                away: pair[1],
                homeScore: null,
                awayScore: null,
                date: new Date(currentMatchDate).toISOString(),
                venue: VENUES[(gIdx + pIdx) % VENUES.length]
            };
            matchId++;
        });
    });
    return matches;
}

const BRACKET_TEMPLATES = {
    r32: [
        { id: "R32-1", label: "W37", homeSpec: { type: "G_POS", key: "A1" }, awaySpec: { type: "G_3RD", key: "C/E/F" } },
        { id: "R32-2", label: "W38", homeSpec: { type: "G_POS", key: "B1" }, awaySpec: { type: "G_3RD", key: "A/C/D" } },
        { id: "R32-3", label: "W39", homeSpec: { type: "G_POS", key: "C2" }, awaySpec: { type: "G_POS", key: "D2" } },
        { id: "R32-4", label: "W40", homeSpec: { type: "G_POS", key: "A2" }, awaySpec: { type: "G_POS", key: "B2" } },
        { id: "R32-5", label: "W41", homeSpec: { type: "G_POS", key: "E1" }, awaySpec: { type: "G_3RD", key: "A/B/C/D" } },
        { id: "R32-6", label: "W42", homeSpec: { type: "G_POS", key: "F1" }, awaySpec: { type: "G_3RD", key: "G/H/I" } },
        { id: "R32-7", label: "W43", homeSpec: { type: "G_POS", key: "G2" }, awaySpec: { type: "G_POS", key: "H2" } },
        { id: "R32-8", label: "W44", homeSpec: { type: "G_POS", key: "E2" }, awaySpec: { type: "G_POS", key: "F2" } },
        { id: "R32-9", label: "W45", homeSpec: { type: "G_POS", key: "I1" }, awaySpec: { type: "G_3RD", key: "C/D/E" } },
        { id: "R32-10", label: "W46", homeSpec: { type: "G_POS", key: "J1" }, awaySpec: { type: "G_3RD", key: "H/I/J" } },
        { id: "R32-11", label: "W47", homeSpec: { type: "G_POS", key: "K2" }, awaySpec: { type: "G_POS", key: "L2" } },
        { id: "R32-12", label: "W48", homeSpec: { type: "G_POS", key: "I2" }, awaySpec: { type: "G_POS", key: "J2" } },
        { id: "R32-13", label: "W49", homeSpec: { type: "G_POS", key: "C1" }, awaySpec: { type: "G_3RD", key: "F/G/H" } },
        { id: "R32-14", label: "W50", homeSpec: { type: "G_POS", key: "D1" }, awaySpec: { type: "G_3RD", key: "I/J/K" } },
        { id: "R32-15", label: "W51", homeSpec: { type: "G_POS", key: "G1" }, awaySpec: { type: "G_3RD", key: "A/E/J" } },
        { id: "R32-16", label: "W52", homeSpec: { type: "G_POS", key: "H1" }, awaySpec: { type: "G_3RD", key: "B/F/K" } }
    ],
    r16: [
        { id: "R16-1", label: "W53", homeSpec: { type: "PREV_WINNER", key: "R32-1" }, awaySpec: { type: "PREV_WINNER", key: "R32-3" } },
        { id: "R16-2", label: "W54", homeSpec: { type: "PREV_WINNER", key: "R32-2" }, awaySpec: { type: "PREV_WINNER", key: "R32-4" } },
        { id: "R16-3", label: "W55", homeSpec: { type: "PREV_WINNER", key: "R32-5" }, awaySpec: { type: "PREV_WINNER", key: "R32-7" } },
        { id: "R16-4", label: "W56", homeSpec: { type: "PREV_WINNER", key: "R32-6" }, awaySpec: { type: "PREV_WINNER", key: "R32-8" } },
        { id: "R16-5", label: "W57", homeSpec: { type: "PREV_WINNER", key: "R32-9" }, awaySpec: { type: "PREV_WINNER", key: "R32-11" } },
        { id: "R16-6", label: "W58", homeSpec: { type: "PREV_WINNER", key: "R32-10" }, awaySpec: { type: "PREV_WINNER", key: "R32-12" } },
        { id: "R16-7", label: "W59", homeSpec: { type: "PREV_WINNER", key: "R32-13" }, awaySpec: { type: "PREV_WINNER", key: "R32-15" } },
        { id: "R16-8", label: "W60", homeSpec: { type: "PREV_WINNER", key: "R32-14" }, awaySpec: { type: "PREV_WINNER", key: "R32-16" } }
    ],
    r8: [
        { id: "R8-1", label: "W61", homeSpec: { type: "PREV_WINNER", key: "R16-1" }, awaySpec: { type: "PREV_WINNER", key: "R16-3" } },
        { id: "R8-2", label: "W62", homeSpec: { type: "PREV_WINNER", key: "R16-2" }, awaySpec: { type: "PREV_WINNER", key: "R16-4" } },
        { id: "R8-3", label: "W63", homeSpec: { type: "PREV_WINNER", key: "R16-5" }, awaySpec: { type: "PREV_WINNER", key: "R16-7" } },
        { id: "R8-4", label: "W64", homeSpec: { type: "PREV_WINNER", key: "R16-6" }, awaySpec: { type: "PREV_WINNER", key: "R16-8" } }
    ],
    r4: [
        { id: "R4-1", label: "W65", homeSpec: { type: "PREV_WINNER", key: "R8-1" }, awaySpec: { type: "PREV_WINNER", key: "R8-3" } },
        { id: "R4-2", label: "W66", homeSpec: { type: "PREV_WINNER", key: "R8-2" }, awaySpec: { type: "PREV_WINNER", key: "R8-4" } }
    ],
    r3_place: [
        { id: "R3P-1", label: "3rd Place", homeSpec: { type: "PREV_LOSER", key: "R4-1" }, awaySpec: { type: "PREV_LOSER", key: "R4-2" } }
    ],
    r2: [
        { id: "R2-1", label: "Final", homeSpec: { type: "PREV_WINNER", key: "R4-1" }, awaySpec: { type: "PREV_WINNER", key: "R4-2" } }
    ]
};

function getFifaThirdsMapping(activeThirdsLetterSet) {
    const defaultMapping = {
        "C/E/F": "C", "A/C/D": "A", "A/B/C/D": "B", "G/H/I": "G",
        "C/D/E": "D", "H/I/J": "H", "F/G/H": "F", "I/J/K": "I",
        "A/E/J": "E", "B/F/K": "K"
    };
    
    let sortedThirds = [...activeThirdsLetterSet].sort();
    if(sortedThirds.length < 8) return defaultMapping;

    let mapping = {};
    BRACKET_TEMPLATES.r32.forEach(m => {
        if(m.awaySpec.type === "G_3RD") {
            let options = m.awaySpec.key.split('/');
            let matchGroup = sortedThirds.find(g => options.includes(g));
            if(!matchGroup) {
                matchGroup = sortedThirds.pop(); 
            } else {
                sortedThirds = sortedThirds.filter(g => g !== matchGroup);
            }
            mapping[m.awaySpec.key] = matchGroup || "A";
        }
    });
    return mapping;
}

let state = {
    groupMatches: {},
    eliminationMatches: {},
    groupTables: {}
};

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupTabs();
    setupResetButton();
});

function initApp() {
    const saved = localStorage.getItem("mundial_2026_state");
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            buildFreshState();
        }
    } else {
        buildFreshState();
    }
    
    calculateGroupStages();
    renderGroupStage();
    calculateAndRenderElimination();
    renderTodayMatches();
}

function buildFreshState() {
    state.groupMatches = generateGroupMatches();
    state.eliminationMatches = {};
    Object.keys(BRACKET_TEMPLATES).forEach(phase => {
        BRACKET_TEMPLATES[phase].forEach(m => {
            state.eliminationMatches[m.id] = {
                id: m.id,
                homeScore: null,
                awayScore: null,
                homePen: null,
                awayPen: null
            };
        });
    });
}

function saveState() {
    localStorage.setItem("mundial_2026_state", JSON.stringify(state));
}

function calculateGroupStages() {
    state.groupTables = {};
    
    Object.keys(INITIAL_GROUPS).forEach(group => {
        state.groupTables[group] = [];
        INITIAL_GROUPS[group].forEach(team => {
            state.groupTables[group].push({
                team: team, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0
            });
        });
    });

    Object.values(state.groupMatches).forEach(m => {
        if(m.homeScore !== null && m.awayScore !== null) {
            const hScore = parseInt(m.homeScore);
            const aScore = parseInt(m.awayScore);
            
            let table = state.groupTables[m.group];
            let hRow = table.find(r => r.team === m.home);
            let aRow = table.find(r => r.team === m.away);

            hRow.pj++; aRow.pj++;
            hRow.gf += hScore; aRow.gf += aScore;
            hRow.gc += aScore; aRow.gc += hScore;
            hRow.dg = hRow.gf - hRow.gc;
            aRow.dg = aRow.gf - aRow.gc;

            if (hScore > aScore) {
                hRow.pg++; hRow.pts += 3; aRow.pp++;
            } else if (hScore < aScore) {
                aRow.pg++; aRow.pts += 3; hRow.pp++;
            } else {
                hRow.pe++; aRow.pe++; hRow.pts += 1; aRow.pts += 1;
            }
        }
    });

    Object.keys(state.groupTables).forEach(group => {
        state.groupTables[group].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.dg !== a.dg) return b.dg - a.dg;
            if (b.gf !== a.gf) return b.gf - a.gf;
            return a.team.localeCompare(b.team);
        });
    });
}

function renderGroupStage() {
    const container = document.getElementById("groups-container");
    container.innerHTML = "";

    Object.keys(state.groupTables).forEach(group => {
        const card = document.createElement("div");
        card.className = "group-card";
        
        let html = `<h3>GRUPO ${group}</h3>`;
        html += `
        <div class="table-wrapper">
            <table class="positions-table">
                <thead>
                    <tr>
                        <th style="text-align:left;">Equipo</th>
                        <th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th>
                    </tr>
                </thead>
                <tbody>`;
        
        state.groupTables[group].forEach(row => {
            const teamData = TEAMS[row.team];
            html += `
                <tr>
                    <td class="team-row-name"><span class="flag">${teamData.flag}</span> ${teamData.name}</td>
                    <td>${row.pj}</td>
                    <td>${row.pg}</td>
                    <td>${row.pe}</td>
                    <td>${row.pp}</td>
                    <td>${row.gf}</td>
                    <td>${row.gc}</td>
                    <td>${row.dg}</td>
                    <td><strong>${row.pts}</strong></td>
                </tr>`;
        });
        
        html += `</tbody></table></div><div class="matches-list">`;

        Object.values(state.groupMatches).filter(m => m.group === group).forEach(m => {
            const hTeam = TEAMS[m.home];
            const aTeam = TEAMS[m.away];
            const fDate = new Date(m.date).toLocaleString("es-AR", {day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit'});

            html += `
            <div class="match-item">
                <div class="match-meta">
                    <span>${fDate} (ARG)</span>
                    <span>${m.venue}</span>
                </div>
                <div class="match-team-row">
                    <div class="team-info"><span class="flag">${hTeam.flag}</span> <span>${hTeam.name}</span></div>
                    <input type="number" min="0" class="match-input" data-match-id="${m.id}" data-side="home" value="${m.homeScore !== null ? m.homeScore : ''}">
                </div>
                <div class="match-team-row">
                    <div class="team-info"><span class="flag">${aTeam.flag}</span> <span>${aTeam.name}</span></div>
                    <input type="number" min="0" class="match-input" data-match-id="${m.id}" data-side="away" value="${m.awayScore !== null ? m.awayScore : ''}">
                </div>
            </div>`;
        });

        html += `</div>`;
        card.innerHTML = html;
        container.appendChild(card);
    });

    container.querySelectorAll(".match-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const mId = e.target.dataset.matchId;
            const side = e.target.dataset.side;
            const val = e.target.value === "" ? null : parseInt(e.target.value);
            
            if(side === "home") state.groupMatches[mId].homeScore = val;
            else state.groupMatches[mId].awayScore = val;
            
            calculateGroupStages();
            renderGroupStage();
            calculateAndRenderElimination();
            saveState();
        });
    });
}

function calculateAndRenderElimination() {
    let groupResults = {}; 
    let thirdsPool = [];

    Object.keys(state.groupTables).forEach(group => {
        const table = state.groupTables[group];
        groupResults[group + "1"] = table[0].team;
        groupResults[group + "2"] = table[1].team;
        
        thirdsPool.push({
            group: group,
            team: table[2].team,
            pts: table[2].pts,
            dg: table[2].dg,
            gf: table[2].gf
        });
    });

    thirdsPool.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.dg !== a.dg) return b.dg - a.dg;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.group.localeCompare(b.group);
    });

    let bestThirds = thirdsPool.slice(0, 8);
    let activeThirdsLetterSet = new Set(bestThirds.map(t => t.group));
    let thirdsMapping = getFifaThirdsMapping(activeThirdsLetterSet);

    let computedMatches = {};

    function getTeamBySpec(spec, currentPhaseMatches) {
        if (spec.type === "G_POS") {
            return groupResults[spec.key];
        }
        if (spec.type === "G_3RD") {
            let assignedGroupLetter = thirdsMapping[spec.key];
            let targetThird = bestThirds.find(t => t.group === assignedGroupLetter);
            return targetThird ? targetThird.team : null;
        }
        if (spec.type === "PREV_WINNER") {
            let pm = currentPhaseMatches[spec.key] || state.eliminationMatches[spec.key];
            if (!pm || pm.homeScore === null || pm.awayScore === null) return null;
            if (parseInt(pm.homeScore) > parseInt(pm.awayScore)) return pm.homeTeam;
            if (parseInt(pm.homeScore) < parseInt(pm.awayScore)) return pm.awayTeam;
            return (parseInt(pm.homePen) >= parseInt(pm.awayPen)) ? pm.homeTeam : pm.awayTeam;
        }
        if (spec.type === "PREV_LOSER") {
            let pm = currentPhaseMatches[spec.key] || state.eliminationMatches[spec.key];
            if (!pm || pm.homeScore === null || pm.awayScore === null) return null;
            if (parseInt(pm.homeScore) > parseInt(pm.awayScore)) return pm.awayTeam;
            if (parseInt(pm.homeScore) < parseInt(pm.awayScore)) return pm.homeTeam;
            return (parseInt(pm.homePen) >= parseInt(pm.awayPen)) ? pm.awayTeam : pm.homeTeam;
        }
        return null;
    }

    Object.keys(BRACKET_TEMPLATES).forEach(phaseKey => {
        BRACKET_TEMPLATES[phaseKey].forEach(template => {
            let homeTeam = getTeamBySpec(template.homeSpec, computedMatches);
            let awayTeam = getTeamBySpec(template.awaySpec, computedMatches);
            
            let savedMatch = state.eliminationMatches[template.id] || { homeScore: null, awayScore: null, homePen: null, awayPen: null };
            
            computedMatches[template.id] = {
                ...savedMatch,
                label: template.label,
                homeTeam: homeTeam,
                awayTeam: awayTeam
            };
        });
    });

    Object.keys(computedMatches).forEach(id => {
        state.eliminationMatches[id].homeTeam = computedMatches[id].homeTeam;
        state.eliminationMatches[id].awayTeam = computedMatches[id].awayTeam;
    });

    renderEliminationGrid("r32-grid", BRACKET_TEMPLATES.r32);
    renderEliminationGrid("r16-grid", BRACKET_TEMPLATES.r16);
    renderEliminationGrid("r8-grid", BRACKET_TEMPLATES.r8);
    renderEliminationGrid("r4-grid", BRACKET_TEMPLATES.r4);
    renderEliminationGrid("r3_place-grid", BRACKET_TEMPLATES.r3_place);
    renderEliminationGrid("r2-grid", BRACKET_TEMPLATES.r2);

    renderPodium();
}

function renderEliminationGrid(gridId, templates) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = "";

    templates.forEach(t => {
        const m = state.eliminationMatches[t.id];
        const hTeam = m.homeTeam ? TEAMS[m.homeTeam] : { name: `Ganador ${t.homeSpec.key || '?'}`, flag: "🏳️" };
        const aTeam = m.awayTeam ? TEAMS[m.awayTeam] : { name: `Ganador ${t.awaySpec.key || '?'}`, flag: "🏳️" };
        
        const isTie = m.homeScore !== null && m.awayScore !== null && parseInt(m.homeScore) === parseInt(m.awayScore);

        const card = document.createElement("div");
        card.className = "match-item";
        card.innerHTML = `
            <div class="match-meta">
                <span>Partído: ${t.label}</span>
                <span>Eliminatoria</span>
            </div>
            <div class="match-team-row">
                <div class="team-info"><span class="flag">${hTeam.flag}</span> <span>${hTeam.name}</span></div>
                <div style="display:flex; gap: 5px; align-items:center;">
                    ${isTie ? `<div class="penalty-box">(PK) <input type="number" min="0" class="match-input penalty-input" data-match-id="${t.id}" data-side="homePen" value="${m.homePen !== null ? m.homePen : ''}"></div>` : ''}
                    <input type="number" min="0" class="match-input" ${!m.homeTeam?'disabled':''} data-match-id="${t.id}" data-side="home" value="${m.homeScore !== null ? m.homeScore : ''}">
                </div>
            </div>
            <div class="match-team-row">
                <div class="team-info"><span class="flag">${aTeam.flag}</span> <span>${aTeam.name}</span></div>
                <div style="display:flex; gap: 5px; align-items:center;">
                    ${isTie ? `<div class="penalty-box">(PK) <input type="number" min="0" class="match-input penalty-input" data-match-id="${t.id}" data-side="awayPen" value="${m.awayPen !== null ? m.awayPen : ''}"></div>` : ''}
                    <input type="number" min="0" class="match-input" ${!m.awayTeam?'disabled':''} data-match-id="${t.id}" data-side="away" value="${m.awayScore !== null ? m.awayScore : ''}">
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    grid.querySelectorAll(".match-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const mId = e.target.dataset.matchId;
            const side = e.target.dataset.side;
            const val = e.target.value === "" ? null : parseInt(e.target.value);
            
            state.eliminationMatches[mId][side] = val;
            
            calculateAndRenderElimination();
            saveState();
        });
    });
}

function renderPodium() {
    const finalMatch = state.eliminationMatches["R2-1"];
    const thirdMatch = state.eliminationMatches["R3P-1"];

    let champion = null, subchampion = null, thirdPlace = null;

    if (finalMatch && finalMatch.homeScore !== null && finalMatch.awayScore !== null) {
        let h = parseInt(finalMatch.homeScore);
        let a = parseInt(finalMatch.awayScore);
        if (h > a) { champion = finalMatch.homeTeam; subchampion = finalMatch.awayTeam; }
        else if (a > h) { champion = finalMatch.awayTeam; subchampion = finalMatch.homeTeam; }
        else {
            champion = (parseInt(finalMatch.homePen) >= parseInt(finalMatch.awayPen)) ? finalMatch.homeTeam : finalMatch.awayTeam;
            subchampion = (champion === finalMatch.homeTeam) ? finalMatch.awayTeam : finalMatch.homeTeam;
        }
    }

    if (thirdMatch && thirdMatch.homeScore !== null && thirdMatch.awayScore !== null) {
        let h = parseInt(thirdMatch.homeScore);
        let a = parseInt(thirdMatch.awayScore);
        if (h > a) thirdPlace = thirdMatch.homeTeam;
        else if (a > h) thirdPlace = thirdMatch.awayTeam;
        else {
            thirdPlace = (parseInt(thirdMatch.homePen) >= parseInt(thirdMatch.awayPen)) ? thirdMatch.homeTeam : thirdMatch.awayTeam;
        }
    }

    document.getElementById("podium-1-name").innerText = champion ? TEAMS[champion].name.toUpperCase() : "CAMPEÓN";
    document.getElementById("podium-1-flag").innerText = champion ? TEAMS[champion].flag : "─";
    
    document.getElementById("podium-2-name").innerText = subchampion ? TEAMS[subchampion].name : "Subcampeón";
    document.getElementById("podium-2-flag").innerText = subchampion ? TEAMS[subchampion].flag : "─";

    document.getElementById("podium-3-name").innerText = thirdPlace ? TEAMS[thirdPlace].name : "Tercer Puesto";
    document.getElementById("podium-3-flag").innerText = thirdPlace ? TEAMS[thirdPlace].flag : "─";
}

function renderTodayMatches() {
    const todayGrid = document.getElementById("today-matches-grid");
    const todaySection = document.getElementById("today-section");
    
    const todayStr = new Date().toISOString().split('T')[0];
    
    let matchesToday = Object.values(state.groupMatches).filter(m => m.date.startsWith(todayStr));

    if (matchesToday.length === 0) {
        todaySection.classList.add("hidden");
        return;
    }

    todaySection.classList.remove("hidden");
    todayGrid.innerHTML = "";

    matchesToday.forEach(m => {
        const hTeam = TEAMS[m.home];
        const aTeam = TEAMS[m.away];
        const fDate = new Date(m.date).toLocaleString("es-AR", {hour:'2-digit', minute:'2-digit'});

        const card = document.createElement("div");
        card.className = "match-item";
        card.style.borderColor = "var(--primary)";
        card.innerHTML = `
            <div class="match-meta">
                <span style="color:var(--primary); font-weight:bold;">● EN VIVO / HOY</span>
                <span>${fDate} hs</span>
            </div>
            <div class="match-team-row">
                <div class="team-info"><span class="flag">${hTeam.flag}</span> <span>${hTeam.name}</span></div>
                <strong>${m.homeScore !== null ? m.homeScore : '-'}</strong>
            </div>
            <div class="match-team-row">
                <div class="team-info"><span class="flag">${aTeam.flag}</span> <span>${aTeam.name}</span></div>
                <strong>${m.awayScore !== null ? m.awayScore : '-'}</strong>
            </div>
        `;
        todayGrid.appendChild(card);
    });
}

function setupTabs() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            
            e.target.classList.add("active");
            const target = e.target.dataset.target;
            document.getElementById(target).classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function setupResetButton() {
    document.getElementById("btn-reset").addEventListener("click", () => {
        if (confirm("⚠️ ¿Estás completamente seguro de querer restablecer todo el torneo? Se perderán todos los resultados cargados.")) {
            localStorage.removeItem("mundial_2026_state");
            buildFreshState();
            calculateGroupStages();
            renderGroupStage();
            calculateAndRenderElimination();
            renderTodayMatches();
            
            document.querySelector(".nav-link[data-target='fase-grupos']").click();
        }
    });
}