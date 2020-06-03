using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 客户端编辑的视图模型
    /// </summary>
    public class EditClientViewModel
    {

        public string id { get; set; }
        /// <summary>
        /// 客户端id名称(唯一的)
        /// </summary>
        public string clientId { get; set; }
        /// <summary>
        /// 客户端名称
        /// </summary>
        public string clientName { get; set; }

        /// <summary>
        /// 客户端描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 身份令牌的生命周期
        /// </summary>
        public int identityTokenLifetime { get; set; }
        /// <summary>
        /// 访问令牌的生命周期
        /// </summary>
        public int accessTokenLifetime { get; set; }


        /// <summary>
        /// 允许的授权类型
        /// </summary>
        public List<string> allowedGrantTypes { get; set; }
        /// <summary>
        /// 允许的授权范围
        /// </summary>
        public List<string> allowedScopes { get; set; }
        /// <summary>
        /// 跳转地址
        /// </summary>
        public List<string> redirectUris { get; set; }
        /// <summary>
        /// 登出地址
        /// </summary>
        public List<string> postLogoutRedirectUris { get; set; }
        /// <summary>
        /// 跨域地址
        /// </summary>
        public List<string> allowedCorsOrigins { get; set; }

        /// <summary>
        /// 密钥
        /// </summary>
        public List<string> clientSecrets { get; set; }
    }
}
