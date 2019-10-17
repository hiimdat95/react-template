using System.Collections.Generic;

namespace liyobe.Infrastructure.Interfaces.IRepository
{
    public interface IRepository<T> where T : BaseEntity<T>
    {
        T GetById(int id);

        T GetSingleBySpec(ISpecification<T> spec);

        IEnumerable<T> ListAll();

        IEnumerable<T> List(ISpecification<T> spec);

        T Add(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}