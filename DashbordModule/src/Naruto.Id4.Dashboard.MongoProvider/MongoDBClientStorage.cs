using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Naruto.Id4.Dashboard.Extensions;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.MongoProvider.Mappers;
using Naruto.Id4.Dashboard.Storage;
using Naruto.Id4.Entities;
using Naruto.MongoDB;
using Naruto.MongoDB.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.MongoProvider
{
    /// <summary>
    /// 
    /// </summary>
    public class MongoDBClientStorage : IClientStorage
    {
        private readonly IMongoRepository<DashbordMongoContext> mongoRepository;

        public MongoDBClientStorage(IMongoRepository<DashbordMongoContext> _mongoRepository)
        {
            mongoRepository = _mongoRepository;
        }
        public async Task<bool> AddUpdClient(ClientModel model)
        {
            //参数校检
            model.IsNotNull();
            //实体转换
            var entity = model.ToEntity();
            //定义返回值
            var returnValue = true;
            //验证新增修改
            if (model.Id.IsNullOrEmpty())
            {
                await mongoRepository.Command<Client>().AddAsync(entity);
            }
            else
            {
                entity.Updated = DateTime.UtcNow;
                returnValue = await mongoRepository.Command<Client>().ReplaceOneAsync(a => a.Id == entity.Id, entity);
            }
            return returnValue;
        }

        /// <summary>
        /// 根据id删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteClientById(string id)
        {
            return await mongoRepository.Command<Client>().DeleteAsync(a => a.Id == id);
        }
        /// <summary>
        /// 获取客户端数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ClientModel> GetClient(string id)
        {
            id.IsNotNull();
            //获取客户端
            var client = await mongoRepository.Query<Client>().FirstOrDefaultAsync(a => a.Id == id);
            if (client == null)
            {
                return default;
            }
            return client.ToModel();
        }

        public async Task<Tuple<List<ClientViewModel>, int>> GetClients(SearchClientModel search)
        {
            search.IsNotNull();
            //获取数据
            var list = await mongoRepository.Query<Client>().AsQueryable()
                  .WhereIf(!string.IsNullOrWhiteSpace(search.Keyword), a => a.ClientId.Contains(search.Keyword) || a.ClientName.Contains(search.Keyword)).OrderByDescending(a => a.Created)
                  .Select(a => new ClientViewModel
                  {
                      id = a.Id,
                      clientId = a.ClientId,
                      clientName = a.ClientName,
                      requireClientSecret = a.RequireClientSecret,
                      requireConsent = a.RequireConsent,
                      enabled = a.Enabled,
                      description = a.Description
                  }).PageBy(search.Page, search.PageSize).ToListAsync();
            //获取总条数
            var count = await mongoRepository.Query<Client>().AsQueryable()
                  .WhereIf(!string.IsNullOrWhiteSpace(search.Keyword), a => a.ClientId.Contains(search.Keyword) || a.ClientName.Contains(search.Keyword)).CountAsync();

            return Tuple.Create(list, count);
        }

        /// <summary>
        /// 更改是否需要秘钥的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requireClientSecret"></param>
        /// <returns></returns>
        public async Task<bool> UpdateRequireClientSecret(string id, bool requireClientSecret)
        {
            id.IsNotNull();
            //修改
            return await mongoRepository.Command<Client>().UpdateAsync(a => a.Id == id, new Dictionary<string, object>()
            {
               { "RequireClientSecret",requireClientSecret}
            });
        }

        /// <summary>
        /// 更改授权页面的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="requireClientSecret"></param>
        /// <returns></returns>
        public async Task<bool> UpdateRequireConsent(string id, bool requireConsent)
        {
            id.IsNotNull();
            //修改
            return await mongoRepository.Command<Client>().UpdateAsync(a => a.Id == id, new Dictionary<string, object>()
            {
               { "RequireConsent",requireConsent}
            });
        }

        /// <summary>
        /// 更改客户端的启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enable"></param>
        /// <returns></returns>
        public async Task<bool> UpdateEnabled(string id, bool enabled)
        {
            id.IsNotNull();
            //修改
            return await mongoRepository.Command<Client>().UpdateAsync(a => a.Id == id, new Dictionary<string, object>()
            {
               { "Enabled",enabled}
            });
        }

        /// <summary>
        /// 验证客户端是否存在
        /// </summary>
        /// <param name="id">主键id</param>
        /// <param name="clientId">客户端id</param>
        /// <returns></returns>
        public async Task<bool> ExistsClientId(string id, string clientId)
        {
            clientId.IsNotNull();
            //定义一个返回值
            var returnValue = false;

            if (id.IsNullOfEmpty())
                returnValue = (await mongoRepository.Query<Client>().CountAsync(a => a.ClientId == clientId)) > 0;
            else
                returnValue = (await mongoRepository.Query<Client>().CountAsync(a => a.ClientId == clientId && a.Id != id)) > 0;
            return returnValue;
        }
    }
}
