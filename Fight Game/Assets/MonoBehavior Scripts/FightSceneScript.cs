using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using Core;
using Core.CombatSystem;
using Core.ManagementSystem;
using UnityEngine.UI;

public class FightSceneScript : MonoBehaviour {

    // Use this for initialization
    public Fight Fight;
    public GameObject TeamPrefab;
    private GameControlScript controlReference;
    private Manager managerReference;
    private FighterTeam yourTeam;

    public GameObject StatBoard;
    public GameObject TextPrefab;

    private GameObject AlphaTextObject;
    private GameObject BetaTextObject;

    private bool runFight = true;
    void Start()
    {
        controlReference = GameControlScript.control;
        managerReference = controlReference.Manager;

        InitializeFight();
        GenerateTeamsGameObjects();

        Debug.Log("Fight Beginning...");
        Debug.Log(this.Fight.Alpha.DebugInfo() + "\n" + this.Fight.Beta.DebugInfo());
        this.Fight.TeamUpdate += onTeamUpdate;

        if (StatBoard != null)
        {
            GameObject board = Instantiate<GameObject>(StatBoard);

            board.transform.SetParent(this.transform);

            if (TextPrefab != null)
            {
                AlphaTextObject = Instantiate<GameObject>(TextPrefab);
                AlphaTextObject.name = "AlphaTeamText";
                AlphaTextObject.transform.SetParent(board.transform);
                AlphaTextObject.transform.localPosition = new Vector3(-200, -50, 0);

                BetaTextObject = Instantiate<GameObject>(TextPrefab);
                BetaTextObject.name = "BetaTeamText";
                BetaTextObject.transform.SetParent(board.transform);
                BetaTextObject.transform.localPosition = new Vector3(100, -50, 0);
            }

        }
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

    // Update is called once per framee
    void Update()
    {
        if (this.runFight)
        {
            StartCoroutine(RunFight());
            this.runFight = false;
        }
    }

    bool anyoneAnimating(Fight fight)
    {
        return fight.FightOrder.TrueForAll(fighter => { return !fighter.IsAnimating; });

    }
    IEnumerator RunFight()
    {
        if(this.Fight != null) 
        {
            FighterTeamFightStatus winningTeam = this.Fight.GetWinner();

            while (winningTeam == null)
            {
                if (anyoneAnimating(this.Fight))
                {
                    this.Fight.StepFight();
                    winningTeam = this.Fight.GetWinner();
                }

                yield return new WaitForSeconds(0.10f);
            }

            Debug.Log(winningTeam.TeamInfo.TeamName + "is the winner!!!\n" + Fight.Alpha.DebugInfo() + "\n" + Fight.Beta.DebugInfo());
        }
        
    }

    void OnApplicationQuit()
    {
    }
    private bool textRoutinesLaunched = false;
    void onTeamUpdate(FighterTeamFightStatus Alpha, FighterTeamFightStatus Beta)
    {
        if (!textRoutinesLaunched)
        {
            StartCoroutine(UpdateTeamText(Alpha, AlphaTextObject));
            StartCoroutine(UpdateTeamText(Beta, BetaTextObject));
            textRoutinesLaunched = true;
        }
    }

    IEnumerator UpdateTeamText(FighterTeamFightStatus team, GameObject textObject)
    {
        while (team.anyoneLeftAlive() && textObject != null)
        {
            textObject.GetComponent<Text>().text = TeamTextPrint(team);
            yield return new WaitForFixedUpdate();
        }
    }

    private string TeamTextPrint(FighterTeamFightStatus team)
    {
        string text = team.TeamInfo.TeamName + "\n";

        foreach (FighterFightStatus fighter in team.TeamStatus)
        {
            text += string.Format("Name:{0, 10} Ticks: {1, 3} Health: {2, 4} Attack: {3, 2} \n", fighter.Info.Name, fighter.IdleTime(), fighter.Info.Health, fighter.RealAttack);
        }

        return text;
    }
}
