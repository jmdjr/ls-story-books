using UnityEngine;
using System.Collections;
using CombatSystem;
public class TeamFightScript : MonoBehaviour {

    public FighterTeamFightStatus reference;
    public GameObject FighterPrefab;

	// Use this for initialization
    void Start()
    {
        if (reference != null)
        {
            float vertical = 0;
            foreach (var status in reference.TeamStatus)
            {
                GameObject fighter = Instantiate<GameObject>(FighterPrefab);
                fighter.GetComponent<FighterScript>().reference = status;
                fighter.transform.parent = this.gameObject.transform;
                fighter.transform.localPosition = new Vector3(0, vertical, 0);

                vertical -= 2;
            }
        }

	}
	
	// Update is called once per frame
	void Update () {
        if (reference != null)
        {
            string teamStatus = reference.TeamInfo.TeamName + "\n";
            reference.TeamStatus.ForEach((fighterStatus) => {
                teamStatus += fighterStatus.info.Name + ": " + fighterStatus.idleTime + "\n";
            });

            //Debug.Log(teamStatus);
        }
	
	}
}