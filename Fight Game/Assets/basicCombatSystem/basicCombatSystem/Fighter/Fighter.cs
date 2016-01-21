using System;
using System.Collections.Generic;
using System.Linq;

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

        public Ability ChooseAbility() 
        {
            Random ran = new Random();
            return Abilities[ran.Next(0, Abilities.Count() - 1)];
        }
    }
}
