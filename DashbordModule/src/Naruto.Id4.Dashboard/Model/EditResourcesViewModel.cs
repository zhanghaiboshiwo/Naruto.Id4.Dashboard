using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 编辑资源的显示实体
    /// </summary>
    public class EditResourcesViewModel
    {
        public string id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 显示名
        /// </summary>
        public string displayName { get; set; }

        /// <summary>
        /// 是否启用
        /// </summary>
        public bool enabled { get; set; }


        public List<ApiScopeViewModel> apiScopes { get; set; }

        public List<ApiSecretViewModel> apiSecrets { get; set; }
    }

    /// <summary>
    /// API 范围传输对象
    ///
    /// </summary>
    public class ApiScopeViewModel
    {
        public string id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 显示名
        /// </summary>
        public string displayName { get; set; }

        /// <summary>
        /// 是否显示屏幕
        /// </summary>
        public bool required { get; set; }
    }

    /// <summary>
    /// api秘钥传输对象
    /// </summary>
    public class ApiSecretViewModel
    {
        public string id { get; set; }
        /// <summary>
        /// 值
        /// </summary>
        public string value
        {
            get;
            set;
        }
        /// <summary>
        /// 过期时间
        /// </summary>

        public DateTime? expiration
        {
            get;
            set;
        }
    }
}
