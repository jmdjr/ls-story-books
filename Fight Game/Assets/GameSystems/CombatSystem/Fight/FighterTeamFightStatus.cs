using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CombatSystem
{
    public class FighterTeamFightStatus
    {
        public FighterTeam TeamOrganization;
        public FighterTeamInfo TeamInfo;
        public List<FighterFightStatus> TeamStatus;

        public FighterTeamFightStatus(FighterTeam team)
        {
            this.TeamOrganization = team;
            this.TeamInfo = team.Info;
        }

        public List<FighterFightStatus> SetupFightStatus()
        {
            this.TeamStatus = this.TeamOrganization.Fighters.ConvertAll<FighterFightStatus>((fighter) => new FighterFightStatus(fighter, this));
            return this.TeamStatus;
        }

        public FighterTargetsGroup findTargets(Ability incoming)
        {
            FighterTargetsGroup targets = new FighterTargetsGroup();

            TeamStatus.ForEach((f) => {
                if(f.isAlive())
                {
                    targets.Add(f);
                }
            });

            return targets;
        }

        public bool anyoneLeftAlive()
        {
            return TeamStatus.Any((fighter) => fighter.isAlive());
        }

        public string DebugInfo()
        {
            string teamStatus = this.TeamInfo.TeamName + "\n";
            this.TeamStatus.ForEach((fighterStatus) => {
                teamStatus += String.Format("{0, -13} : Idle: {1, 5} Health: {2, 5} Attack: {3, 5}\n", fighterStatus.info.Name, fighterStatus.idleTime, fighterStatus.info.Health, fighterStatus.info.Attack);
            });

            return teamStatus;
        }
    }
}
