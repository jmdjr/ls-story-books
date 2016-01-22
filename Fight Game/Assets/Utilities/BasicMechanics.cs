using System.Collections;
using UnityEngine;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using CombatSystem;

public static class BasicMechanics {
    static string saveFile;
    public static string SaveFile {
        get
        {
            if(saveFile == null)
            {
                saveFile = Application.persistentDataPath + "/playerinfo.dat";
            }

            return saveFile;
        }
    }
    public static void Save(FighterTeamInfo teamInfo)
    {
        BinaryFormatter bf = new BinaryFormatter();
        FileStream file = File.Open(BasicMechanics.SaveFile, FileMode.OpenOrCreate);
        bf.Serialize(file, teamInfo);
        file.Close();
    }

    public static FighterTeamInfo Load()
    {
        if(File.Exists(BasicMechanics.SaveFile))
        {
            BinaryFormatter bf = new BinaryFormatter();
            FileStream file = File.Open(BasicMechanics.SaveFile, FileMode.Open);
            FighterTeamInfo teamInfo = (FighterTeamInfo)bf.Deserialize(file);
            file.Close();
            return teamInfo;
        }

        return null;
    }
}
