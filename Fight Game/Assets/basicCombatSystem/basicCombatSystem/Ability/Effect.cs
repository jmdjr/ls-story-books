namespace basicCombatSystem
{
    public class Effect
    {
        public delegate void EffectResult(FighterTargetsGroup targets);
        public EffectResult result;

        public Effect(EffectResult resultDelegate)
        {
            this.result = resultDelegate;
        }
    }
}
