namespace CombatSystem
{
    public class Ability
    {
        public delegate void EffectResult(FighterTargetsGroup targets, FighterFightStatus fighterStatus);

        public string Name { get; set; }
        public int Id { get; set; }
        public AbilityType Type { get; set; }
        public AbilityTeamTarget TargetTeam { get; set; }
        public EffectResult Effect { get; set; }
        public int AbilityId { get; set; }

        public FighterInfo FighterInfo { get; set; }
        public FighterFightStatus FighterFightInfo { get; set; }
        public Ability(EffectResult effect) 
        {
            this.Effect = effect;
        }
     
        public Ability Clone(FighterInfo info)
        {
            return new Ability(this.Effect) { FighterInfo = info };
        }
    }
}
