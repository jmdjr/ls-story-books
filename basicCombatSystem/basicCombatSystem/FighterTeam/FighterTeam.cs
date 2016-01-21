using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
