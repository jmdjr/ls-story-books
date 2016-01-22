using System;
namespace CombatSystem
{
    public class FighterFightStatus
    {
        // this info should be able to be altered 
        public FighterInfo info;
        public Fighter fighter;
        public FighterTeamFightStatus Team;
        public int idleTime;

        public FighterFightStatus(Fighter fighter, FighterTeamFightStatus team)
        {
            this.fighter = fighter;
            this.Team = team;
            this.info = fighter.Info.Clone();

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
            this.idleTime = 100 / this.info.Speed;
        }

        public bool isAlive()
        {
            return this.info.Health > 0;
        }
    }
}
