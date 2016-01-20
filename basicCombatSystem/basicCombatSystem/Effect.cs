using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace basicCombatSystem
{
    public class Effect
    {
        public delegate void EffectResult();
        public EffectResult result;

        public Effect(EffectResult resultDelegate)
        {
            this.result = resultDelegate;
        }
    }
}
