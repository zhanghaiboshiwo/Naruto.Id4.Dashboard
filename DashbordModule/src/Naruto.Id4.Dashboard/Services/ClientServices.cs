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
        /// <summary>
        /// 获取数据
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<NarutoResult> GetClients(SearchClientModel search)
        {
            if (search == null)
            {
                return new NarutoFailResult($"{nameof(search)}值不能为空");
            }
            var res = await clientStorage.GetClients(search);
            return new NarutoSuccessResult("操作成功", res.Item1, res.Item2);
        }


        /// <summary>
        /// 更改是否需要秘钥的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requireClientSecret"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateRequireClientSecret(string id, bool requireClientSecret)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new NarutoFailResult($"{nameof(id)}值不能为空");
            }
            //访问存储接口
            var res = await clientStorage.UpdateRequireClientSecret(id, requireClientSecret);
            if (res)
            {
                return new NarutoSuccessResult("操作成功");
            }
            return new NarutoFailResult("操作失败");
        }

        /// <summary>
        /// 更改授权页面的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requireClientSecret"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateRequireConsent(string id, bool requireConsent)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new NarutoFailResult($"{nameof(id)}值不能为空");
            }
            //访问存储接口
            var res = await clientStorage.UpdateRequireConsent(id, requireConsent);
            if (res)
            {
                return new NarutoSuccessResult("操作成功");
            }
            return new NarutoFailResult("操作失败");
        }


        /// <summary>
        /// 根据id删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<NarutoResult> DeleteClientById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new NarutoFailResult($"{nameof(id)}值不能为空");
            }
            //访问存储接口
            var res = await clientStorage.DeleteClientById(id);
            if (res)
            {
                return new NarutoSuccessResult("操作成功");
            }
            return new NarutoFailResult("操作失败");
        }
    }
}
