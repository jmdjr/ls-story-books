using UnityEngine;
using System.Collections;
using CombatSystem;
public class GameControlScript: MonoBehaviour
{

    public static GameControlScript control;
    public Fight Fight;
    public GameObject TeamPrefab;

    void Awake() {
        if (control == null)
        {
            control = this;
            DontDestroyOnLoad(gameObject);
        }
        else if (control != this)
        {
            Destroy(gameObject);
        }
    }

	// Use this for initialization
    void Start()
    {
        FighterTeamInfo alphaInfo = new FighterTeamInfo(true);
        FighterTeam AlphaTeam = new FighterTeam(alphaInfo);
        GameObject alphaTeamObject = Instantiate<GameObject>(TeamPrefab);
        alphaTeamObject.GetComponent<TeamFightScript>().reference = AlphaTeam;

        FighterTeamInfo betaInfo = new FighterTeamInfo(true);
        FighterTeam BetaTeam = new FighterTeam(betaInfo);
        GameObject betaTeamObject = Instantiate<GameObject>(TeamPrefab);
        betaTeamObject.GetComponent<TeamFightScript>().reference = BetaTeam;

        this.Fight = new Fight(AlphaTeam, BetaTeam);

        Debug.Log("Fight Beginning...");
        this.Fight.FighterBegin += updateStatus;
	}
    
    void updateStatus(FighterFightStatus fighterStatus)
    {
        Debug.Log("Fighter going...");
    }

	// Update is called once per frame
	void Update () {
        RunFight();
	}
    void RunFight()
    {
        if (this.Fight != null)
        {
            this.Fight.StepFight();
        }
    }
    void OnGUI() { 
        
    }
}
