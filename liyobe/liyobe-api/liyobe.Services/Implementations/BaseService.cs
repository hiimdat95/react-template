using AutoMapper;
using liyobe.Infrastructure.Interfaces.IRepository;
using liyobe.Infrastructure.Interfaces.IUnitOfWork;

namespace liyobe.Services.Implementations
{
    public class BaseService<T> where T : class
    {
        protected readonly IAsyncRepository<T, string> _asyncRepository;
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;

        public BaseService(IMapper mapper,
            IAsyncRepository<T, string> asyncRepository,
            IUnitOfWork unitOfWork)

        {
            _asyncRepository = asyncRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
    }
}