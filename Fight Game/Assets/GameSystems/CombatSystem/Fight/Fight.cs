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

        public delegate void StatusUpdate(FighterTeamFightStatus Alpha, FighterTeamFightStatus Beta);
        public delegate void WinnerUpdate(FighterTeamFightStatus Winner);
        public event StatusUpdate PostStepUpdate;
        public event WinnerUpdate FoundWinner;

        public Fight(FighterTeam alpha, FighterTeam beta)
        {
            Alpha = new FighterTeamFightStatus(alpha);
            Beta = new FighterTeamFightStatus(beta);
            
            FightOrder = new List<FighterFightStatus>();

            FightOrder.AddRange(Alpha.SetupFightStatus());
            FightOrder.AddRange(Beta.SetupFightStatus());
        }
        private FighterFightStatus getNextFighter()
        {
            return ActiveFighters().Where((f) => f.AttackReady()).ToList().RandomOne();
        }
        private List<FighterFightStatus> ActiveFighters()
        {
            return FightOrder.Where((f) => f.isAlive()).ToList();
        }

        public void StepFight()
        {
            // runs the basic steps in combat, through one cycle.
            // get next available fighter, if none, step everyone's counters. 
            FighterFightStatus activeFighter = getNextFighter();

            if (activeFighter != null)
            {
                FighterTeamFightStatus OtherTeam = activeFighter.Team == Alpha ? Beta : Alpha;
                activeFighter.ActivateAbility(OtherTeam);
            }
            else
            {
                ActiveFighters().ForEach((f) => f.StepIdle());
            }

            if (PostStepUpdate != null)
            {
                PostStepUpdate(Alpha, Beta);
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

        bool anyoneAnimating()
        {
            return FightOrder.TrueForAll(fighter => { return !fighter.IsAnimating; });
        }

        public IEnumerator Run()
        {
            FighterTeamFightStatus winningTeam = GetWinner();

            while (winningTeam == null)
            {
                if (anyoneAnimating())
                {
                    StepFight();
                    winningTeam = GetWinner();
                }

                yield return new WaitForSeconds(0.10f);
            }

            if (FoundWinner != null)
            {
                FoundWinner(Alpha);
            }
        }
    }
}
