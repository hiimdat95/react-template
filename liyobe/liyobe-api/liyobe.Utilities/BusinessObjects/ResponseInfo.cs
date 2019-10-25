using System.Net;

namespace liyobe.Utilities.BusinessObjects
{
    public sealed class ResponseInfo
    {
        /// <summary>
        /// Gets or sets original returning HTTP Status Code within the API execution.
        /// </summary>
        public HttpStatusCode Code { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether business Logic Status.
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Gets or sets response Message (e.g. Success message or Error message).
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether returning data always be stored in collection (list) format.
        /// It means, "IsSingleResource = false" by default.
        /// If IsSingleResource = true, the expected data will be found at the first item of the returning list.
        /// </summary>
        public bool IsSingleResource { get; set; }

        /// <summary>
        /// Gets or sets this property is used for paging purpose, presenting for all matching data items belong to a particular business logic.
        /// </summary>
        public int TotalRecord { get; set; }

        /// <summary>
        /// Gets or sets this property is used for paging purpose, presenting for number of items returned.
        /// </summary>
        public int Top { get; set; }

        /// <summary>
        /// Gets or sets this property is used for paging purpose, presenting for number of items skipped before get Top items.
        /// </summary>
        public int Skip { get; set; }

        /// <summary>
        /// Gets or sets supports to indicate newly created resource id.
        /// </summary>
        public string ReturnId { get; set; }

        /// <summary>
        /// Gets or sets original exception object within API execution.
        /// </summary>
        public object InnerEx { get; set; }
    }
}
