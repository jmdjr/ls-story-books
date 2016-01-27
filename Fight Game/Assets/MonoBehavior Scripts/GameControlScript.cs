using UnityEngine;
using System.Collections;
using Core;
using Core.CombatSystem;
using Core.ManagementSystem;
using UnityEngine.SceneManagement;

public class GameControlScript: MonoBehaviour
{
    public static GameControlScript control;
    private Manager manager = null;
    public Manager Manager {
        get
        {
            if(manager == null)
            {
                this.LoadManager();
            }

            return this.manager;
        }
    }

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
    }

    // Update is called once per frame
    void Update ()
    {
	}

    void OnGUI() { 
    }

    public void LoadManager()
    {
        ManagerInfo info = BasicMechanics.Load();
        Debug.Log("Loading save file: " + BasicMechanics.SaveFile);

        if (info != null)
        {
            this.manager = new Manager(info);
        }
        else
        {
            // alert saying save file not found, maybe create new manager.
            info = new ManagerInfo(true);
            this.manager = new Manager(info);
        }
    }

    public void SaveManager()
    {
        Debug.Log("Creating save file: " + BasicMechanics.SaveFile);
        BasicMechanics.Save(this.Manager.Info);
    }

    void OnApplicationQuit()
    {
        this.SaveManager();
    }
}
