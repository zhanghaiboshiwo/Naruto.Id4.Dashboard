using AutoMapper;
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

            CreateMap<ResourcesModel, Entities.ApiResource>()
                .ForMember(a => a.Scopes, b => b.MapFrom(c => c.ApiScopes))
                 .ForMember(a => a.Secrets, b => b.MapFrom(c => c.ApiSecrets));
            CreateMap<ApiScopeDTO, Entities.ApiScope>();
            CreateMap<ApiSecretDTO, Entities.ApiSecret>();

            CreateMap<Entities.ApiSecret, ApiSecretViewModel>()
                .ForMember(source => source.value, taget => taget.MapFrom(b => b.Description))
                .ForMember(source => source.expiration, taget => taget.MapFrom(b => b.Expiration))
                ;

            CreateMap<Entities.ApiScope, ApiScopeViewModel>()
                .ForMember(source => source.description, taget => taget.MapFrom(b => b.Description))
                .ForMember(source => source.displayName, taget => taget.MapFrom(b => b.DisplayName))
                  .ForMember(source => source.name, taget => taget.MapFrom(b => b.Name))
                    .ForMember(source => source.required, taget => taget.MapFrom(b => b.Required))
                ;
            CreateMap<Entities.ApiResource, EditResourcesViewModel>()
              .ForMember(a => a.apiScopes, b => b.MapFrom(c => c.Scopes))
               .ForMember(a => a.apiSecrets, b => b.MapFrom(c => c.Secrets))
                  .ForMember(a => a.description, b => b.MapFrom(c => c.Description))
                     .ForMember(a => a.displayName, b => b.MapFrom(c => c.DisplayName))
                        .ForMember(a => a.enabled, b => b.MapFrom(c => c.Enabled))
                           .ForMember(a => a.id, b => b.MapFrom(c => c.Id))
                            .ForMember(a => a.name, b => b.MapFrom(c => c.Name));

            CreateMap<Entities.ApiScopeClaim, string>()
               .ConstructUsing(x => x.Type)
               .ReverseMap()
               .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src)).ReverseMap();
        }
    }
}
