using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 客户端的展示实体
    /// </summary>
    public class ClientViewModel
    {
        /// <summary>
        /// 主键id
        /// </summary>
        public  string id { get; set; }
        /// <summary>
        /// 客户端id名称(唯一的)
        /// </summary>
        public string clientId { get; set; }
        /// <summary>
        /// 客户端名称
        /// </summary>
        public string clientName { get; set; }

        /// <summary>
        /// 指定此客户端是否需要密钥才能从令牌端点请求令牌.默认true
        /// </summary>

        public bool requireClientSecret { get; set; } = true;
        /// <summary>
        /// 指定是否需要同意屏幕.默认true 用于oidc
        /// </summary>
        public bool requireConsent { get; set; } = true;
    }
}
