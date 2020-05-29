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
            CreateMap<ClientModel, Client>().ReverseMap();

            CreateMap<ClientCorsOrigin, string>()
            .ConstructUsing(src => src.Origin)
            .ReverseMap()
            .ForMember(dest => dest.Origin, opt => opt.MapFrom(src => src)).ReverseMap();

            CreateMap<ClientSecret, string>()
           .ConstructUsing(src => src.Value)
           .ReverseMap()
           .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src)).ReverseMap();

            CreateMap<ClientGrantType, string>()
            .ConstructUsing(src => src.GrantType)
            .ReverseMap()
            .ForMember(dest => dest.GrantType, opt => opt.MapFrom(src => src)).ReverseMap();

            CreateMap<ClientRedirectUri, string>()
            .ConstructUsing(src => src.RedirectUri)
            .ReverseMap()
            .ForMember(dest => dest.RedirectUri, opt => opt.MapFrom(src => src)).ReverseMap();

            CreateMap<ClientPostLogoutRedirectUri, string>()
            .ConstructUsing(src => src.PostLogoutRedirectUri)
            .ReverseMap()
            .ForMember(dest => dest.PostLogoutRedirectUri, opt => opt.MapFrom(src => src)).ReverseMap();

            CreateMap<ClientScope, string>()
           .ConstructUsing(src => src.Scope)
           .ReverseMap()
           .ForMember(dest => dest.Scope, opt => opt.MapFrom(src => src)).ReverseMap();
        }
    }
}
