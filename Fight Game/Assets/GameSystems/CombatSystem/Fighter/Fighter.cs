using System;
using System.Collections.Generic;
using System.Linq;

namespace CombatSystem
{
    public class Fighter
    {
        public FighterInfo Info;
        public List<Ability> Abilities;

        public Fighter(FighterInfo info)
        {
            this.Info = info;
            // Generate Abilities from Ability factory using figher info

            Abilities = new List<Ability>();
        }

        public Ability ChooseAbility() 
        {
            Random ran = new Random();
            if (Abilities.Count() > 0)
            {
                return Abilities[ran.Next(0, Abilities.Count() - 1)];
            }

            return null;
        }
    }
}
