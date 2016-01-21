using System;
using System.Collections.Generic;

namespace CombatSystem
{
    public class AbilityFactory
    {
        private static AbilityFactory factory;
        private AbilityFactory() { }

        private List<Ability> abilities = null;
        public List<Ability> Abilities
        {
            get
            {
                if(abilities == null)
                {
                    abilities = new List<Ability>();
                }

                return abilities;
            }
        }

        public static void Start()
        {
            factory = new AbilityFactory();
            factory.initializeAbilities();
        }

        private void initializeAbilities() 
        {
            // default melee ability
            
            this.Abilities.Add(new Ability(new Effect((targets) => {
                
            })));
        }
    }
}
