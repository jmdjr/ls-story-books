using System.Collections;
using UnityEngine;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using Core;
using Core.CombatSystem;

public static class BasicMechanics {
    static string saveFile;
    public static string SaveFile {
        get
        {
            if(saveFile == null)
            {
                saveFile = Application.persistentDataPath + "/MyGame.fight";
            }

            return saveFile;
        }
    }
    public static void Save(ManagerInfo teamInfo)
    {
        BinaryFormatter bf = new BinaryFormatter();
        FileStream file = File.Open(BasicMechanics.SaveFile, FileMode.OpenOrCreate);
        bf.Serialize(file, teamInfo);
        file.Close();
    }

    public static ManagerInfo Load()
    {
        if(File.Exists(BasicMechanics.SaveFile))
        {
            BinaryFormatter bf = new BinaryFormatter();
            FileStream file = File.Open(BasicMechanics.SaveFile, FileMode.Open);
            ManagerInfo teamInfo = (ManagerInfo)bf.Deserialize(file);
            file.Close();
            return teamInfo;
        }

        return null;
    }
}
