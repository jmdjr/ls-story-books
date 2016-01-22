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
        InitializeFight();
        GenerateTeamsGameObjects();

        Debug.Log("Fight Beginning...");
        this.Fight.FighterBegin += updateStatus;
	}
    void InitializeFight()
    {
        FighterTeamInfo alphaInfo = new FighterTeamInfo(true);
        FighterTeam AlphaTeam = new FighterTeam(alphaInfo);
        alphaInfo.TeamName = "Alpha Team";

        FighterTeamInfo betaInfo = new FighterTeamInfo(true);
        FighterTeam BetaTeam = new FighterTeam(betaInfo);
        betaInfo.TeamName = "Beta Team";

        this.Fight = new Fight(AlphaTeam, BetaTeam);
    }
    void GenerateTeamsGameObjects() 
    {
        GameObject alphaTeamObject = Instantiate<GameObject>(TeamPrefab);
        GameObject betaTeamObject = Instantiate<GameObject>(TeamPrefab);

        alphaTeamObject.GetComponent<TeamFightScript>().reference = this.Fight.Alpha;
        betaTeamObject.GetComponent<TeamFightScript>().reference = this.Fight.Beta;

        alphaTeamObject.transform.position = new Vector3(-5, 1, 0);
        betaTeamObject.transform.position = new Vector3(5, 1, 0);

        alphaTeamObject.name = this.Fight.Alpha.TeamInfo.TeamName;
        betaTeamObject.name = this.Fight.Beta.TeamInfo.TeamName;
    }
    void updateStatus(FighterFightStatus fighterStatus)
    {
        //Debug.Log("Fighter: " + fighterStatus.idleTime);
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
