using UnityEngine;
using System;

using Random = UnityEngine.Random;
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
            this.Experience = 0;
            this.Speed = Random.Range(1, 5);
            this.Attack = Random.Range(1, 10);
            this.Defence = Random.Range(1, 10);
            this.Health = Random.Range(50, 100);

            this.Position = TeamPositionType.NONE;

            this.Name = "Fighter_" + Math.Floor(Random.value * 1000);
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
