using System.Collections.Generic;

namespace CombatSystem
{
    public class FighterTeam
    {
        public List<Fighter> Fighters;
        private FighterTeamInfo Info;

        public FighterTeam(FighterTeamInfo info)
        {
            this.Info = info;
            Fighters = new List<Fighter>();
            GenerateTeam();
        }

        private void GenerateTeam()
        {
            foreach(FighterInfo fighter in this.Info.Fighters)
            {
                Fighters.Add(new Fighter(fighter));
            }
        }
    }
}
