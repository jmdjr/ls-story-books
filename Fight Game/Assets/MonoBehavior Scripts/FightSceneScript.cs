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

    void Start()
    {
        controlReference = GameControlScript.control;
        managerReference = controlReference.Manager;

        InitializeFight();
        GenerateTeamsGameObjects();

        Debug.Log("Fight Beginning...\n" + Fight.Alpha.DebugInfo() + "\n" + Fight.Beta.DebugInfo());
        Fight.PostStepUpdate += onTeamUpdate;
        Fight.FoundWinner += onFoundWinner;

        if (StatBoard != null)
        {
            GameObject board = Instantiate<GameObject>(StatBoard);

            board.transform.SetParent(transform);

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
            yourTeam = managerReference.SelectTeam();
        }
        else
        {
            yourTeam = managerReference.ActiveTeam;
        }

        FighterTeam AlphaTeam = yourTeam;
        yourTeam.Info.TeamName = "Alpha Team";

        FighterTeamInfo betaInfo = new FighterTeamInfo(true);
        FighterTeam BetaTeam = new FighterTeam(betaInfo);
        betaInfo.TeamName = "Beta Team";

        Fight = new Fight(AlphaTeam, BetaTeam);

        StartCoroutine(Fight.Run());
    }
    void GenerateTeamsGameObjects()
    {
        GameObject teamObject = Instantiate<GameObject>(TeamPrefab);

        teamObject.transform.SetParent(transform);
        teamObject.GetComponent<TeamFightScript>().reference = Fight.Alpha;
        teamObject.transform.localPosition = new Vector3(-3, 1, 0);
        teamObject.name = Fight.Alpha.TeamInfo.TeamName;

        teamObject = Instantiate<GameObject>(TeamPrefab);
        teamObject.transform.SetParent(transform);
        teamObject.GetComponent<TeamFightScript>().reference = Fight.Beta;
        teamObject.transform.localPosition = new Vector3(3, 1, 0);
        teamObject.transform.Rotate(new Vector3(0, 180, 0));
        teamObject.name = Fight.Beta.TeamInfo.TeamName;
    }

    // Update is called once per framee
    void Update()
    {
    }

    void OnApplicationQuit()
    {
    }

    void onTeamUpdate(FighterTeamFightStatus Alpha, FighterTeamFightStatus Beta)
    {
        UpdateTeamText(Alpha, AlphaTextObject);
        UpdateTeamText(Beta, BetaTextObject);
    }

    void onFoundWinner(FighterTeamFightStatus Winner)
    {
        Debug.Log(Winner.TeamInfo.TeamName + "is the winner!!!\n" + Fight.Alpha.DebugInfo() + "\n" + Fight.Beta.DebugInfo());
    }

    void UpdateTeamText(FighterTeamFightStatus team, GameObject textObject)
    {
        if (textObject != null)
        {
            textObject.GetComponent<Text>().text = TeamTextPrint(team);
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
