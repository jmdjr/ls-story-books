using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

using Random = UnityEngine.Random;

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
            if (Abilities.Count() > 0)
            {
                return Abilities[Random.Range(0, Abilities.Count() - 1)];
            }

            return null;
        }
    }
}
