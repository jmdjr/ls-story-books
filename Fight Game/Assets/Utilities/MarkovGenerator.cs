using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public static class MarkovGenerator {
    private static List<string> SampleNames = new List<string>() { 
        "Abrielle", "Adair", "Adara", "Adriel", "Aiyana", "Alissa", "Alixandra", "Altair", "Amara", "Anatola", "Anya", "Arcadia", "Ariadne", 
        "Arianwen", "Aurelia", "Aurelian", "Aurelius", "Avalon", "Acalia", "Alaire", "Auristela",
        "Bastian", "Breena", "Brielle", "Briallan", "Briseis",
        "Cambria", "Cara", "Carys", "Caspian", "Cassia", "Cassiel", "Cassiopeia", "Cassius", "Chaniel", "Cora", "Corbin", "Cyprian",
        "Daire", "Darius", "Destin", "Drake", "Drystan", "Dagen", "Devlin", "Devlyn",
        "Eira", "Eirian", "Elysia", "Eoin", "Evadne", "Eliron", "Evanth", "Fineas", "Finian", "Fyodor",
        "Gareth", "Gavriel", "Griffin", "Guinevere", "Gaerwn", "Ginerva", "Hadriel", "Hannelore", "Hermione", "Hesperos",
        "Iagan", "Ianthe", "Ignacia", "Ignatius", "Iseult", "Isolde", "Jessalyn", "Kara", "Kerensa", "Korbin", "Kyler", "Kyra", "Katriel", "Kyrielle",
        "Leala", "Leila", "Lilith", "Liora", "Lucien", "Lyra", "Leira", "Liriene", "Liron",
        "Maia", "Marius", "Mathieu", "Mireille", "Mireya", "Maylea", "Meira",
        "Natania", "Nerys", "Nuriel", "Nyssa", "Neirin", "Nyfain", "Oisin", "Oralie", "Orion", "Orpheus", "Ozara", "Oleisa", "Orinthea",
        "Peregrine", "Persephone", "Perseus", "Petronela", "Phelan", "Pryderi", "Pyralia", "Pyralis", "Qadira", "Quintessa", "Quinevere",
        "Raisa", "Remus", "Rhyan", "Rhydderch", "Riona", "Renfrew",
        "Saoirse", "Sarai", "Sebastian", "Seraphim", "Seraphina", "Sirius", "Sorcha", "Saira", "Sarielle", "Serian", "Severin",
        "Tavish", "Tearlach", "Terra", "Thalia", "Thaniel", "Theia", "Torian", "Torin", "Tressa", "Tristana", "Uriela", "Urien", "Ulyssia", "Vanora", "Vespera", "Vasilis",
        "Xanthus", "Xara", "Xylia", "Yadira", "Yseult", "Yakira", "Yeira", "Yeriel", "Yestin",
        "Zaira", "Zephyr", "Zora", "Zorion", "Zaniel", "Zarek"
    };

    private static Dictionary<char, List<char>> markovChains;
    private static Dictionary<char, List<char>> MarkovChains 
    {
        get
        {
            if (markovChains == null)
            {
                markovChains = GenerateChains();
            }

            return markovChains;
        }
    
    }

    private static Dictionary<char, List<char>> GenerateChains()
    {
        Dictionary<char, List<char>> chains = new Dictionary<char, List<char>>();

        foreach (string name in SampleNames)
        {
            string temp = name.ToLower();
            
            while(temp.Length > 0) {
                char currentChar = temp[0];
                
                if (!chains.ContainsKey(currentChar))
                {
                    chains[currentChar] = new List<char>();
                }

                if (temp.Length > 1 /*&& chains[currentChar].IndexOf(temp[1]) == -1*/)
                {
                    chains[currentChar].Add(temp[1]);
                }

                temp = temp.Substring(1);
            }
        }

        return chains;
    }

    public static string GenerateName(int min, int max)
    {
        string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToLower();
        char[] seeds = Alphabet.ToCharArray();
        char seed = seeds[Random.Range(0, seeds.Length)];
        int length = Random.Range(min, max);

        string name = seed.ToString().ToUpper();

        for (int i = 0; i < length; ++i)
        {
            seed = MarkovChains[seed].RandomOne();
            name += seed;
        }
        
        return name;
    }
}
