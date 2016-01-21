using System;
using System.Collections.Generic;

namespace basicCombatSystem
{
    [Serializable]
    public class FighterTeamInfo
    {
        public string TeamName;
        public List<FighterInfo> Fighters;
    }
}
