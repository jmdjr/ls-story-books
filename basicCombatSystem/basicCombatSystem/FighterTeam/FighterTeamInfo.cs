using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace basicCombatSystem
{
    [Serializable]
    public class FighterTeamInfo
    {
        public string TeamName;
        public List<FighterInfo> Fighters;
    }
}
