using Microsoft.AspNetCore.Mvc;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.Services
{
    /// <summary>
    /// 客户端服务对象
    /// </summary>
    public class ClientServices
    {
        private readonly IClientStorage clientStorage;

        public ClientServices(IClientStorage _clientStorage)
        {
            clientStorage = _clientStorage;
        }
        public async Task<IActionResult> GetClients(SearchClientModel search)
        {
            NarutoResult narutoResult = new NarutoResult();
            if (search == null)
            {
                narutoResult.msg = $"{nameof(search)}值不能为空";
                return new NotFoundObjectResult(narutoResult);
            }
            var res = await clientStorage.GetClients(search);
            narutoResult.data = res.Item1;
            narutoResult.recordCount = res.Item2;
            return new OkObjectResult(narutoResult);
        }
    }
}
