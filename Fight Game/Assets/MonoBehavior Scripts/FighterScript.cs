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
    private bool isAnimating;


    private Color Red = new Color(1, 0, 0);
    private Color Green = new Color(0, 1, 0);
    private Color Normal = new Color(1, 1, 1);

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
            this.reference.OnDamage += OnDamage;

            Vector3 temp = this.transform.localPosition;
            stepBack = new Vector3(temp.x, temp.y, temp.z);
            stepForward = new Vector3(stepBack.x + 1, stepBack.y, stepBack.z);
            stepDead = new Vector3(temp.x - 2, temp.y, temp.z);
            isAnimating = false;
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
        if (fighter.isAlive() && !fighter.IsAnimating)
        {
            StartCoroutine(AnimateAttack());
            fighter.IsAnimating = true;
        }
    }

    void OnDamage(FighterFightStatus fighter)
    {
        if (fighter.isAlive() && !fighter.IsAnimating)
        {
            StartCoroutine(DamageColor());
        }
    }

    IEnumerator AnimateAttack()
    {
        this.transform.localPosition = stepForward;
        yield return new WaitForSeconds(0.25f);
        this.transform.localPosition = stepBack;
        yield return new WaitForSeconds(0.25f);
        reference.IsAnimating = false;
    }
    IEnumerator DamageColor()
    {
        var obj = this.transform.GetChild(0).GetComponent<SpriteRenderer>();
        obj.color = Red;
        yield return new WaitForSeconds(0.1f);
        obj.color = Normal;
        yield return new WaitForSeconds(0.1f);
        obj.color = Red;
        yield return new WaitForSeconds(0.1f);
        obj.color = Normal;
    }
    void KillColor()
    {
        var obj = this.transform.GetChild(0).GetComponent<SpriteRenderer>();
        obj.color = Red;
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
