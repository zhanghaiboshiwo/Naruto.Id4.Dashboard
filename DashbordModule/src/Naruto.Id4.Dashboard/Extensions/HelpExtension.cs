using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Extensions
{

    public static class HelpExtension
    {
        public static void IsNotNull(this object source)
        {
            if (source == null)
            {
                throw new ArgumentNullException($"{source.GetType().Name},值不能为空");
            }
        }
    }
}
