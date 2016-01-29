using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

using Random = UnityEngine.Random;

public static class Extensions
{
    public static T RandomOne<T>(this List<T> collection)
    {
        T item = default(T);

        if(collection.Count > 0)
        {
            item = collection[Random.Range(0, collection.Count())];
        }

        return item;
    }

    // Weighs the items and selects one based on probability. 
    //  values for these weights needs to be 0 <= X <= 1. and total should be 1.0.
    public static T WeightedRandom<T>(this Dictionary<T, float> collection)
    {
        collection.OrderBy((item1) => item1.Value);
        float cumulation = 0.0f, roll = Random.value;

        List<KeyValuePair<T, float>> elements = collection.ToList();

        for (int i = 0; i < elements.Count; i++)
        {
            cumulation += elements[i].Value;
            if (roll < cumulation)
            {
                return elements[i].Key;
            }
        }

        return default(T);
    }
}
