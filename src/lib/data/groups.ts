import type { Team } from "../types";
import { TEAMS, GROUPS } from "./teams";
import { QUALIFIED } from "./matches";

// The group stage is complete. We don't fabricate exact points/records — instead
// we present each group's real outcome: which sides advanced to the Round of 32.
// Within a group we surface advancing teams first, ordered by FIFA ranking.

export const GROUP_TEAMS: Record<string, Team[]> = Object.fromEntries(
  GROUPS.map((g) => {
    const teams = TEAMS.filter((t) => t.group === g).sort((a, b) => {
      const qa = QUALIFIED.has(a.id) ? 0 : 1;
      const qb = QUALIFIED.has(b.id) ? 0 : 1;
      if (qa !== qb) return qa - qb;
      return a.fifaRank - b.fifaRank;
    });
    return [g, teams];
  }),
);

export function advanced(teamId: string): boolean {
  return QUALIFIED.has(teamId);
}
