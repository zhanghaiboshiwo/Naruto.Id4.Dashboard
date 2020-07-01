﻿using AutoMapper;
using Naruto.Id4.Dashboard.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.MongoProvider.Mappers.Profiles
{
    /// <summary>
    /// 资源配置
    /// </summary>
    public class ResourcesProfile : Profile
    {
        public ResourcesProfile()
        {

            CreateMap<Entities.ApiResourceProperty, KeyValuePair<string, string>>()
              .ReverseMap();

            //CreateMap<Entities.ApiResource, ResourcesModel>(MemberList.Destination)
            //    .ConstructUsing(src => new IdentityServer4.Models.ApiResource())
            //    .ForMember(x => x.ApiSecrets, opts => opts.MapFrom(x => x.Secrets))
            //    .ReverseMap();

            //CreateMap<Entities.ApiResourceClaim, string>()
            //    .ConstructUsing(x => x.Type)
            //    .ReverseMap()
            //    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ApiSecret, IdentityServer4.Models.Secret>(MemberList.Destination)
            //    .ForMember(dest => dest.Type, opt => opt.Condition(srs => srs != null))
            //    .ReverseMap();

            //CreateMap<Entities.ApiScope, IdentityServer4.Models.Scope>(MemberList.Destination)
            //    .ConstructUsing(src => new IdentityServer4.Models.Scope())
            //    .ReverseMap();

            CreateMap<Entities.ApiScopeClaim, string>()
               .ConstructUsing(x => x.Type)
               .ReverseMap()
               .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src)).ReverseMap();
        }
    }
}
