using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetClients([FromQuery]SearchClientModel search)=>await services.GetClients(search);
    }
}
