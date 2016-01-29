using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

namespace Core
{
    [Serializable]
    public class AnimationControllerReferenceSystem
    {
        public List<RuntimeAnimatorController> controllers;

        public RuntimeAnimatorController FromName(string name)
        {
            return controllers.FirstOrDefault(i => i.name == name);
        }
    }
}
