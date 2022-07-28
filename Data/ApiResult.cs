using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using System.Reflection;
using BeerProject.Models;

namespace BeerProject.Data
{
    public class ApiResult<T>
    {
        private ApiResult( IQueryable<T> data, int count, int pageIndex, int pageSize, string sortColumn,string sortOrder,string filterColumn,
 string filterQuery)
        {
            Data = data;
            TotalCount = count;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            SortColumn = sortColumn;
            SortOrder = sortOrder;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;
        }
        
        public static async Task<ApiResult<T>> CreateAsync(IQueryable<T> source,int pageIndex,int pageSize, string sortColumn = null,
 string sortOrder = null, string filterColumn = null,string filterQuery = null)
        {



          
            var count = await source.CountAsync();

            if (!string.IsNullOrEmpty(sortColumn) && IsValidProperty(sortColumn))
            {
                sortOrder = !String.IsNullOrEmpty(sortOrder)
                && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
                source = source.OrderBy(
                string.Format("{0} {1}", sortColumn, sortOrder));
            }
            source = source.Skip(pageSize * pageIndex).Take(pageSize);
//#if DEBUG
//            {


//                var sql = source.ToSql();
//                // do something with the sql string
//            }
//#endif
      
            //if (isFullInf)
            //{
            //    data = await source.Select(b => BeerFullDTO.Create(b)).ToListAsync();
            //}
            //else
            //{
            //    data = await source.Select(b => BeerDTO.Create(b)).ToListAsync();
            //}



            return new ApiResult<T>(source, count, pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
        }
        public string FilterColumn { get; set; }
        public string FilterQuery { get; set; }
        public static bool IsValidProperty(string propertyName, bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                String.Format(
                "ERROR: Property '{0}' does not exist.",
                propertyName)
                );
            return prop != null;
        }

        public string SortColumn { get; set; }
        /// <summary>
        /// Sorting Order ("ASC", "DESC" or null if none set)
        /// </summary>
        public string SortOrder { get; set; }
        public IQueryable<T> Data { get; private set; }
        /// <summary>
        /// Zero-based index of current page.
        /// </summary>
        public int PageIndex { get; private set; }
        public int PageSize { get; private set; }
        /// <summary>
        /// Total items count
        /// </summary>
        public int TotalCount { get; private set; }
        /// <summary>
        /// Total pages count
        /// </summary>
        public int TotalPages { get; private set; }
        /// <summary>
        /// TRUE if the current page has a previous page,
        /// FALSE otherwise.
        /// </summary>
        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }
        /// <summary>
        /// TRUE if the current page has a next page, FALSE otherwise.
        /// </summary>
        public bool HasNextPage
        {
            get
            {
                return ((PageIndex + 1) < TotalPages);
            }
        }
    }
}
