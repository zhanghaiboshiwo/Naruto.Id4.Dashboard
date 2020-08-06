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
        Task<Tuple<List<ResourcesViewModel>, int>> GetResourcess(SearchResourcessModel search);

        /// <summary>
        /// 验证资源名称是否存在
        /// </summary>
        /// <param name="id">主键id</param>
        /// <param name="name">名称</param>
        /// <returns></returns>
         Task<bool> ExistsResource(string id, string name);
        /// <summary>
        /// 更改资源的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enabled"></param>
        /// <returns></returns>
        Task<bool> UpdateEnabled(string id, bool enabled);

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> DeleteById(string id);
    }
}
