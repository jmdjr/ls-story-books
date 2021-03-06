﻿using System;
using System.Collections.Generic;

namespace Core
{
    [Serializable]
    public class FighterTeamInfo
    {
        public string TeamName;
        public List<FighterInfo> Fighters;

        public void Randomize() {
            Fighters = new List<FighterInfo>();
            Fighters.Add(new FighterInfo(true));
            Fighters.Add(new FighterInfo(true));
            Fighters.Add(new FighterInfo(true));
        }

        public FighterTeamInfo(bool randomize = false)
        {
            if (randomize)
            {
                this.Randomize();
            }
        }
    }
}
