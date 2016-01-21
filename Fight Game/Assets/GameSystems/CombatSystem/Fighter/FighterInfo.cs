using System;

namespace CombatSystem
{
    [Serializable]
    public class FighterInfo
    {
        public string Name;
        public int Speed;
        public int Attack;
        public int Defence;
        public int Health;
        public int Experience;
        public TeamPositionType Position;

        public void Randomize()
        {
            Random ran = new Random();
            this.Experience = 0;
            this.Speed = ran.Next(1, 5);
            this.Attack = ran.Next(1, 10);
            this.Defence = ran.Next(1, 10);
            this.Health = ran.Next(50, 100);

            this.Position = TeamPositionType.NONE;
        }

        public FighterInfo()
        {
        }

        public FighterInfo(bool randomize = false)
        {
            if (randomize)
            {
                this.Randomize();
            }
        }
    }
}
