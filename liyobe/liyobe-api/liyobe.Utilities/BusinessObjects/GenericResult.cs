using System;
using System.Collections.Generic;
using System.Net;

namespace liyobe.Utilities.BusinessObjects
{
    /// <summary>
    /// Contains returning data and status information from an API execution.
    /// </summary>
    /// <typeparam name="T">Type of returning object/data.</typeparam>
    public sealed class GenericResult<T>
    {
        #region Single Result

        /// <summary>
        /// Gets successful result with default http status code = 200.
        /// </summary>
        public static GenericResult<T> Succeeded => new GenericResult<T>
        {
            Metadata = new ResponseInfo
            {
                Success = true,
                Code = HttpStatusCode.OK
            }
        };

        /// <summary>
        /// Helper to return successful result with an item with default http status code = 200.
        /// </summary>
        /// <param name="item">The item.</param>
        public static GenericResult<T> Succeed(T item)
        {
            return Succeed(item, HttpStatusCode.OK);
        }

        /// <summary>
        /// Helper to return successful result with an item with explicit http status code.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="httpStatusCode">The HTTP status code.</param>
        public static GenericResult<T> Succeed(T item, HttpStatusCode httpStatusCode)
        {
            return Succeed(new List<T> { item }, httpStatusCode, true);
        }

        /// <summary>
        /// Helper to return successful result with an item with default http status code = 200.
        /// </summary>
        /// <param name="itemId">The identifier of item.</param>
        public static GenericResult<T> Succeed(string itemId)
        {
            return new GenericResult<T>
            {
                Metadata = new ResponseInfo
                {
                    Success = true,
                    Code = HttpStatusCode.OK,
                    ReturnId = itemId
                }
            };
        }

        /// <summary>
        /// Helper to return successful result with ReturnId = itemId and set http status code = 200.
        /// </summary>
        /// <param name="itemId">The identifier of item.</param>
        /// <param name="message">Message for metadata.</param>
        public static GenericResult<T> Succeed(string itemId, string message)
        {
            var result = Succeed(itemId);
            result.Metadata.Message = message;
            return result;
        }

        /// <summary>
        /// Helper to return successful result with an item with explicit http status code and meessage.
        /// </summary>
        /// <param name="message">The return message.</param>
        public static GenericResult<T> SucceedWithMessage(string message)
        {
            return new GenericResult<T>
            {
                Metadata = new ResponseInfo
                {
                    Code = HttpStatusCode.OK,
                    Success = true,
                    Message = message
                }
            };
        }

        #endregion

        #region List Result

        /// <summary>
        /// Helper to return successful result with list of items.
        /// </summary>
        /// <param name="itemList">The item list.</param>
        /// <param name="isSingleResource">if set to <c>true</c> [is single resource].</param>
        public static GenericResult<T> Succeed(IEnumerable<T> itemList, bool isSingleResource = false)
        {
            return Succeed(itemList, HttpStatusCode.OK, isSingleResource);
        }

        /// <summary>
        /// Helper to return successful result with list of items and explicit single item result and total records.
        /// </summary>
        /// <param name="itemList">The item list.</param>
        /// <param name="httpStatusCode">The HTTP status code.</param>
        /// <param name="isSingleResource">if set to <c>true</c> [is single resource].</param>
        /// <param name="totalRecord">The total record of the item list.</param>
        public static GenericResult<T> Succeed(IEnumerable<T> itemList, HttpStatusCode httpStatusCode, bool isSingleResource = false, int totalRecord = 0)
        {
            return new GenericResult<T>
            {
                Metadata = new ResponseInfo
                {
                    Code = httpStatusCode,
                    IsSingleResource = isSingleResource,
                    Success = true,
                    TotalRecord = totalRecord
                },
                Results = itemList
            };
        }

        /// <summary>
        /// Helper to return a successful result with required metadata properties for paging controls.
        /// </summary>
        /// <param name="dataList">Result of <see cref="Extensions.QueryExtensions.ToPagedListAsync{T}(System.Linq.IQueryable{T}, int, int)"/>.</param>
        /// <returns>GenericResult with required metadata properties for paging controls.</returns>
        public static GenericResult<T> Succeed(PagedList<T> dataList)
        {
            GenericResult<T> returnModel = Succeed(dataList, false);
            returnModel.Metadata.TotalRecord = dataList.TotalRecord;
            returnModel.Metadata.Skip = dataList.Skip;
            returnModel.Metadata.Top = dataList.PageSize;
            return returnModel;
        }
        #endregion

        #region Failed Results

        /// <summary>
        /// Gets failed result with default http status code = 400.
        /// </summary>
        public static GenericResult<T> BadRequest => Fail(string.Empty, HttpStatusCode.BadRequest);

        /// <summary>
        /// Gets failed result with default http status code = 404.
        /// </summary>
        public static GenericResult<T> NotFound => Fail(string.Empty, HttpStatusCode.NotFound);

        /// <summary>
        /// Gets failed result with default http status code = 204.
        /// </summary>
        public static GenericResult<T> Failed => Fail(string.Empty, HttpStatusCode.NoContent);

        /// <summary>
        /// Gets failed result with a message and default http status code = 400.
        /// </summary>
        /// <param name="message">The message.</param>
        public static GenericResult<T> Fail(string message)
        {
            return Fail(message, HttpStatusCode.BadRequest);
        }

        /// <summary>
        /// Helper to return failed result with a message from exception and default http status code = 400.
        /// </summary>
        /// <param name="ex">The ex.</param>
        public static GenericResult<T> Fail(Exception ex)
        {
            return Fail(ex.Message, HttpStatusCode.BadRequest, ex);
        }

        /// <summary>
        /// Helper to return failed result with a http status code.
        /// </summary>
        /// <param name="code">The code.</param>
        public static GenericResult<T> Fail(HttpStatusCode code)
        {
            return Fail(string.Empty, code);
        }

        /// <summary>
        /// Helper to return failed result with explicit a message and http status code.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="httpStatusCode">The http status code.</param>
        /// <param name="ex">The exception.</param>
        public static GenericResult<T> Fail(string message, HttpStatusCode httpStatusCode, Exception ex = null)
        {
            return new GenericResult<T>
            {
                Metadata = new ResponseInfo
                {
                    InnerEx = ex,
                    Success = false,
                    Message = message,
                    Code = httpStatusCode
                }
            };
        }

        #endregion

        /// <summary>
        /// Gets or sets header information from an API execute action.
        /// </summary>
        public ResponseInfo Metadata { get; set; }

        /// <summary>
        /// Gets or sets data stored in collection (list) format.
        /// </summary>
        public IEnumerable<T> Results { get; set; }
    }
}