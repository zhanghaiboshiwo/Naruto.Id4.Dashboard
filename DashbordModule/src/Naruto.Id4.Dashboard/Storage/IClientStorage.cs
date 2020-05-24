using Naruto.Id4.Dashboard.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.Storage
{
    /// <summary>
    /// 客户端的存储服务接口
    /// </summary>
    public interface IClientStorage
    {
        /// <summary>
        /// 新增修改客户端
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<bool> AddUpdClient(ClientModel model);

        /// <summary>
        /// 根据id查询model信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ClientModel> GetClient(long id);
        /// <summary>
        /// 展示客户端集合
        /// </summary>
        /// <returns></returns>
        Task<Tuple<List<ClientViewModel>, long>> GetClients(SearchClientModel search);
    }
}
