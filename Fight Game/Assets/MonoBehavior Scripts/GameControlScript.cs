using UnityEngine;
using System.Collections;
using CombatSystem;


public class GameControlScript: MonoBehaviour
{
    public static GameControlScript control;
    public Fight Fight;
    public GameObject TeamPrefab;
    private FighterTeamInfo myInfo;

    private bool runFight = true;

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
        Debug.Log(this.Fight.Alpha.DebugInfo() + "\n" + this.Fight.Beta.DebugInfo());
        this.Fight.FighterBegin += updateStatus;
	}

    void InitializeFight()
    {
        FighterTeamInfo alphaInfo = BasicMechanics.Load();
        Debug.Log("Loading save file: " + BasicMechanics.SaveFile);
        if (alphaInfo == null)
        {
            alphaInfo = new FighterTeamInfo(true);
            BasicMechanics.Save(alphaInfo);
            Debug.Log("Creating save file: " + BasicMechanics.SaveFile);
        }

        myInfo = alphaInfo;
        FighterTeam AlphaTeam = new FighterTeam(alphaInfo);
        alphaInfo.TeamName = "Alpha Team";

        FighterTeamInfo betaInfo = new FighterTeamInfo(true);
        FighterTeam BetaTeam = new FighterTeam(betaInfo);
        betaInfo.TeamName = "Beta Team";

        Fight = new Fight(AlphaTeam, BetaTeam);
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
    }

	// Update is called once per frame
	void Update () {
        RunFight();
	}
    void RunFight()
    {
        if (this.Fight != null && this.runFight)
        {
            FighterTeamFightStatus winningTeam = this.Fight.GetWinner();
            if (winningTeam == null)
            {
                this.Fight.StepFight();
                Debug.Log(this.Fight.Alpha.DebugInfo() + "\n" + this.Fight.Beta.DebugInfo());

            }
            else
            {
                Debug.Log(winningTeam.TeamInfo.TeamName + "is the winner!!!");
                this.runFight = false;
            }
        }
    }
    void OnGUI() { 
        
    }

    void OnApplicationQuit()
    {
        if(myInfo != null)
        {
            BasicMechanics.Save(myInfo);
        }
    }
}
