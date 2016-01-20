using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace basicCombatSystem
{
    public class Fighter
    {
        public FighterInfo Info;
        public List<Ability> Abilities;

        public Fighter(FighterInfo info)
        {
            this.Info = info;
            // Generate Abilities from Ability factory using figher info
            
        }
    }
}
