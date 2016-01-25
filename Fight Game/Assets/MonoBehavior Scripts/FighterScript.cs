using UnityEngine;
using Core;
using Core.CombatSystem;
public class FighterScript : MonoBehaviour
{

    public FighterFightStatus reference;
    public FighterInfo FighterInfo;
    public FighterInfo BaseStats;
    // Use this for initialization

    void Awake()
    {

    }

	void Start ()
    {
	    if(reference != null)
        {
            FighterInfo = reference.Info;
            BaseStats = reference.fighter.Info;
            this.name = FighterInfo.Name;

            this.reference.OnDeath += (fighter) => {
                Debug.Log(fighter.Info.Name + " has Died!!!");
            };

        }
	}
	
	// Update is called once per frame
	void Update ()
    {
	    
	}

    void onGUI()
    {

    }

}
