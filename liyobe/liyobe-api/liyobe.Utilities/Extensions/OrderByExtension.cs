using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace liyobe.Utilities.Extensions
{
    public static class OrderByExtension
    {
        /// <summary>Sorts By field in ascending order or descending according to a key for IQueryable.</summary>
        /// <param name="q">Querry</param>
        /// <param name="sortField">Colunm of field</param>
        /// <param name="isAsc">Ascending</param>
        /// <typeparam name="T"></typeparam>
        public static IQueryable<T> OrderByField<T>(this IQueryable<T> q, string
            sortField, bool isAsc)
        {
            var param = Expression.Parameter(typeof(T), "p");
            var prop = Expression.Property(param, sortField);
            var exp = Expression.Lambda(prop, param);
            string method = isAsc ? "OrderBy" : "OrderByDescending";
            Type[] types = new Type[] { q.ElementType, exp.Body.Type };
            var mce = Expression.Call(typeof(Queryable), method, types,
                q.Expression, exp);
            return q.Provider.CreateQuery<T>(mce);
        }

        /// <summary>Sorts By field in ascending order or descending according to a key for IEnumerable.</summary>
        /// <param name="q">Querry</param>
        /// <param name="sortField">Colunm of field</param>
        /// <param name="isAsc">Ascending</param>
        /// <typeparam name="T"></typeparam>
        public static IEnumerable<T> OrderByField<T>(this IEnumerable<T> source,
                                                    string orderByProperty, bool desc)
        {
            string command = desc ? "OrderBy" : "OrderByDescending";
            var parameter = Expression.Parameter(typeof(T), "p");
            Expression expBody = parameter;
            string[] props = orderByProperty.Split('.');
            foreach (var prop in props)
            {
                expBody = Expression.Property(expBody, prop);
            }
            var property = typeof(T).GetProperty(orderByProperty);
            var orderByExpression = Expression.Lambda(expBody, parameter);
            var resultExpression = Expression.Call(typeof(Queryable), command,
                                                   new[] { typeof(T), orderByExpression.Body.Type },
                                                   source.AsQueryable().Expression,
                                                   Expression.Quote(orderByExpression));
            return source.AsQueryable().Provider.CreateQuery<T>(resultExpression);
        }

        public static void Clear<T>(this DbSet<T> dbSet) where T : class
        {
            dbSet.RemoveRange(dbSet);
        }
    }
}