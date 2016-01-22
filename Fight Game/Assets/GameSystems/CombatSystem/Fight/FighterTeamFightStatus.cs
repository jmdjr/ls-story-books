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
            this.TeamStatus = this.TeamOrganization.Fighters.ConvertAll<FighterFightStatus>((fighter) => new FighterFightStatus(fighter));
            return this.TeamStatus;
        }

        public FighterTargetsGroup findTargets(Ability incoming)
        {
            FighterTargetsGroup targets = new FighterTargetsGroup();

            TeamStatus.ForEach((f) => { 
            });

            return targets;
        }
    }
}
