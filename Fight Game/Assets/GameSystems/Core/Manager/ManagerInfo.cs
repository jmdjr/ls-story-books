using UnityEngine;
using System.Collections;
using System;
using System.Collections.Generic;

namespace Core
{
    [Serializable]
    public class ManagerInfo
    {
        public string Name;
        public int Experience;
        public int Reputation;

        public List<FighterTeamInfo> TeamsInfo;
        public List<FighterInfo> BenchedFightersInfo;

        public ManagerInfo(bool randomize = false)
        {
            if(randomize)
            {
                Randomize();
            }
        }

        private void Randomize()
        {
            this.TeamsInfo = new List<FighterTeamInfo>();
            this.TeamsInfo.Add(new FighterTeamInfo(true));
        }
    }
}