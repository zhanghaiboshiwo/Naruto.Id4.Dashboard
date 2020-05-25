using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Naruto.Id4.Dashboard.Extensions;
using Naruto.Id4.Dashboard.Model;
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
        public Task<bool> AddUpdClient(ClientModel model)
        {
            model.IsNotNull();
            if (model.Id.IsNullOrEmpty())
            {
                // mongoRepository.Command<Client>().ReplaceOneAsync();
            }
            else
            {

            }
            return default;
        }

        public Task<ClientModel> GetClient(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<Tuple<List<ClientViewModel>, int>> GetClients(SearchClientModel search)
        {
            search.IsNotNull();
            //获取数据
            var list = await mongoRepository.Query<Client>().AsQueryable()
                  .WhereIf(!string.IsNullOrWhiteSpace(search.Keyword), a => a.ClientId.Contains(search.Keyword) || a.ClientName.Contains(search.Keyword))
                  .Select(a => new ClientViewModel
                  {
                      id = a.Id,
                      clientId = a.ClientId,
                      clientName = a.ClientName
                  }).PageBy(search.Page, search.PageSize).ToListAsync();
            //获取总条数
            var count = await mongoRepository.Query<Client>().AsQueryable()
                  .WhereIf(!string.IsNullOrWhiteSpace(search.Keyword), a => a.ClientId.Contains(search.Keyword) || a.ClientName.Contains(search.Keyword)).CountAsync();

            return Tuple.Create(list, count);
        }
    }
}
