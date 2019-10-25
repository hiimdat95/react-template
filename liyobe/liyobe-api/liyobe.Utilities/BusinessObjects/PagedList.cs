using System.Collections;
using System.Collections.Generic;

namespace liyobe.Utilities.BusinessObjects
{
    /// <summary>
    /// Paged List Meta Information.
    /// </summary>
    public class PagedList<T> : IEnumerable<T>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PagedList{T}"/> class.
        /// </summary>
        /// <param name="input">The input.</param>
        /// <param name="skip">The number of skipped records.</param>
        /// <param name="pageSize">The number records to take.</param>
        /// <param name="totalRecord">The total item count.</param>
        public PagedList(List<T> input, int skip, int pageSize, int totalRecord)
        {
            subset = input;
            Skip = skip;
            PageSize = pageSize;
            TotalRecord = totalRecord;
        }

        /// <summary>
        /// The subset.
        /// </summary>
        private readonly List<T> subset;

        /// <summary>
        /// Gets or sets the number of skipped items.
        /// </summary>
        public int Skip { get; set; }

        /// <summary>
        /// Gets or sets the number items to take.
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Gets or sets the total item count.
        /// </summary>
        public int TotalRecord { get; set; }

        /// <summary>
        ///     Gets the number of elements contained on this page.
        /// </summary>
        public virtual int Count => subset.Count;

        /// <summary>
        /// To the list.
        /// </summary>
        public List<T> ToList()
        {
            return subset;
        }

        /// <summary>
        ///     Returns an enumerator that iterates through the BasePagedList&lt;T&gt;.
        /// </summary>
        /// <returns>A BasePagedList&lt;T&gt;.Enumerator for the BasePagedList&lt;T&gt;.</returns>
        public IEnumerator<T> GetEnumerator()
        {
            return subset.GetEnumerator();
        }

        /// <summary>
        /// Returns an enumerator that iterates through a collection.
        /// </summary>
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
