using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Naruto.Id4.Dashboard.Extensions;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.Storage;
using Naruto.Id4.Entities;
using Naruto.MongoDB.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.MongoProvider
{
    public class MongoDBResourcesStorage : IResourcesStorage
    {
        private readonly IMongoRepository<DashbordMongoContext> mongoRepository;

        public MongoDBResourcesStorage(IMongoRepository<DashbordMongoContext> _mongoRepository)
        {
            mongoRepository = _mongoRepository;
        }

        public Task<bool> AddUpdResources(ResourcesModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ResourcesModel> GetResources(long id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 分页查询资源信息
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<Tuple<List<ResourcesViewModel>, int>> GetResourcess(SearchResourcessModel search)
        {
            search.IsNotNull();

            var apiResourceQueryable = mongoRepository.Query<ApiResource>().AsQueryable().WhereIf(!string.IsNullOrWhiteSpace(search.Keyword), a => a.Name.Contains(search.Keyword));
            var list = await apiResourceQueryable.Select(a => new ResourcesViewModel
            {
                created = a.Created,
                description = a.Description,
                enabled = a.Enabled,
                id = a.Id,
                name = a.Name,
                updated = a.Updated
            }).OrderByDescending(a=>a.created).PageBy(search.Page, search.PageSize).ToListAsync();

            var count = await apiResourceQueryable.CountAsync();
            return Tuple.Create(list, count);
        }

        /// <summary>
        /// 更改资源的状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="enabled"></param>
        /// <returns></returns>
        public async Task<bool> UpdateEnabled(string id, bool enabled)
        {
            id.IsNotNull();
            //修改
            return await mongoRepository.Command<ApiResource>().UpdateAsync(a => a.Id == id, new Dictionary<string, object>()
            {
               { "Enabled",enabled}
            });
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteById(string id)
        {
            id.IsNotNull();
            //删除
            return await mongoRepository.Command<ApiResource>().DeleteAsync(a => a.Id == id);
        }
    }
}
