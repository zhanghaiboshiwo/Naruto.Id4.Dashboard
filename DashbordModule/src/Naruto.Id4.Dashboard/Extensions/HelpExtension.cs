﻿using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Naruto.Id4.Dashboard.Extensions
{

    public static class HelpExtension
    {
        public static void IsNotNull(this object source)
        {
            if (source == null)
            {
                throw new ArgumentNullException($"{source.GetType().Name},值不能为空");
            }
        }
        /// <summary>
        /// 验证是否为空
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static bool IsNullOfEmpty(this string source) => string.IsNullOrWhiteSpace(source);

        /// <summary>
        /// sha256编码
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string Sha256Encrypt(this string input)
        {
            if (input.IsNullOfEmpty())
            {
                return string.Empty;
            }
            using (SHA256 sHA = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(input);
                return Convert.ToBase64String(sHA.ComputeHash(bytes));
            }
        }
    }
}
