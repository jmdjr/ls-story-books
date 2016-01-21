namespace CombatSystem
{
    public class FighterFightStatus
    {
        // this info should be able to be altered 
        public FighterInfo info;
        public Fighter fighter;
        public int idleTime;

        public FighterFightStatus(Fighter fighter)
        {
            this.fighter = fighter;
            this.info = fighter.Info;

            // Calculate idleTime from speed.
            this.SetIdle();
        }

        // returns true if this fighter is ready to attack
        public bool AttackReady()
        {
            return idleTime <= 0;
        }

        public void StepIdle() 
        {
            this.idleTime -= 1;
        }

        public void SetIdle()
        {
            // calculate and set idleTime from current Speed.
        }
    }
}
