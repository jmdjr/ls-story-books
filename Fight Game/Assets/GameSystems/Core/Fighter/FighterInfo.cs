using UnityEngine;
using System;

using Random = UnityEngine.Random;
using System.Collections.Generic;

namespace Core
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
        public List<int> Abilities;

        public TeamPositionType Position;

        public void Randomize()
        {
            this.Experience = 0;
            this.Speed = Random.Range(1, 10);
            this.Attack = Random.Range(3, 10);
            this.Defence = Random.Range(1, 5);
            this.Health = Random.Range(10, 50);

            this.Position = TeamPositionType.FRONTLINE;
            this.Name = MarkovGenerator.GenerateName(5, 8);

            if (this.Abilities == null)
            {
                this.Abilities = new List<int>();
            }

            this.Abilities.Add(0);
        }

        public FighterInfo(bool randomize = false)
        {
            if (randomize)
            {
                this.Randomize();
            }
        }

        public FighterInfo Clone()
        {
            FighterInfo clone = new FighterInfo();
            clone.Abilities = this.Abilities;
            clone.Attack = this.Attack;
            clone.Defence = this.Defence;
            clone.Experience = this.Experience;
            clone.Health = this.Health;
            clone.Position = this.Position;
            clone.Speed = this.Speed;
            clone.Name = this.Name;

            return clone;
        }
    }
}
