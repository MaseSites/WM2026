import type { Player, Position } from "../types";

let SEED = 1;
function mk(
  id: string, name: string, teamId: string, number: number, position: Position,
  detailPosition: string, age: number, height: number, foot: Player["foot"],
  club: string, clubCountry: string, marketValue: number, rating: number,
  goals: number, assists: number, minutes: number,
  s: [number, number, number, number, number, number],
  strengths: string[], weaknesses: string[],
): Player {
  return {
    id, name, teamId, number, position, detailPosition, age, height, foot, club,
    clubCountry, marketValue, rating, goals, assists, minutes,
    photoSeed: SEED++,
    stats: {
      passAccuracy: s[0], shotsPerGame: s[1], keyPasses: s[2],
      dribbles: s[3], tackles: s[4], duelsWon: s[5],
    },
    strengths, weaknesses,
  };
}

export const PLAYERS: Player[] = [
  // ── Argentina ──────────────────────────────────────────────────────────
  mk("dibu-martinez","Emiliano Martínez","argentina",23,"GK","Goalkeeper",33,195,"Right","Aston Villa","gb-eng",28,7.4,0,0,540,[78,0,0.1,0.2,0,1.4],["Penalty specialist","Commanding presence"],["Distribution under press"]),
  mk("molina","Nahuel Molina","argentina",26,"DF","Right-back",27,175,"Right","Atlético Madrid","es",30,7.0,1,2,510,[84,0.9,1.1,1.4,2.1,5.6],["Overlapping runs","Stamina"],["Aerial duels"]),
  mk("romero","Cristian Romero","argentina",13,"DF","Centre-back",28,185,"Right","Tottenham","gb-eng",60,7.3,1,0,540,[88,0.4,0.6,0.8,3.2,7.1],["Front-foot defending","Passing range"],["Discipline"]),
  mk("otamendi","Nicolás Otamendi","argentina",19,"DF","Centre-back",38,183,"Right","Benfica","pt",4,7.1,0,0,540,[86,0.3,0.3,0.4,2.6,6.8],["Leadership","Positioning"],["Recovery pace"]),
  mk("tagliafico","Nicolás Tagliafico","argentina",3,"DF","Left-back",33,172,"Left","Lyon","fr",8,7.0,0,1,510,[85,0.5,0.9,1.1,2.4,5.9],["Tenacity","Set-piece delivery"],["Height"]),
  mk("de-paul","Rodrigo De Paul","argentina",7,"MF","Central midfield",31,180,"Right","Atlético Madrid","es",25,7.2,0,3,530,[87,1.1,1.6,1.8,2.8,6.4],["Engine","Ball progression"],["Rash tackles"]),
  mk("mac-allister","Alexis Mac Allister","argentina",20,"MF","Central midfield",27,174,"Right","Liverpool","gb-eng",70,7.6,2,2,540,[90,1.3,2.1,1.7,2.5,6.0],["Composure","Two-way work"],["Top-end pace"]),
  mk("enzo","Enzo Fernández","argentina",24,"MF","Deep-lying playmaker",25,178,"Right","Chelsea","gb-eng",75,7.5,1,3,540,[91,1.0,2.4,1.3,2.9,5.7],["Vision","Switching play"],["Physical duels"]),
  mk("julian","Julián Álvarez","argentina",9,"FW","Forward",26,170,"Right","Atlético Madrid","es",95,8.3,5,2,540,[84,3.8,1.9,2.2,1.4,4.8],["Movement","Relentless press","Two-footed finishing"],["Aerial threat"]),
  mk("messi","Lionel Messi","argentina",10,"FW","Right winger",39,170,"Left","Inter Miami","us",20,8.6,6,5,540,[89,3.1,4.2,3.6,0.9,4.1],["Vision","Set-pieces","Game intelligence"],["Defensive output"]),
  mk("almada","Thiago Almada","argentina",11,"FW","Left winger",25,172,"Right","Atlético Madrid","es",45,7.4,2,2,470,[85,2.4,2.0,2.8,1.2,4.4],["Directness","Left foot"],["Consistency"]),
  mk("nico-gonzalez","Nicolás González","argentina",21,"FW","Winger",27,180,"Right","Juventus","it",32,7.1,1,1,300,[82,2.1,1.5,1.9,1.5,5.2],["Power","Crossing"],["Final ball"]),
  mk("paredes","Leandro Paredes","argentina",5,"MF","Defensive midfield",31,180,"Right","Roma","it",14,7.0,0,1,260,[89,0.7,1.4,0.7,2.4,5.1],["Long passing","Tempo"],["Mobility"]),
  mk("cuti-lo-celso","Giovani Lo Celso","argentina",18,"MF","Attacking midfield",30,177,"Left","Real Betis","es",18,7.0,1,1,240,[86,1.4,2.0,1.6,1.9,4.8],["Between the lines","Left foot"],["Robustness"]),

  // ── Spain ──────────────────────────────────────────────────────────────
  mk("simon","Unai Simón","spain",23,"GK","Goalkeeper",29,190,"Right","Athletic Club","es",30,7.3,0,0,540,[86,0,0.2,0.3,0,1.1],["Sweeping","Feet"],["Crosses"]),
  mk("carvajal","Dani Carvajal","spain",2,"DF","Right-back",34,173,"Right","Real Madrid","es",15,7.2,0,1,510,[87,0.6,1.0,0.9,2.6,6.1],["Big-game temperament","Overlaps"],["Recovery pace"]),
  mk("le-normand","Robin Le Normand","spain",3,"DF","Centre-back",29,187,"Right","Atlético Madrid","es",40,7.3,0,0,540,[91,0.3,0.4,0.5,2.4,6.9],["Anticipation","Build-up"],["Turning speed"]),
  mk("cubarsi","Pau Cubarsí","spain",5,"DF","Centre-back",19,184,"Right","Barcelona","es",70,7.5,0,0,540,[93,0.2,0.6,0.6,2.1,6.4],["Line-breaking passes","Calm"],["Physical strength"]),
  mk("cucurella","Marc Cucurella","spain",24,"DF","Left-back",27,172,"Left","Chelsea","gb-eng",45,7.4,0,2,540,[89,0.7,1.4,1.5,3.0,6.6],["Defensive grit","Inverted runs"],["Aerial duels"]),
  mk("rodri","Rodri","spain",16,"MF","Defensive midfield",30,191,"Right","Manchester City","gb-eng",120,8.1,1,2,540,[93,1.0,1.8,1.0,3.1,7.4],["Positional mastery","Progression"],["Top-end pace"]),
  mk("pedri","Pedri","spain",8,"MF","Central midfield",23,174,"Right","Barcelona","es",140,8.0,1,3,540,[94,1.2,2.6,2.1,2.6,5.9],["Press resistance","Tempo"],["Goal output"]),
  mk("fabian","Fabián Ruiz","spain",6,"MF","Central midfield",30,189,"Left","PSG","fr",55,7.6,2,1,520,[91,1.5,2.0,1.4,2.4,6.2],["Late runs","Left foot"],["Recovery runs"]),
  mk("yamal","Lamine Yamal","spain",19,"FW","Right winger",18,180,"Left","Barcelona","es",200,8.5,5,6,540,[88,3.2,3.9,4.3,1.1,5.0],["1v1 dribbling","Chance creation","Left foot"],["Physical duels"]),
  mk("oyarzabal","Mikel Oyarzabal","spain",21,"FW","Striker",29,181,"Left","Real Sociedad","es",40,7.7,4,2,510,[85,3.0,1.6,1.5,1.3,5.3],["Movement","Penalty nerve"],["Pace in behind"]),
  mk("nico-williams","Nico Williams","spain",17,"FW","Left winger",24,181,"Right","Barcelona","es",80,7.9,3,4,530,[84,2.8,2.7,3.9,1.4,5.5],["Explosive pace","Directness"],["Decision-making"]),
  mk("merino","Mikel Merino","spain",18,"MF","Box-to-box",30,188,"Right","Arsenal","gb-eng",60,7.4,2,1,300,[88,1.6,1.4,1.0,2.7,6.9],["Aerial threat","Late runs"],["Turn of pace"]),
  mk("olmo","Dani Olmo","spain",10,"FW","Attacking midfield",28,179,"Right","Barcelona","es",60,7.5,2,2,320,[87,2.2,2.4,1.8,1.5,5.0],["Third-man runs","Finishing"],["Availability"]),
  mk("laporte","Aymeric Laporte","spain",14,"DF","Centre-back",32,189,"Left","Athletic Club","es",20,7.1,0,0,240,[90,0.3,0.5,0.4,2.2,6.6],["Left-footed build-up","Reading"],["Recovery pace"]),

  // ── France ─────────────────────────────────────────────────────────────
  mk("maignan","Mike Maignan","france",1,"GK","Goalkeeper",30,191,"Right","AC Milan","it",35,7.5,0,0,540,[85,0,0.2,0.3,0,1.3],["Shot-stopping","Distribution"],["Occasional lapses"]),
  mk("kounde","Jules Koundé","france",5,"DF","Right-back",27,178,"Right","Barcelona","es",60,7.4,0,1,540,[90,0.6,1.1,1.3,2.6,6.5],["Versatility","Recovery pace"],["Crossing"]),
  mk("saliba","William Saliba","france",17,"DF","Centre-back",25,192,"Right","Arsenal","gb-eng",80,7.7,0,0,540,[92,0.3,0.5,0.7,2.5,7.3],["Pace","Composure on ball"],["Aerial consistency"]),
  mk("upamecano","Dayot Upamecano","france",4,"DF","Centre-back",27,186,"Right","Bayern Munich","de",60,7.3,1,0,520,[89,0.4,0.4,0.6,2.8,7.0],["Physicality","Ball-carrying"],["Rash moments"]),
  mk("theo","Theo Hernández","france",22,"DF","Left-back",28,184,"Left","Al-Hilal","sa",40,7.4,1,2,540,[85,1.3,1.6,2.1,2.2,6.3],["Direct running","Shooting"],["Positional discipline"]),
  mk("tchouameni","Aurélien Tchouaméni","france",8,"MF","Defensive midfield",26,187,"Right","Real Madrid","es",90,7.6,0,1,540,[91,0.9,1.2,0.9,3.0,7.1],["Screening","Long passing"],["Creativity"]),
  mk("camavinga","Eduardo Camavinga","france",6,"MF","Central midfield",23,182,"Left","Real Madrid","es",90,7.5,0,2,510,[90,0.8,1.7,2.4,2.9,6.7],["Ball retention","Athleticism"],["Final third product"]),
  mk("zaire-emery","Warren Zaïre-Emery","france",14,"MF","Central midfield",20,178,"Right","PSG","fr",70,7.3,1,1,470,[89,1.1,1.9,1.6,2.6,6.0],["Maturity","Box arrivals"],["Experience"]),
  mk("dembele","Ousmane Dembélé","france",11,"FW","Right winger",29,178,"Both","PSG","fr",110,8.2,4,4,540,[84,3.0,3.1,4.6,1.2,5.1],["Two-footedness","Acceleration","Chance creation"],["Consistency"]),
  mk("mbappe","Kylian Mbappé","france",10,"FW","Striker",27,178,"Right","Real Madrid","es",180,8.9,6,3,540,[83,4.6,2.3,3.8,0.8,4.9],["Elite pace","Finishing","Big moments"],["Pressing intensity"]),
  mk("barcola","Bradley Barcola","france",20,"FW","Left winger",23,182,"Right","PSG","fr",70,7.6,3,3,500,[85,2.6,2.4,3.4,1.3,4.6],["Verticality","End product"],["Physical duels"]),
  mk("kolo-muani","Randal Kolo Muani","france",12,"FW","Striker",27,187,"Right","Juventus","it",45,7.2,2,1,280,[81,2.9,1.3,1.7,1.4,5.6],["Hold-up play","Runs in behind"],["Finishing efficiency"]),
  mk("rabiot","Adrien Rabiot","france",13,"MF","Box-to-box",31,188,"Right","Marseille","fr",30,7.3,2,1,300,[88,1.5,1.4,1.2,2.4,6.5],["Late runs","Height"],["Turn of pace"]),
  mk("konate","Ibrahima Konaté","france",15,"DF","Centre-back",27,194,"Right","Real Madrid","es",55,7.2,0,0,260,[88,0.4,0.4,0.8,2.6,7.4],["Aerial dominance","Pace"],["Concentration"]),

  // ── Brazil ─────────────────────────────────────────────────────────────
  mk("alisson","Alisson","brazil",1,"GK","Goalkeeper",33,193,"Right","Liverpool","gb-eng",25,7.5,0,0,540,[87,0,0.2,0.3,0,1.2],["Sweeping","1v1s"],["Set-piece marshalling"]),
  mk("danilo","Danilo","brazil",2,"DF","Right-back",34,184,"Right","Flamengo","br",6,7.0,0,1,510,[87,0.5,0.9,1.0,2.4,6.0],["Experience","Versatility"],["Pace"]),
  mk("marquinhos","Marquinhos","brazil",4,"DF","Centre-back",32,183,"Right","PSG","fr",30,7.4,1,0,540,[91,0.4,0.6,0.7,2.6,7.0],["Reading","Ball-playing"],["Height in box"]),
  mk("gabriel","Gabriel Magalhães","brazil",3,"DF","Centre-back",28,190,"Left","Arsenal","gb-eng",65,7.5,2,0,540,[89,0.6,0.4,0.6,2.9,7.6],["Aerial threat","Aggression"],["Turning"]),
  mk("wesley","Wesley","brazil",6,"DF","Left-back",22,179,"Right","Roma","it",30,7.1,0,2,510,[84,1.0,1.5,2.3,2.2,5.8],["Athletic overlaps","Energy"],["Defensive reads"]),
  mk("bruno-guimaraes","Bruno Guimarães","brazil",8,"MF","Central midfield",28,182,"Right","Newcastle","gb-eng",70,7.6,1,2,540,[89,1.2,1.8,1.5,3.0,6.7],["Tempo control","Tackling"],["Discipline"]),
  mk("joao-gomes","João Gomes","brazil",5,"MF","Defensive midfield",25,178,"Right","Wolves","gb-eng",45,7.3,0,1,500,[87,0.8,1.0,1.1,3.4,6.9],["Ball-winning","Engine"],["Passing range"]),
  mk("paqueta","Lucas Paquetá","brazil",10,"MF","Attacking midfield",29,180,"Left","West Ham","gb-eng",40,7.4,2,3,520,[86,1.9,2.6,2.4,2.1,5.5],["Between lines","Late runs"],["End-product spells"]),
  mk("raphinha","Raphinha","brazil",11,"FW","Right winger",29,176,"Left","Barcelona","es",90,8.1,4,5,540,[85,3.1,3.4,3.5,1.6,5.0],["Set-pieces","Directness","Work-rate"],["Aerial duels"]),
  mk("vinicius","Vinícius Júnior","brazil",7,"FW","Left winger",26,176,"Right","Real Madrid","es",180,8.4,5,3,540,[83,3.6,2.9,5.1,1.1,4.7],["Elite dribbling","Acceleration","1v1"],["Decision-making"]),
  mk("rodrygo","Rodrygo","brazil",9,"FW","Forward",25,174,"Right","Real Madrid","es",90,7.7,3,2,500,[86,2.7,2.2,3.0,1.3,4.5],["Movement","Big-game moments"],["Physicality"]),
  mk("estevao","Estêvão","brazil",19,"FW","Winger",19,176,"Left","Chelsea","gb-eng",70,7.5,2,2,320,[84,2.5,2.1,3.6,1.0,4.2],["Fearless dribbling","Left foot"],["Experience"]),
  mk("andreas","Andreas Pereira","brazil",17,"MF","Central midfield",30,178,"Right","Palmeiras","br",18,7.0,0,1,220,[87,1.3,1.6,1.2,2.0,5.2],["Set-pieces","Ball circulation"],["Athleticism"]),
  mk("beraldo","Lucas Beraldo","brazil",14,"DF","Centre-back",22,185,"Left","PSG","fr",30,7.0,0,0,240,[88,0.3,0.5,0.6,2.3,6.4],["Left-footed build-up","Recovery"],["Aerial power"]),

  // ── Golden Boot & marquee stars (other nations) ─────────────────────────
  mk("kane","Harry Kane","england",9,"FW","Striker",32,188,"Right","Bayern Munich","de",90,8.0,4,3,540,[84,3.6,2.4,1.3,0.9,5.8],["Complete forward","Set-pieces","Link play"],["Foot speed"]),
  mk("bellingham","Jude Bellingham","england",10,"MF","Attacking midfield",23,186,"Right","Real Madrid","es",180,8.2,3,4,540,[88,2.4,2.9,2.8,2.6,6.6],["Box arrivals","Duels","Leadership"],["Rhythm dips"]),
  mk("saka","Bukayo Saka","england",7,"FW","Right winger",24,178,"Left","Arsenal","gb-eng",140,7.9,3,4,540,[86,2.8,3.0,3.7,1.5,5.1],["Cutting inside","End product"],["Left foot reliance"]),
  mk("foden","Phil Foden","england",11,"FW","Winger",26,171,"Left","Manchester City","gb-eng",120,7.7,2,3,500,[89,2.6,2.8,3.1,1.4,4.8],["Tight control","Both feet"],["Physical duels"]),
  mk("rice","Declan Rice","england",4,"MF","Defensive midfield",27,185,"Right","Arsenal","gb-eng",120,7.8,1,2,540,[90,1.3,1.7,1.2,3.2,7.1],["Ball-winning","Set-pieces","Late runs"],["Long-range shooting"]),
  mk("ronaldo","Cristiano Ronaldo","portugal",7,"FW","Striker",41,187,"Right","Al-Nassr","sa",12,7.6,4,1,470,[80,4.2,1.1,1.0,0.6,5.9],["Aerial threat","Finishing","Mentality"],["Mobility","Pressing"]),
  mk("bruno-fernandes","Bruno Fernandes","portugal",8,"MF","Attacking midfield",31,179,"Right","Manchester United","gb-eng",55,7.9,3,5,540,[87,2.9,3.6,1.6,2.3,5.4],["Chance creation","Set-pieces","Drive"],["Risky passes"]),
  mk("leao","Rafael Leão","portugal",10,"FW","Left winger",27,188,"Right","AC Milan","it",80,7.7,3,2,500,[83,2.9,2.2,4.1,1.0,5.3],["Power dribbling","Directness"],["Consistency"]),
  mk("vitinha","Vitinha","portugal",6,"MF","Central midfield",26,172,"Right","PSG","fr",90,8.0,2,3,540,[93,1.4,2.5,2.0,2.7,5.6],["Press resistance","Tempo","Long shots"],["Aerial duels"]),
  mk("haaland","Erling Haaland","norway",9,"FW","Striker",26,195,"Left","Manchester City","gb-eng",180,8.3,5,1,450,[76,4.9,1.0,0.9,0.5,5.7],["Elite finishing","Aerial power","Runs in behind"],["Build-up involvement"]),
  mk("odegaard","Martin Ødegaard","norway",20,"MF","Attacking midfield",27,178,"Left","Arsenal","gb-eng",90,7.8,2,4,450,[90,2.2,3.4,2.1,1.9,5.0],["Vision","Half-space play"],["Physical duels"]),
  mk("gakpo","Cody Gakpo","netherlands",8,"FW","Left winger",27,193,"Right","Liverpool","gb-eng",75,7.7,4,2,510,[84,3.0,2.3,2.6,1.2,5.8],["Finishing","Positional flexibility"],["Explosive pace"]),
  mk("depay","Memphis Depay","netherlands",10,"FW","Forward",32,176,"Right","Corinthians","br",12,7.4,3,3,470,[83,3.1,2.6,2.4,1.1,5.0],["Creativity","Set-pieces"],["Defensive work"]),
  mk("wirtz","Florian Wirtz","germany",10,"MF","Attacking midfield",23,177,"Right","Liverpool","gb-eng",140,8.1,3,5,540,[90,2.5,3.7,3.2,1.8,5.2],["Between lines","Combination play","Finishing"],["Physical duels"]),
  mk("musiala","Jamal Musiala","germany",14,"MF","Attacking midfield",23,183,"Right","Bayern Munich","de",140,8.2,4,3,540,[88,2.9,3.1,4.4,1.5,5.4],["Silky dribbling","Tight spaces"],["End product spells"]),
  mk("valverde","Federico Valverde","uruguay",15,"MF","Box-to-box",28,182,"Right","Real Madrid","es",120,8.0,3,2,540,[89,2.6,2.2,1.8,2.9,6.8],["Engine","Long shots","Versatility"],["Occasional overuse"]),
  mk("nunez","Darwin Núñez","uruguay",11,"FW","Striker",26,187,"Right","Al-Hilal","sa",50,7.3,3,2,500,[76,4.4,1.6,2.1,1.0,5.9],["Runs in behind","Power"],["Finishing radar"]),
  mk("james","James Rodríguez","colombia",10,"MF","Attacking midfield",34,180,"Left","Club León","mx",6,7.8,2,6,540,[88,2.0,4.1,1.4,1.3,4.6],["Left foot","Set-pieces","Vision"],["Pressing intensity"]),
  mk("luis-diaz","Luis Díaz","colombia",7,"FW","Left winger",29,180,"Right","Bayern Munich","de",80,7.9,4,3,540,[84,3.0,2.6,3.8,1.7,5.4],["Directness","Pressing","Finishing"],["Aerial duels"]),
  mk("hakimi","Achraf Hakimi","morocco",2,"DF","Right-back",27,181,"Right","PSG","fr",70,7.8,2,3,540,[85,1.8,2.4,3.0,2.4,6.0],["Elite pace","Overlaps","Finishing"],["Positional defending"]),
  mk("kubo","Takefusa Kubo","japan",11,"FW","Right winger",25,173,"Left","Real Sociedad","es",60,7.6,3,3,510,[86,2.6,2.9,3.6,1.3,4.7],["Left foot","Ball control"],["Physical duels"]),
  mk("jackson","Nicolas Jackson","senegal",9,"FW","Striker",24,186,"Right","Bayern Munich","de",55,7.4,3,1,470,[80,3.4,1.7,2.3,1.2,5.4],["Runs in behind","Pace","Work-rate"],["Finishing radar"]),
];

export const PLAYER_MAP: Record<string, Player> = Object.fromEntries(
  PLAYERS.map((p) => [p.id, p]),
);

export function player(id: string): Player | undefined {
  return PLAYER_MAP[id];
}

export function squad(teamId: string): Player[] {
  return PLAYERS.filter((p) => p.teamId === teamId);
}

export const TOP_SCORERS = [...PLAYERS]
  .sort((a, b) => b.goals - a.goals || b.assists - a.assists || b.rating - a.rating)
  .slice(0, 10);

export const TOP_RATED = [...PLAYERS]
  .filter((p) => p.minutes > 300)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 10);
