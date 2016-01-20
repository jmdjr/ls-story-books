using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace basicCombatSystem
{
    public class Fight
    {
        private FighterTeam Alpha;
        private FighterTeam Beta;

        private List<Fighter> FightOrder;

        public Fight(FighterTeam alpha, FighterTeam beta)
        {
            this.Alpha = alpha;
            this.Beta = beta;

            FightOrder.AddRange(this.Alpha.Fighters);
            FightOrder.AddRange(this.Beta.Fighters);

            FightOrder.Sort((a, b) => { return a.Info.Speed.CompareTo(b.Info.Speed); });
        }

        public Enumerable
    }
}
