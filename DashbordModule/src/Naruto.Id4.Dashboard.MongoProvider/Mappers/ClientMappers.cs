using AutoMapper;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Dashboard.MongoProvider.Mappers.Profiles;
using Naruto.Id4.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.MongoProvider.Mappers
{
    public static class ClientMappers
    {
        internal static IMapper Mapper { get; }
        static ClientMappers()
        {
            Mapper = new MapperConfiguration(a => a.AddProfile<ClientProfile>()).CreateMapper();
        }

        /// <summary>
        /// 转换成model
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static EditClientViewModel ToModel(this Client entity)
        {
            return Mapper.Map<EditClientViewModel>(entity);
        }
        /// <summary>
        /// 转换成实体
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static Client ToEntity(this ClientModel model)
        {
            return Mapper.Map<Client>(model);
        }
    }
}
