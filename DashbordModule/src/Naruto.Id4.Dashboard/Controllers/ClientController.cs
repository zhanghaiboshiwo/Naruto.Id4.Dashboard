﻿using Microsoft.AspNetCore.Mvc;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.Services;
using Naruto.Id4.Dashboard.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.Core
{
    [ApiController]
    /// <summary>
    /// 客户端控制器
    /// </summary>
    [Route("Naruto/[controller]")]
    public class ClientController : ControllerBase
    {

        private readonly ClientServices services;

        public ClientController(ClientServices _services)
        {
            services = _services;
        }
        [HttpGet]
        /// <summary>
        /// 获取客户端数据
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<NarutoResult> GetClients([FromQuery] SearchClientModel search) => await services.GetClients(search);

        [HttpGet("{id}")]
        /// <summary>
        /// 获取客户端数据 单条
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<NarutoResult> GetClient(string id) => await services.GetClient(id);

        [HttpPost("RequireClientSecret/{id}")]
        /// <summary>
        /// 更改是否需要秘钥的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requireClientSecret"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateRequireClientSecret(string id, [FromForm] bool requireClientSecret) => await services.UpdateRequireClientSecret(id, requireClientSecret);

        [HttpPost("RequireConsent/{id}")]
        /// <summary>
        /// 更改是否需要授权页面的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requireClientSecret"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateRequireConsent(string id, [FromForm] bool requireConsent) => await services.UpdateRequireConsent(id, requireConsent);
        [HttpPost("Enabled/{id}")]
        /// <summary>
        /// 更改客户端的启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enabled"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateEnabled(string id, [FromForm] bool enabled) => await services.UpdateEnabled(id, enabled);
        /// <summary>
        /// 删除客户端
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<NarutoResult> DeleteClientById(string id) => await services.DeleteClientById(id);

        [HttpPost]
        /// <summary>
        /// 新增修改客户端
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<NarutoResult> AddUpdClient(ClientModel model) => await services.AddUpdClient(model);
    }
}
