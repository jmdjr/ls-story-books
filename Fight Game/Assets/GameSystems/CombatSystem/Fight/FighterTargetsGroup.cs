using System.Collections.Generic;

namespace Core.CombatSystem
{
    public class FighterTargetsGroup: List<FighterFightStatus>
    {
        public FighterTargetsGroup()
        {

        }

        public void AlterAllHealth(int amount)
        {
            ForEach(fighter => { fighter.AlterHealth(amount); });
        }

        public void AlterRandomHealth(int amount)
        {
            var fighter = this.RandomOne();
            if (fighter != null)
            {
                fighter.AlterHealth(amount);
            }
        }
    }
}
