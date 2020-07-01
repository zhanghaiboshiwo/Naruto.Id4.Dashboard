using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 查询实体
    /// </summary>
    public class SearchModel
    {
        /// <summary>
        /// 页数
        /// </summary>
        public int Page { get; set; }
        /// <summary>
        /// 行数
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 关键字查询 
        /// </summary>
        public string Keyword { get; set; }
    }
}
