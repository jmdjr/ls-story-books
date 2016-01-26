using UnityEngine;
using System.Collections;
using Core.CombatSystem;
public class TeamFightScript : MonoBehaviour {

    public FighterTeamFightStatus reference;
    public GameObject FighterPrefab;

	// Use this for initialization
    void Start()
    {
        if (reference != null)
        {
            float vertical = 0;
            float horizontal = 0;
            float zOrder = 0;
            float scale = 0.95f;
            foreach (var status in reference.TeamStatus)
            {
                GenerateFighterObject(new Vector3(horizontal, vertical, zOrder), new Vector3(scale, scale), status);
                horizontal -= 0.65f;
                vertical -= 1.5f;
                scale += 0.25f;
            }
        }
	}
	
	// Update is called once per frame
	void Update () {
	}

    GameObject GenerateFighterObject(Vector3 position, Vector3 scale, FighterFightStatus fightStatus)
    {
        GameObject fighter = Instantiate<GameObject>(FighterPrefab);
        fighter.GetComponent<FighterScript>().reference = fightStatus;
        fighter.transform.parent = this.gameObject.transform;
        fighter.transform.localPosition = position;
        fighter.transform.localScale = scale;

        // Reset rotation, as it gets rotated for team stuff.
        fighter.transform.localRotation = new Quaternion();

        return fighter;
    }
}