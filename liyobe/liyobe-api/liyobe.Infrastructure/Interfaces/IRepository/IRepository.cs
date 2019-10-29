using liyobe.Infrastructure.Interfaces.ISpecification;
using System.Collections.Generic;

namespace liyobe.Infrastructure.Interfaces.IRepository
{
    public interface IRepository<T, K> where T : class
    {
        T GetById(int id);

        T GetSingleBySpec(ISpecification<T> spec);

        IEnumerable<T> ListAll();

        IEnumerable<T> List(ISpecification<T> spec);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}