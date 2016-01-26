using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Core.CombatSystem
{
    public class Fight 
    {
        public FighterTeamFightStatus Alpha;
        public FighterTeamFightStatus Beta;

        public List<FighterFightStatus> FightOrder;

        public delegate void TeamStatusUpdate(FighterTeamFightStatus Alpha, FighterTeamFightStatus Beta);
        public event TeamStatusUpdate TeamUpdate;

        public Fight(FighterTeam alpha, FighterTeam beta)
        {
            this.Alpha = new FighterTeamFightStatus(alpha);
            this.Beta = new FighterTeamFightStatus(beta);
            
            FightOrder = new List<FighterFightStatus>();

            FightOrder.AddRange(this.Alpha.SetupFightStatus());
            FightOrder.AddRange(this.Beta.SetupFightStatus());
            FightOrder.Sort((fighter1, fighter2) => { return fighter1.Info.Speed.CompareTo(fighter2.Info.Speed); });


            // Each fighter is now initialized with Fight info, which tracks their idle timers and is used to determine if they are ready or not.
        }
        private FighterFightStatus getNextFighter()
        {
            return ActiveFighters().Where((f) => f.AttackReady()).ToList().RandomOne();
        }
        private List<FighterFightStatus> ActiveFighters()
        {
            return FightOrder.Where((f) => f.isAlive()).ToList();
        }
        //May convert this into an Enumerator for use in Coroutines or something, but this is the fight cycle.
        public void StepFight()
        {
            // runs the basic steps in combat, through one cycle.
            // get next available fighter, if none, step everyone's counters. 
            FighterFightStatus activeFighter = this.getNextFighter();

            if (activeFighter != null)
            {
                FighterTeamFightStatus OtherTeam = activeFighter.Team == this.Alpha ? this.Beta : this.Alpha;
                activeFighter.ActivateAbility(OtherTeam);
            }
            else
            {
                ActiveFighters().ForEach((f) => f.StepIdle());
            }

            if (this.TeamUpdate != null)
            {
                this.TeamUpdate(Alpha, Beta);
            }

        }

        public bool HasWinner()
        {
            return GetWinner() != null;
        }

        public FighterTeamFightStatus GetWinner()
        {
            if(!Alpha.anyoneLeftAlive())
            {
                return Beta;
            }
            else if(!Beta.anyoneLeftAlive())
            {
                return Alpha;
            }

            return null;
        }
    }
}
