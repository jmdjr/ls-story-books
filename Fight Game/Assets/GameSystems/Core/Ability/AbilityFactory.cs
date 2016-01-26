using System;
using System.Collections.Generic;

using Random = UnityEngine.Random;

namespace Core
{
    public class AbilityFactory
    {
        private static AbilityFactory factory = null;
        public static AbilityFactory Factory {
            get
            {
                if(factory == null)
                {
                    factory = new AbilityFactory();
                    factory.initializeAbilities();
                }

                return factory;
            }
        }

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

        public Ability RandomAbility()
        {
            return this.Abilities[Random.Range(0, this.Abilities.Count - 1)];
        }

        private void initializeAbilities() 
        {
            // default melee ability
            this.Abilities.Add(new Ability((targets, fighterStatus) =>
            {
                // implement some cool stuff for this ability to do...
                targets.AlterRandomHealth(-1 * Random.Range(1, fighterStatus.RealAttack));
            })
            {
                TargetTeam = AbilityTeamTarget.OTHER
            });
        }
    }
}
