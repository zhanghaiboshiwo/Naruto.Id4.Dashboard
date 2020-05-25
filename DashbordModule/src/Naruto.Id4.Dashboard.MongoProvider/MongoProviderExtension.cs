using Naruto.Id4.Dashboard.MongoProvider;
using Naruto.Id4.Dashboard.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class MongoProviderExtension
    {
        /// <summary>
        /// 注入api
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddNarutoId4DashbordApiMongoProvider(this IMvcBuilder mvcBuilder, Action<DashbordMongoContext> action)
        {
            mvcBuilder.Services.AddStorageServices(action);
            mvcBuilder.AddNarutoId4DashbordApi();
            return mvcBuilder;
        }
        /// <summary>
        /// 注入api
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcCoreBuilder AddNarutoId4DashbordApiMongoProvider(this IMvcCoreBuilder mvcBuilder, Action<DashbordMongoContext> action)
        {
            mvcBuilder.Services.AddStorageServices(action);
            mvcBuilder.AddNarutoId4DashbordApi();
            return mvcBuilder;
        }

        internal static IServiceCollection AddStorageServices(this IServiceCollection services,Action<DashbordMongoContext> action)
        {
            services.AddMongoServices();
            services.AddMongoContext(action);
            services.AddScoped<IClientStorage, MongoDBClientStorage>();
            services.AddScoped<IResourcesStorage, MongoDBResourcesStorage>();
            return services;
        }
    }
}
