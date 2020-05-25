using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Naruto.Id4.Dashboard.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DashbordExtension
    {
        /// <summary>
        /// 注入api
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddNarutoId4DashbordApi(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.Services.AddNarutoIdentityServer4Dashbord();
            //注入mvc扩展
            mvcBuilder.ConfigureApplicationPartManager(a =>
            {
                a.ApplicationParts.Add(new AssemblyPart(typeof(DashbordExtension).Assembly));
            });
            return mvcBuilder;
        }
        /// <summary>
        /// 注入api
        /// </summary>
        /// <param name="mvcBuilder"></param>
        /// <returns></returns>
        public static IMvcCoreBuilder AddNarutoId4DashbordApi(this IMvcCoreBuilder mvcBuilder)
        {
            mvcBuilder.Services.AddNarutoIdentityServer4Dashbord();
            //注入mvc扩展
            mvcBuilder.ConfigureApplicationPartManager(a =>
            {
                a.ApplicationParts.Add(new AssemblyPart(typeof(DashbordExtension).Assembly));
            });
            return mvcBuilder;
        }

        /// <summary>
        /// 注入服务
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        internal static IServiceCollection AddNarutoIdentityServer4Dashbord(this IServiceCollection services)
        {
            services.AddScoped<ClientServices>();
            services.AddScoped<ResourcesServices>();
            return services;
        }
    }
}
