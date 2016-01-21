using System.Collections.Generic;

namespace basicCombatSystem
{
    public class FighterTeam
    {
        public List<Fighter> Fighters;
        private FighterTeamInfo Info;

        public FighterTeam(FighterTeamInfo info)
        {
            this.Info = info;
        }
    }
}
