using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.ManagementSystem
{
    public class Manager
    {
        public ManagerInfo Info;
        public List<FighterTeam> Teams;
        public List<Fighter> BenchedFighters;
        public FighterTeam ActiveTeam { get; private set; }

        public Manager(ManagerInfo info)
        {
            this.Info = info;

            if (Info.TeamsInfo != null)
            {
                Teams = Info.TeamsInfo.ConvertAll<FighterTeam>((teamInfo) => {
                    return new FighterTeam(teamInfo);
                });
            }

            if (Info.BenchedFightersInfo != null)
            {
                BenchedFighters = Info.BenchedFightersInfo.ConvertAll((fighterInfo) => {
                    return new Fighter(fighterInfo);
                });
            }
        }

        public FighterTeam SelectTeam(FighterTeam selectTeam = null)
        {
            if(selectTeam == null)
            {
                this.ActiveTeam = Teams.FirstOrDefault();
            }
            else if(Teams.Contains(selectTeam))
            {
                this.ActiveTeam = selectTeam;
            }

            return this.ActiveTeam;
        }
    }
}
