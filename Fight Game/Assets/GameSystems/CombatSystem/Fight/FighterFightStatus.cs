using System;
namespace Core.CombatSystem
{
    public class FighterFightStatus
    {
        public delegate void ReportFightStatus(FighterFightStatus fighterStatus);

        // this info should be able to be altered 
        public Fighter fighter;
        public FighterInfo Info;
        public FighterTeamFightStatus Team;
        public Ability ActiveAbility;
        private int idleTime;
        public bool IsDead = false;

        public event ReportFightStatus OnWindup;
        public event ReportFightStatus OnActivateAbility;
        public event ReportFightStatus OnDeath;

        public int IdleTime()
        {
            return this.idleTime;
        }
        public FighterFightStatus(Fighter fighter, FighterTeamFightStatus team)
        {
            this.fighter = fighter;
            this.Team = team;
            this.Info = fighter.Info.Clone();

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
            this.idleTime = 100 / this.Info.Speed;
        }

        public bool isAlive()
        {
            if(this.Info.Health <= 0 && !this.IsDead)
            {
                this.IsDead = true;

                if(this.OnDeath != null)
                {
                    this.OnDeath(this);
                }
            }

            return this.Info.Health > 0;
        }

        public void ActivateAbility(FighterTeamFightStatus OpposingTeam)
        {
            // choose ability to activate
            Ability activeAbility = fighter.ChooseAbility();
            ActiveAbility = activeAbility;
            if (activeAbility != null)
            {
                FighterTeamFightStatus targetTeam = activeAbility.TargetTeam == AbilityTeamTarget.OTHER ? OpposingTeam : this.Team;
                FighterTargetsGroup targets = targetTeam.findTargets(activeAbility);

                activeAbility.Effect(targets, this);
                targets.ForEach(f => f.isAlive());
                this.SetIdle();
            }
        }
    }
}
