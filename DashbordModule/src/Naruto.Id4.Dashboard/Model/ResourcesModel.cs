using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 资源的实体
    /// </summary>
    public class ResourcesModel
    {
        /// <summary>
        /// 主键id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 显示名
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// 是否启用
        /// </summary>
        public bool Enabled { get; set; }

        public List<ApiScopeDTO> ApiScopes { get; set; }

        public List<ApiSecretDTO> ApiSecrets { get; set; }
    }
    /// <summary>
    /// API 范围传输对象
    ///
    /// </summary>
    public class ApiScopeDTO
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 显示名
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// 是否显示屏幕
        /// </summary>
        public bool Required { get; set; }
    }

    /// <summary>
    /// api秘钥传输对象
    /// </summary>
    public class ApiSecretDTO
    {
        /// <summary>
        /// 值
        /// </summary>
        public string Value
        {
            get;
            set;
        }
        /// <summary>
        /// 过期时间
        /// </summary>

        public DateTime? Expiration
        {
            get;
            set;
        }
    }

}
