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
        }

        public Task<ClientModel> GetClient(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<Tuple<List<ClientViewModel>, long>> GetClients(SearchClientModel search)
        {
            search.IsNotNull();
            //获取数据
            var list = await mongoRepository.Query<Client>().AsQueryable()
                  .WhereIf(!string.IsNullOrWhiteSpace(search.Keyword), a => a.ClientId.Contains(search.Keyword) || a.ClientName.Contains(search.Keyword))
                  .Select(a => new ClientViewModel
                  {
                      Id = a.Id,
                      ClientId = a.ClientId,
                      ClientName = a.ClientName
                  }).PageBy(search.Page, search.PageSize).ToListAsync();
            //获取总条数
            var count = await mongoRepository.Query<Client>().CountAsync(a =>
                (!string.IsNullOrWhiteSpace(search.Keyword)) ?
                (a.ClientId.Contains(search.Keyword) || a.ClientName.Contains(search.Keyword))
                : true
                );

            return Tuple.Create(list, count);
        }
    }
}
