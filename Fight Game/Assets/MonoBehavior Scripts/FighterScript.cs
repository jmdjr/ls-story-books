using UnityEngine;
using Core;
using Core.CombatSystem;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
public class FighterScript : MonoBehaviour
{

    public FighterFightStatus reference;
    public FighterInfo FighterInfo;
    public FighterInfo BaseStats;
    // Use this for initialization
    private Vector3 stepForward;
    private Vector3 stepBack;
    private Vector3 stepBlock;
    private Vector3 stepDead;
    private bool isAnimating;

    private Animator animator;

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
            this.reference.OnDefend += OnDefend;

            Vector3 temp = this.transform.localPosition;
            stepBack = new Vector3(temp.x, temp.y, temp.z);
            stepForward = new Vector3(stepBack.x + 1, stepBack.y, stepBack.z);
            stepDead = new Vector3(temp.x - 2, temp.y, temp.z);
            stepBlock = new Vector3(temp.x -1, temp.y, temp.z);
            isAnimating = false;

            this.animator = GetComponent<Animator>();
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

    void OnDefend(FighterFightStatus fighter)
    {
        StartCoroutine(DefendStance());
    }

    //Works by getting the current clipInfo, and returning the length if it was found. 0 otherwise.
    float getAnimationLength()
    {
        float length = 0;
        if (animator != null)
        {
            var state = animator.GetCurrentAnimatorClipInfo(0);

            if (state.Length > 0)
            {
                // we got an issue...

                List<AnimatorClipInfo> clips = new List<AnimatorClipInfo>(state);
                AnimationClip clip = clips.ConvertAll<AnimationClip>(obj => obj.clip).FirstOrDefault();

                if (clip != null)
                {
                    length = clip.length;
                }
            }
        }

        return length;
    }


    IEnumerator AnimateAttack()
    {
        this.transform.localPosition = stepForward;
        this.animator.Play("TestAttack");

        //must yield first to allow animator to transition play to clip.
        yield return 0;
        yield return new WaitForSeconds(getAnimationLength());

        //this.animator.SetBool("IsAttacking", false);
        this.animator.Play("Test");
        this.transform.localPosition = stepBack;
        reference.IsAnimating = false;
    }
    IEnumerator DamageColor()
    {
        var obj = this.GetComponent<SpriteRenderer>();
        obj.color = Red;
        yield return new WaitForSeconds(0.1f);
        obj.color = Normal;
        yield return new WaitForSeconds(0.1f);
        obj.color = Red;
        yield return new WaitForSeconds(0.1f);
        obj.color = Normal;
    }
    IEnumerator DefendStance()
    {
        this.transform.localPosition = stepBlock;
        yield return new WaitForSeconds(0.2f);
        this.transform.localPosition = stepBack;
    }

    void KillColor()
    {
        var obj = this.GetComponent<SpriteRenderer>();
        obj.color = Red;
        this.animator.Play("TestDead");
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
