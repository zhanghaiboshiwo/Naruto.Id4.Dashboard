using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 展示资源的集合
    /// </summary>
    public class ResourcesViewModel
    {

        public string id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 是否启用
        /// </summary>
        public bool enabled { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string description { get; set; }

        public DateTime created
        {
            get;
            set;
        }
        public DateTime? updated
        {
            get;
            set;
        }
    }
}
