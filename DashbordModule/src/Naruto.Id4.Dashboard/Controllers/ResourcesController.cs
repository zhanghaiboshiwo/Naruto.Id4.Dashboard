using Microsoft.AspNetCore.Mvc;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.Controllers
{
    [ApiController]
    /// <summary>
    /// 资源控制器
    /// </summary>
    [Route("Naruto/[controller]")]
    public class ResourcesController : ControllerBase
    {
        private readonly ResourcesServices resourceService;

        public ResourcesController(ResourcesServices _resourceService)
        {
            resourceService = _resourceService;
        }
        [HttpGet]
        /// <summary>
        /// 分页查询资源信息
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<NarutoResult> GetResourcess([FromQuery] SearchResourcessModel search) => await resourceService.GetResourcess(search);


        [HttpPost("enabled/{id}")]
        /// <summary>
        /// 更改客户端的启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enabled"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateEnabled(string id, [FromForm] bool enabled) => await resourceService.UpdateEnabled(id, enabled);

        [HttpDelete("{id}")]
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<NarutoResult> DeleteById(string id) => await resourceService.DeleteById(id);
        /// <summary>
        /// 保存资源信息
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<NarutoResult> Save(ResourcesModel info) => await resourceService.Save(info);
    }
}
