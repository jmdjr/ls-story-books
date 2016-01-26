using System;
using System.Collections;
using UnityEngine;
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
        public bool IsAnimating = false;
        public int RealAttack
        {
            get {
                return this.Info.Attack;
            }
        }

        public event ReportFightStatus OnWindup;
        public event ReportFightStatus OnActivateAbility;
        public event ReportFightStatus OnCompleteAbility;
        public event ReportFightStatus OnDeath;
        public event ReportFightStatus OnDamage;
        public event ReportFightStatus OnHeal;

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
                this.idleTime = 0;

                if(this.OnDeath != null)
                {
                    this.OnDeath(this);
                }
            }

            return this.Info.Health > 0;
        }

        public void AlterHealth(int amount)
        {
            // dealing with damage/healing
            if (amount < 0)
            {
                // inflicting damage
                amount = Math.Abs(amount);
                int trueDamage = amount > Info.Defence ? amount - Info.Defence : 0;

                if (OnDamage != null && trueDamage > 0)
                {
                    this.OnDamage(this);
                }

                this.Info.Health -= trueDamage;
            }
            else if(amount > 0)
            {
                // healing damage
                if (OnHeal != null)
                {
                    this.OnHeal(this);
                }
                this.Info.Health += amount;
            }
        }

        public void ActivateAbility(FighterTeamFightStatus OpposingTeam)
        {
            // choose ability to activate
            ActiveAbility = fighter.ChooseAbility();

            if (ActiveAbility != null)
            {
                FighterTeamFightStatus targetTeam = ActiveAbility.TargetTeam == AbilityTeamTarget.OTHER ? OpposingTeam : this.Team;
                FighterTargetsGroup targets = targetTeam.findTargets(ActiveAbility);

                if (this.OnActivateAbility != null)
                {
                    this.OnActivateAbility(this);
                }

                ActiveAbility.Effect(targets, this);

                if (this.OnCompleteAbility != null)
                {
                    this.OnCompleteAbility(this);
                }

                targets.ForEach(f => f.isAlive());

                this.SetIdle();
            }
        }
    }
}
