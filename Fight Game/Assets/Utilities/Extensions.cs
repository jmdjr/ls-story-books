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
}
