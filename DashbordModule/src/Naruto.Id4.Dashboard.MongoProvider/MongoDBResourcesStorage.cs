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

        /// <summary>
        /// 新增编辑资源s
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<bool> AddUpdResources(ResourcesModel model)
        {
            //参数校检
            model.IsNotNull();
            //实体转换
            var entity = model.ToEntity();
            //将密钥明文存储 到描述中
            entity.Secrets?.ForEach(a =>
            {
                //将密码的明文存储到描述字段中
                a.Description = a.Value;
                a.Value = a.Value.Sha256Encrypt();
            });
            //定义一个返回值
            var returnValue = true;
            //验证新增修改
            if (model.Id.IsNullOrEmpty())
            {
                await mongoRepository.Command<ApiResource>().AddAsync(entity);
            }
            else
            {
                returnValue = await mongoRepository.Command<ApiResource>().UpdateAsync(a => a.Id == entity.Id, new Dictionary<string, object>
                {
                     { "Updated",DateTime.UtcNow},
                    { "Name",entity.Name},
                    { "Description",entity.Description},
                    { "Description",entity.Description},
                    { "DisplayName",entity.DisplayName},
                    { "Enabled",entity.Enabled},
                    { "Secrets",entity.Secrets},
                    { "Scopes",entity.Scopes},
                });
            }

            return returnValue;
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
            }).OrderByDescending(a => a.created).PageBy(search.Page, search.PageSize).ToListAsync();

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


        /// <summary>
        /// 验证资源名称是否存在
        /// </summary>
        /// <param name="id">主键id</param>
        /// <param name="name">名称</param>
        /// <returns></returns>
        public async Task<bool> ExistsResource(string id, string name)
        {
            name.IsNotNull();
            //定义一个返回值
            var returnValue = false;

            if (id.IsNullOfEmpty())
                returnValue = (await mongoRepository.Query<ApiResource>().CountAsync(a => a.Name == name)) > 0;
            else
                returnValue = (await mongoRepository.Query<ApiResource>().CountAsync(a => a.Name == name && a.Id != id)) > 0;
            return returnValue;
        }
    }
}
