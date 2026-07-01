import type { Team } from "../types";

// The real 48-team field of the FIFA World Cup 2026 (USA · Canada · Mexico),
// per the official Final Draw of 5 December 2025. Ratings, squad values and
// title odds are estimates; groups, confederations and coaches are real.
// winProbability is 0 for sides already eliminated (group stage or Round of 32).

type T = Omit<Team, "form"> & { form: string };

const RAW: T[] = [
  // ── Group A ────────────────────────────────────────────────────────────
  mk("mexico","Mexico","MEX","mx","CONCACAF","A",14,"#0b6b3a","Javier Aguirre","Mexico","4-3-3",210,27.1,"El Tri",1927,0,[75,72,71,78,80],2.0,"WWDWW"),
  mk("south-africa","South Africa","RSA","za","CAF","A",61,"#007a4d","Hugo Broos","Belgium","4-3-3",90,25.8,"Bafana Bafana",1991,0,[66,63,66,58,68],0,"WWLWL"),
  mk("south-korea","South Korea","KOR","kr","AFC","A",23,"#0047a0","Hong Myung-bo","South Korea","4-2-3-1",210,26.3,"Taegeuk Warriors",1928,0,[73,71,70,72,64],0,"WLDLL"),
  mk("czechia","Czechia","CZE","cz","UEFA","A",42,"#d7141a","Ivan Hašek","Czechia","4-2-3-1",190,26.6,"Národní tým",1901,0,[69,68,69,66,60],0,"LDLWL"),

  // ── Group B ────────────────────────────────────────────────────────────
  mk("canada","Canada","CAN","ca","CONCACAF","B",30,"#c8102e","Jesse Marsch","USA","4-3-3",210,26.0,"Les Rouges",1912,0,[74,70,71,60,84],1.0,"WWDWW"),
  mk("bosnia","Bosnia & Herzegovina","BIH","ba","UEFA","B",74,"#002395","Sergej Barbarez","Bosnia","4-2-3-1",150,26.7,"Zmajevi",1992,0,[70,69,68,58,72],0.6,"WDWLW"),
  mk("qatar","Qatar","QAT","qa","AFC","B",37,"#8a1538","Julen Lopetegui","Spain","3-5-2",60,27.1,"The Maroon",1970,0,[63,64,66,66,50],0,"LDLLL"),
  mk("switzerland","Switzerland","SUI","ch","UEFA","B",19,"#d52b1e","Murat Yakin","Switzerland","4-2-3-1",280,27.5,"Nati",1895,0,[74,74,77,76,74],1.5,"WDWWD"),

  // ── Group C ────────────────────────────────────────────────────────────
  mk("brazil","Brazil","BRA","br","CONMEBOL","C",5,"#ffdf00","Carlo Ancelotti","Italy","4-3-3",980,25.3,"A Seleção",1914,5,[93,89,84,90,86],11.5,"WWDWW"),
  mk("morocco","Morocco","MAR","ma","CAF","C",11,"#c1272d","Walid Regragui","Morocco","4-3-3",340,26.1,"Atlas Lions",1955,0,[80,80,83,76,86],4.6,"WWWDW"),
  mk("haiti","Haiti","HAI","ht","CONCACAF","C",87,"#00209f","Sébastien Migné","France","4-4-2",30,25.4,"Les Grenadiers",1904,0,[58,55,58,50,56],0,"LLDLL"),
  mk("scotland","Scotland","SCO","gb-sct","UEFA","C",39,"#0065bf","Steve Clarke","Scotland","3-5-2",180,27.8,"The Tartan Army",1873,0,[68,68,70,66,58],0,"LWLLD"),

  // ── Group D ────────────────────────────────────────────────────────────
  mk("usa","United States","USA","us","CONCACAF","D",16,"#0a3161","Mauricio Pochettino","Argentina","4-3-3",320,24.8,"USMNT",1913,0,[76,74,72,66,78],2.3,"WDWWD"),
  mk("paraguay","Paraguay","PAR","py","CONMEBOL","D",47,"#d52b1e","Gustavo Alfaro","Argentina","4-4-2",140,26.9,"La Albirroja",1906,0,[69,68,73,70,82],1.0,"WDWDW"),
  mk("australia","Australia","AUS","au","AFC","D",26,"#00843d","Tony Popovic","Australia","4-4-2",150,26.8,"Socceroos",1961,0,[68,66,72,68,72],0.6,"WDDWW"),
  mk("turkiye","Türkiye","TUR","tr","UEFA","D",27,"#e30a17","Vincenzo Montella","Italy","4-2-3-1",380,26.0,"Ay-Yıldızlılar",1923,0,[78,77,73,70,56],0,"LDLWL"),

  // ── Group E ────────────────────────────────────────────────────────────
  mk("germany","Germany","GER","de","UEFA","E",12,"#111111","Julian Nagelsmann","Germany","4-2-3-1",920,25.0,"Die Mannschaft",1900,4,[88,89,82,88,70],0,"WWDLL"),
  mk("curacao","Curaçao","CUW","cw","CONCACAF","E",82,"#002b7f","Dick Advocaat","Netherlands","4-3-3",40,27.2,"Kòrsou",1921,0,[60,58,60,52,58],0,"LDLLL"),
  mk("ivory-coast","Ivory Coast","CIV","ci","CAF","E",40,"#f77f00","Emerse Faé","Ivory Coast","4-3-3",260,25.7,"Les Éléphants",1960,0,[75,73,73,68,68],0,"WWDWL"),
  mk("ecuador","Ecuador","ECU","ec","CONMEBOL","E",24,"#ffce00","Sebastián Beccacece","Argentina","4-4-2",270,25.2,"La Tri",1925,0,[72,71,75,66,66],0,"WDDWL"),

  // ── Group F ────────────────────────────────────────────────────────────
  mk("netherlands","Netherlands","NED","nl","UEFA","F",7,"#f36c21","Ronald Koeman","Netherlands","4-3-3",720,26.2,"Oranje",1889,0,[85,86,82,84,72],0,"WWDWL"),
  mk("japan","Japan","JPN","jp","AFC","F",18,"#bc002d","Hajime Moriyasu","Japan","4-2-3-1",300,25.6,"Samurai Blue",1921,0,[79,80,74,72,74],0,"WWWDL"),
  mk("sweden","Sweden","SWE","se","UEFA","F",28,"#006aa7","Jon Dahl Tomasson","Denmark","4-3-3",280,26.5,"Blågult",1904,0,[76,72,72,66,60],0,"WLDLL"),
  mk("tunisia","Tunisia","TUN","tn","CAF","F",41,"#e70013","Sami Trabelsi","Tunisia","4-3-3",120,27.6,"Eagles of Carthage",1957,0,[68,66,70,66,58],0,"LDLDL"),

  // ── Group G ────────────────────────────────────────────────────────────
  mk("belgium","Belgium","BEL","be","UEFA","G",8,"#e30613","Rudi Garcia","France","4-2-3-1",520,27.6,"Red Devils",1895,0,[83,84,79,85,74],4.4,"WWDWW"),
  mk("egypt","Egypt","EGY","eg","CAF","G",33,"#ce1126","Hossam Hassan","Egypt","4-2-3-1",160,26.7,"The Pharaohs",1921,0,[73,68,71,66,72],0.6,"WDWWD"),
  mk("iran","Iran","IRN","ir","AFC","G",21,"#da0000","Amir Ghalenoei","Iran","4-1-4-1",180,27.4,"Team Melli",1920,0,[70,68,74,72,52],0,"DLWLL"),
  mk("new-zealand","New Zealand","NZL","nz","OFC","G",89,"#111111","Darren Bazeley","England","3-5-2",22,26.6,"All Whites",1891,0,[55,52,58,54,48],0,"DLLLD"),

  // ── Group H ────────────────────────────────────────────────────────────
  mk("spain","Spain","ESP","es","UEFA","H",2,"#d10a11","Luis de la Fuente","Spain","4-3-3",1050,25.4,"La Roja",1913,1,[91,94,85,88,92],15.5,"WWWWW"),
  mk("cape-verde","Cape Verde","CPV","cv","CAF","H",66,"#003893","Bubista","Cape Verde","4-4-2",40,26.1,"Blue Sharks",1978,0,[62,60,63,52,74],0.3,"WWDLW"),
  mk("saudi-arabia","Saudi Arabia","KSA","sa","AFC","H",58,"#1a7a3d","Hervé Renard","France","4-2-3-1",42,26.4,"Green Falcons",1956,0,[62,60,61,58,50],0,"LLDLL"),
  mk("uruguay","Uruguay","URU","uy","CONMEBOL","H",15,"#5cbcff","Marcelo Bielsa","Argentina","3-4-3",430,26.5,"La Celeste",1900,2,[81,82,80,84,54],0,"DLLDL"),

  // ── Group I ────────────────────────────────────────────────────────────
  mk("france","France","FRA","fr","UEFA","I",3,"#1a2b6d","Didier Deschamps","France","4-2-3-1",1120,25.8,"Les Bleus",1919,2,[95,88,88,92,92],13.0,"WWWWW"),
  mk("senegal","Senegal","SEN","sn","CAF","I",17,"#00853f","Pape Thiaw","Senegal","4-3-3",380,26.2,"Lions of Teranga",1960,0,[80,76,80,72,80],2.0,"WWDWW"),
  mk("iraq","Iraq","IRQ","iq","AFC","I",58,"#ce1126","Graham Arnold","Australia","4-2-3-1",30,26.3,"Lions of Mesopotamia",1948,0,[60,58,62,54,52],0,"DLLWL"),
  mk("norway","Norway","NOR","no","UEFA","I",25,"#ba0c2f","Ståle Solbakken","Norway","4-3-3",470,25.2,"Løvene",1902,0,[82,74,72,64,86],2.6,"WWWDW"),

  // ── Group J ────────────────────────────────────────────────────────────
  mk("argentina","Argentina","ARG","ar","CONMEBOL","J",1,"#6cabdd","Lionel Scaloni","Argentina","4-3-3",680,27.9,"La Albiceleste",1893,3,[92,90,86,96,90],14.0,"WWWWD"),
  mk("algeria","Algeria","ALG","dz","CAF","J",38,"#006233","Vladimir Petković","Switzerland","4-3-3",250,26.8,"Les Fennecs",1962,0,[74,73,71,68,74],0.7,"WWDWL"),
  mk("austria","Austria","AUT","at","UEFA","J",22,"#ef3340","Ralf Rangnick","Germany","4-2-2-2",340,26.4,"Das Team",1904,0,[76,77,74,72,76],1.2,"WWDWW"),
  mk("jordan","Jordan","JOR","jo","AFC","J",62,"#007a3d","Jamal Sellami","Morocco","4-3-3",30,26.9,"Al-Nashama",1949,0,[58,56,60,52,48],0,"LDLLL"),

  // ── Group K ────────────────────────────────────────────────────────────
  mk("portugal","Portugal","POR","pt","UEFA","K",6,"#006600","Roberto Martínez","Spain","4-3-3",880,27.0,"A Seleção das Quinas",1914,0,[90,88,82,90,86],8.5,"WWWDW"),
  mk("dr-congo","DR Congo","COD","cd","CAF","K",56,"#007fff","Sébastien Desabre","France","4-2-3-1",120,25.9,"Léopards",1919,0,[68,66,68,58,72],0.4,"WDWLW"),
  mk("uzbekistan","Uzbekistan","UZB","uz","AFC","K",57,"#1eb53a","Timur Kapadze","Uzbekistan","4-4-2",48,25.0,"White Wolves",1946,0,[62,60,61,50,52],0,"LDLLD"),
  mk("colombia","Colombia","COL","co","CONMEBOL","K",13,"#fcd116","Néstor Lorenzo","Argentina","4-2-3-1",420,27.3,"Los Cafeteros",1924,0,[81,82,78,80,84],4.0,"WWWDW"),

  // ── Group L ────────────────────────────────────────────────────────────
  mk("england","England","ENG","gb-eng","UEFA","L",4,"#e0201b","Thomas Tuchel","Germany","4-2-3-1",1180,25.1,"Three Lions",1863,0,[90,86,85,84,88],11.0,"WWWDW"),
  mk("croatia","Croatia","CRO","hr","UEFA","L",10,"#d21034","Zlatko Dalić","Croatia","4-3-3",380,28.9,"Vatreni",1912,0,[78,86,76,88,74],3.0,"WDWWD"),
  mk("ghana","Ghana","GHA","gh","CAF","L",73,"#006b3f","Otto Addo","Ghana","4-2-3-1",210,24.9,"Black Stars",1957,0,[72,70,70,66,72],0.5,"WDLWW"),
  mk("panama","Panama","PAN","pa","CONCACAF","L",30,"#da121a","Thomas Christiansen","Denmark","4-4-2",70,27.0,"La Marea Roja",1937,0,[64,62,65,58,52],0,"LLDWL"),
];

function mk(
  id: string, name: string, short: string, code: string,
  confederation: Team["confederation"], group: string, fifaRank: number,
  color: string, coach: string, coachCountry: string, formation: string,
  marketValue: number, avgAge: number, nickname: string, founded: number,
  titles: number, r: number[], winProbability: number, form: string,
): T {
  return {
    id, name, short, code, confederation, group, fifaRank, color, coach,
    coachCountry, formation, marketValue, avgAge, nickname, founded, titles,
    ratings: { attack: r[0], midfield: r[1], defense: r[2], experience: r[3], form: r[4] },
    winProbability, form,
  };
}

export const TEAMS: Team[] = RAW.map((t) => ({
  ...t,
  form: t.form.split("") as ("W" | "D" | "L")[],
}));

export const TEAM_MAP: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t]),
);

export function team(id: string): Team {
  return TEAM_MAP[id];
}

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
