using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 返回结果
    /// </summary>
    public class NarutoResult
    {
        /// <summary>
        /// 数据
        /// </summary>
        public object data { get; set; }

        /// <summary>
        /// 总条数
        /// </summary>
        public long recordCount { get; set; }

        /// <summary>
        /// 消息
        /// </summary>
        public string msg { get; set; }
    }
}
