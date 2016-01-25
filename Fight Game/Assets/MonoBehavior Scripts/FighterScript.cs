using UnityEngine;
using Core;
using Core.CombatSystem;
using System.Collections;
public class FighterScript : MonoBehaviour
{

    public FighterFightStatus reference;
    public FighterInfo FighterInfo;
    public FighterInfo BaseStats;
    // Use this for initialization
    private Vector3 stepForward;
    private Vector3 stepBack;
    private Vector3 stepDead;
    private bool doStepForward;

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

            this.reference.OnActivateAbility += OnActivateAbility;
            this.reference.OnCompleteAbility += OnCompleteAbility;
            this.reference.OnDeath += OnDeath;

            Vector3 temp = this.transform.localPosition;
            stepBack = new Vector3(temp.x, temp.y, temp.z);
            stepForward = new Vector3(stepBack.x + 1, stepBack.y, stepBack.z);
            stepDead = new Vector3(temp.x - 2, temp.y, temp.z);
        }
	}

    void OnDeath(FighterFightStatus fighter) {
        Debug.Log(fighter.Info.Name + " has Died!!!");
        StopAllCoroutines();
        this.transform.localPosition = stepDead;
        KillColor();
    }

    void OnActivateAbility(FighterFightStatus fighter)
    {
        //this.transform.localPosition = stepForward;
        if (fighter.isAlive())
        {
            StartCoroutine(AnimateAttack());
        }
    }

    IEnumerator AnimateAttack()
    {
        this.transform.localPosition = stepForward;
        yield return new WaitForSeconds(1f);
        this.transform.localPosition = stepBack;
    }

    void KillColor()
    {
        var obj = this.transform.GetChild(0).GetComponent<SpriteRenderer>();
        obj.color = new Color(1, 0, 0);
    }

    void OnCompleteAbility(FighterFightStatus fighter)
    {
    }


	// Update is called once per frame
	void Update ()
    {
	}

    void onGUI()
    {

    }

}
