﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CombatSystem
{
    public class Fight 
    {
        public FighterTeamFightStatus Alpha;
        public FighterTeamFightStatus Beta;

        private List<FighterFightStatus> FightOrder;

        public delegate void FighterBeginAttack(FighterFightStatus fighterStatus);
        public event FighterBeginAttack FighterBegin;

        public Fight(FighterTeam alpha, FighterTeam beta)
        {
            this.Alpha = new FighterTeamFightStatus(alpha);
            this.Beta = new FighterTeamFightStatus(beta);
            
            FightOrder = new List<FighterFightStatus>();

            FightOrder.AddRange(this.Alpha.SetupFightStatus());
            FightOrder.AddRange(this.Beta.SetupFightStatus());

            // Each fighter is now initialized with Fight info, which tracks their idle timers and is used to determine if they are ready or not.
        }
        private FighterFightStatus getNextFighter()
        {
            return FightOrder.FirstOrDefault((f) => f.AttackReady());
        }

        //May convert this into an Enumerator for use in Coroutines or something, but this is the fight cycle.
        public void StepFight()
        {
            // runs the basic steps in combat, through one cycle.
            // get next available fighter, if none, step everyone's counters. 
            FightOrder.ForEach((f) => f.StepIdle());
            FighterFightStatus next = this.getNextFighter();

            if (next != null)
            {
                if (this.FighterBegin != null)
                {
                    this.FighterBegin(next);
                }

                // choose ability to activate
                Ability activeAbility = next.fighter.ChooseAbility();

                next.SetIdle();
            }

        }
    }
}