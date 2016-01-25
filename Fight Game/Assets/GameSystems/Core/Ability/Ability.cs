using Core.CombatSystem;

namespace Core
{
    public class Ability
    {
        public delegate void EffectResult(FighterTargetsGroup targets, FighterFightStatus fighterStatus);

        public string Name { get; set; }
        public int AbilityId { get; set; }
        public AbilityType Type { get; set; }
        public AbilityTeamTarget TargetTeam { get; set; }
        public EffectResult Effect { get; set; }
        public Ability(EffectResult effect) 
        {
            this.Effect = effect;
        }
     
        public Ability Clone(FighterInfo info)
        {
            return new Ability(this.Effect);
        }
    }
}
