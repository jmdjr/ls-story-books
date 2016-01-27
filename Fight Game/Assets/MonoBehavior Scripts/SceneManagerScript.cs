using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

public class SceneManagerScript : MonoBehaviour {
    GameControlScript reference;
	// Use this for initialization
	void Start () {
        reference = GameControlScript.control;
	}

    public void SwitchScenes(string scene)
    {
        Debug.Log("Scene Loader attempt 1...");
        SceneManager.LoadScene(scene);
    }
}
