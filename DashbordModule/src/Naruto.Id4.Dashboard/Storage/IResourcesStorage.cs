using Naruto.Id4.Dashboard.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.Storage
{
    /// <summary>
    /// 存储资源的接口
    /// </summary>
    public interface IResourcesStorage
    {
        /// <summary>
        /// 新增修改
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<bool> AddUpdResources(ResourcesModel model);

        /// <summary>
        /// 根据id查询model信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ResourcesModel> GetResources(long id);
        /// <summary>
        /// 展示资源集合
        /// </summary>
        /// <returns></returns>
        Task<List<ResourcesViewModel>> GetResourcess(SearchResourcessModel search);
    }
}
