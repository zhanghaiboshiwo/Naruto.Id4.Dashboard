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
           .ConstructUsing(src => src.Description)
           .ReverseMap()
           .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src))
           .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src))
           .ReverseMap();

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


            CreateMap<Client, EditClientViewModel>()
                .ForMember(dest=>dest.id,opt=>opt.MapFrom(src=>src.Id))
                .ForMember(dest => dest.identityTokenLifetime, opt => opt.MapFrom(src => src.IdentityTokenLifetime))
                .ForMember(dest => dest.accessTokenLifetime, opt => opt.MapFrom(src => src.AccessTokenLifetime))
                .ForMember(dest => dest.clientId, opt => opt.MapFrom(src => src.ClientId))
                .ForMember(dest => dest.clientName, opt => opt.MapFrom(src => src.ClientName))
                .ForMember(dest => dest.description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.allowedCorsOrigins, opt => opt.MapFrom(src => src.AllowedCorsOrigins))
                .ForMember(dest => dest.allowedGrantTypes, opt => opt.MapFrom(src => src.AllowedGrantTypes))
                .ForMember(dest => dest.allowedScopes, opt => opt.MapFrom(src => src.AllowedScopes))
                .ForMember(dest => dest.postLogoutRedirectUris, opt => opt.MapFrom(src => src.PostLogoutRedirectUris))
                .ForMember(dest => dest.redirectUris, opt => opt.MapFrom(src => src.RedirectUris))
                .ForMember(dest => dest.clientSecrets, opt => opt.MapFrom(src => src.ClientSecrets))
                ;
        }
    }
}
