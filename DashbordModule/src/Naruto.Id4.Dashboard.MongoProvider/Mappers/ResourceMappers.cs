using AutoMapper;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.MongoProvider.Mappers.Profiles;
using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.MongoProvider.Mappers
{
    public static class ResourceMappers
    {
        internal static IMapper Mapper { get; }
        static ResourceMappers()
        {
            Mapper = new MapperConfiguration(a => a.AddProfile<ResourcesProfile>()).CreateMapper();
        }

        /// <summary>
        /// 转换成model
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static ResourcesModel ToModel(this Entities.ApiResource entity)
        {
            return Mapper.Map<ResourcesModel>(entity);
        }
        /// <summary>
        /// 转换成实体
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static Entities.ApiResource ToEntity(this ResourcesModel model)
        {
            return Mapper.Map<Entities.ApiResource>(model);
        }
    }
}
