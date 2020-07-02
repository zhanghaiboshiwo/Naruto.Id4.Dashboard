﻿using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.Services
{
    public class ResourcesServices
    {
        private readonly IResourcesStorage resourcesStorage;
        public ResourcesServices(IResourcesStorage _resourcesStorage)
        {
            resourcesStorage = _resourcesStorage;
        }
        /// <summary>
        /// 分页查询资源信息
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<NarutoResult> GetResourcess(SearchResourcessModel search)
        {
            if (search == null)
            {
                return new NarutoFailResult($"{nameof(search)}值不能为空");
            }
            var res = await resourcesStorage.GetResourcess(search);
            return new NarutoSuccessResult("操作成功", res.Item1, res.Item2);
        }

        /// <summary>
        /// 更改客户端的启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enabled"></param>
        /// <returns></returns>
        public async Task<NarutoResult> UpdateEnabled(string id, bool enabled)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new NarutoFailResult($"{nameof(id)}值不能为空");
            }
            //访问存储接口
            var res = await resourcesStorage.UpdateEnabled(id, enabled);
            if (res)
            {
                return new NarutoSuccessResult("操作成功");
            }
            return new NarutoFailResult("操作失败");
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<NarutoResult> DeleteById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new NarutoFailResult($"{nameof(id)}值不能为空");
            }
            //访问存储接口
            var res = await resourcesStorage.DeleteById(id);
            if (res)
            {
                return new NarutoSuccessResult("操作成功");
            }
            return new NarutoFailResult("操作失败");
        }
    }
}
