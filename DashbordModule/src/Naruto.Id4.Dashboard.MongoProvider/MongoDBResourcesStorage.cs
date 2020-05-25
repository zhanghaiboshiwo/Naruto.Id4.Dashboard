using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.Storage;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Naruto.Id4.Dashboard.MongoProvider
{
    public class MongoDBResourcesStorage : IResourcesStorage
    {
        public Task<bool> AddUpdResources(ResourcesModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ResourcesModel> GetResources(long id)
        {
            throw new NotImplementedException();
        }

        public Task<List<ResourcesViewModel>> GetResourcess(SearchResourcessModel search)
        {
            throw new NotImplementedException();
        }
    }
}
