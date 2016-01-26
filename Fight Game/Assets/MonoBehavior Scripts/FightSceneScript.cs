using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Core;
using Core.CombatSystem;
using Core.ManagementSystem;

public class FightSceneScript : MonoBehaviour {

    // Use this for initialization
    public Fight Fight;
    public GameObject TeamPrefab;
    private GameControlScript controlReference;
    private Manager managerReference;
    private FighterTeam yourTeam;

    private bool runFight = true;
    void Start ()
    {
        controlReference = GameControlScript.control;
        managerReference = controlReference.Manager;

        InitializeFight();
        GenerateTeamsGameObjects();

        Debug.Log("Fight Beginning...");
        Debug.Log(this.Fight.Alpha.DebugInfo() + "\n" + this.Fight.Beta.DebugInfo());
        this.Fight.TeamUpdate += updateStatus;
    }
    void InitializeFight()
    {

        if (managerReference.ActiveTeam == null)
        {
            this.yourTeam = managerReference.SelectTeam();
        }
        else
        {
            this.yourTeam = managerReference.ActiveTeam;
        }


        FighterTeam AlphaTeam = this.yourTeam;
        this.yourTeam.Info.TeamName = "Alpha Team";

        FighterTeamInfo betaInfo = new FighterTeamInfo(true);
        FighterTeam BetaTeam = new FighterTeam(betaInfo);
        betaInfo.TeamName = "Beta Team";

        Fight = new Fight(AlphaTeam, BetaTeam);
    }
    void GenerateTeamsGameObjects()
    {
        GameObject alphaTeamObject = Instantiate<GameObject>(TeamPrefab);
        GameObject betaTeamObject = Instantiate<GameObject>(TeamPrefab);

        alphaTeamObject.transform.SetParent(this.transform);
        betaTeamObject.transform.SetParent(this.transform);

        alphaTeamObject.GetComponent<TeamFightScript>().reference = this.Fight.Alpha;
        betaTeamObject.GetComponent<TeamFightScript>().reference = this.Fight.Beta;

        alphaTeamObject.transform.localPosition = new Vector3(-3, 1, 0);
        betaTeamObject.transform.localPosition = new Vector3(3, 1, 0);
        betaTeamObject.transform.Rotate(new Vector3(0, 180, 0));

        alphaTeamObject.name = this.Fight.Alpha.TeamInfo.TeamName;
        betaTeamObject.name = this.Fight.Beta.TeamInfo.TeamName;
    }

    void updateStatus(FighterTeamFightStatus Alpha, FighterTeamFightStatus Beta)
    {
        //Update team info...
        //Debug.Log(Alpha.DebugInfo() + "\n" + Beta.DebugInfo());
    }

    // Update is called once per framee
    void Update()
    {
        RunFight();
    }

    bool anyoneAnimating(Fight fight)
    {
        return fight.FightOrder.TrueForAll(fighter => { return !fighter.IsAnimating; });

    }
    void RunFight()
    {
        if (this.Fight != null && this.runFight && anyoneAnimating(this.Fight))
        {
            FighterTeamFightStatus winningTeam = this.Fight.GetWinner();
            if (winningTeam == null)
            {
                this.Fight.StepFight();
            }
            else
            {
                Debug.Log(winningTeam.TeamInfo.TeamName + "is the winner!!!\n" + Fight.Alpha.DebugInfo() + "\n" + Fight.Beta.DebugInfo());
                this.runFight = false;
            }
        }

    }

    void OnApplicationQuit()
    {
    }
}
