using System;
using System.Collections.Generic;

namespace CombatSystem
{
    [Serializable]
    public class FighterTeamInfo
    {
        public string TeamName;
        public List<FighterInfo> Fighters;

        public void Randomize() {
            Random ran = new Random();

            Fighters = new List<FighterInfo>();
            Fighters.Add(new FighterInfo(true));
            Fighters.Add(new FighterInfo(true));
            Fighters.Add(new FighterInfo(true));
        }

        public FighterTeamInfo(bool randomize = false)
        {
            if (randomize)
            {
                this.Randomize();
            }
        }
    }
}
