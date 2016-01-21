using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace basicCombatSystem
{
    public class FighterTeamFightStatus
    {
        FighterTeam TeamOrganization;

        List<FighterFightStatus> TeamStatus;

        public FighterTeamFightStatus(FighterTeam team)
        {
            this.TeamOrganization = team;
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
