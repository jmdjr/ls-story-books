using UnityEngine;
using System.Collections;
using Core;

public class StatsBoardScript : MonoBehaviour {
    public GameObject StatBoard;
    public GameObject TextPrefab;

	// Use this for initialization
	void Start () {
        if (StatBoard != null)
        {
            var board = Instantiate<GameObject>(StatBoard);


            if (TextPrefab != null)
            {

            }
        }
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
