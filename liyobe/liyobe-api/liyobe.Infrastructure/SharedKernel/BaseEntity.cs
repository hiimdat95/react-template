using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace liyobe.Infrastructure.SharedKernel
{
    public abstract class BaseEntity<T>
    {
        [StringLength(128)]
        public T Id { get; set; }

        public List<BaseDomainEvent> Events = new List<BaseDomainEvent>();
    }
}