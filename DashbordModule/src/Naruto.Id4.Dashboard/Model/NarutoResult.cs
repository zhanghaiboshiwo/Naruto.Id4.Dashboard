using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Naruto.Id4.Dashboard.Model
{
    /// <summary>
    /// 返回结果
    /// </summary>
    public abstract class NarutoResult
    {
        public NarutoResult(int _status, string _msg = "", object _data = default, long _recordCount = 0)
        {
            status = _status;
            data = _data;
            recordCount = _recordCount;
            msg = _msg;
        }
        /// <summary>
        /// 数据
        /// </summary>
        public virtual object data { get; set; }

        /// <summary>
        /// 总条数
        /// </summary>
        public virtual long recordCount { get; set; }

        /// <summary>
        /// 消息
        /// </summary>
        public virtual string msg { get; set; }

        /// <summary>
        /// 状态码 0 成功 1 失败
        /// </summary>
        public virtual int status { get; set; }
    }
    /// <summary>
    /// 成功的对象
    /// </summary>
    public class NarutoSuccessResult : NarutoResult
    {
        public NarutoSuccessResult(string _msg = "", object _data = default, long _recordCount = 0) : base(0, _msg, _data, _recordCount)
        {

        }
    }

    /// <summary>
    /// 失败的对象
    /// </summary>
    public class NarutoFailResult : NarutoResult
    {
        public NarutoFailResult(string _msg = "", object _data = default, long _recordCount = 0) : base(1, _msg, _data, _recordCount)
        {

        }
    }
}
