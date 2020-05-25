using AutoMapper;
using Naruto.Id4.Dashboard.Model;
using Naruto.Id4.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.MongoProvider.Mappers.Profiles
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<ClientModel, Client>();
            CreateMap<Entities.ClientCorsOrigin, string>()
            .ConstructUsing(src => src.Origin)
            .ReverseMap()
            .ForMember(dest => dest.Origin, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ClientIdPRestriction, string>()
            //    .ConstructUsing(src => src.Provider)
            //    .ReverseMap()
            //    .ForMember(dest => dest.Provider, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ClientClaim, Claim>(MemberList.None)
            //    .ConstructUsing(src => new Claim(src.Type, src.Value))
            //    .ReverseMap();

            //CreateMap<Entities.ClientScope, string>()
            //    .ConstructUsing(src => src.Scope)
            //    .ReverseMap()
            //    .ForMember(dest => dest.Scope, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ClientPostLogoutRedirectUri, string>()
            //    .ConstructUsing(src => src.PostLogoutRedirectUri)
            //    .ReverseMap()
            //    .ForMember(dest => dest.PostLogoutRedirectUri, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ClientRedirectUri, string>()
            //    .ConstructUsing(src => src.RedirectUri)
            //    .ReverseMap()
            //    .ForMember(dest => dest.RedirectUri, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ClientGrantType, string>()
            //    .ConstructUsing(src => src.GrantType)
            //    .ReverseMap()
            //    .ForMember(dest => dest.GrantType, opt => opt.MapFrom(src => src));

            //CreateMap<Entities.ClientSecret, IdentityServer4.Models.Secret>(MemberList.Destination)
            //    .ForMember(dest => dest.Type, opt => opt.Condition(srs => srs != null))
            //    .ReverseMap();
        }
    }
}
