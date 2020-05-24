using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 客户端查询
    /// </summary>
    public class SearchClientModel : SearchModel
    {
        /// <summary>
        /// 关键字查询 根据客户端id和名称
        /// </summary>
        public string Keyword { get; set; }
    }
}
