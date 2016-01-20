using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace basicCombatSystem
{
    public class Ability
    {
        public string Name { get; set; }
        public Effect Effect { get; set; }
        public int AbilityId { get; set; }

        private Ability() { }

        public Ability Clone(FighterInfo fighterInfo)
        {
            Ability clone = new Ability();
            Effect effect = new Effect();


            return clone;
        }
    }
}
