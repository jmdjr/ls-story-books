using UnityEngine;
using CombatSystem;
public class FighterScript : MonoBehaviour
{

    public FighterFightStatus reference;
    public FighterInfo FighterInfo;
    // Use this for initialization

    void Awake()
    {

    }

	void Start ()
    {
	    if(reference != null)
        {
            FighterInfo = reference.info;
            this.name = FighterInfo.Name;
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
