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
        public AbilityType Type { get; set; }
        public Effect Effect { get; set; }
        public int AbilityId { get; set; }
        public FighterInfo FighterInfo { get; set; }

        public Ability(Effect effect, ) 
        {
            this.Effect = effect;
        }

        public Ability Clone(FighterInfo info)
        {
            return new Ability(this.Effect) { FighterInfo = info };
        }
    }
}
