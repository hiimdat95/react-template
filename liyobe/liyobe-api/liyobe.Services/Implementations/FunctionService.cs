using AutoMapper;
using AutoMapper.QueryableExtensions;
using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Infrastructure.Interfaces.IRepository;
using liyobe.Infrastructure.Interfaces.IUnitOfWork;
using liyobe.Models.Entities;
using liyobe.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace liyobe.Services.Implementations
{
    public class FunctionService : BaseService<Function>, IFunctionService
    {
        //private IAsyncRepository<Function, string> _asyncRepository;
        //private IUnitOfWork _unitOfWork;
        //private readonly IMapper _mapper;

        //public FunctionService(IMapper mapper,
        //    IAsyncRepository<Function, string> functionRepository,
        //    IUnitOfWork unitOfWork)

        //{
        //    _asyncRepository = functionRepository;
        //    _unitOfWork = unitOfWork;
        //    _mapper = mapper;
        //}
        public FunctionService(IMapper mapper,
            IAsyncRepository<Function, string> functionRepository,
            IUnitOfWork unitOfWork) : base(mapper, functionRepository, unitOfWork)
        {
        }

        public bool CheckExistedId(int id)
        {
            return _asyncRepository.GetByIdAsync(id) != null;
        }

        public async Task<FunctionListViewModel> GetById(string functionId)
        {
            var function = (await _asyncRepository.ListAllAsync()).AsEnumerable().Where(x => x.Id == functionId).FirstOrDefault();
            return _mapper.Map<Function, FunctionListViewModel>(function);
        }

        public void Add(FunctionListViewModel functionVm)
        {
            var function = _mapper.Map<Function>(functionVm);
            _asyncRepository.AddAsync(function);
        }

        public async void Delete(string functionId)
        {
            await _asyncRepository.DeleteAsync((await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == functionId).FirstOrDefault());
        }

        public async Task<List<FunctionListViewModel>> GetAll()
        {
            var query = await _asyncRepository.ListAllAsync();
            return _mapper.Map<List<Function>, List<FunctionListViewModel>>(query);
        }

        public async Task<IEnumerable<FunctionListViewModel>> GetAllWithParentId(string parentId)
        {
            var configuration = new MapperConfiguration(cfg => cfg.CreateMap<Function, FunctionListViewModel>());
            var lstFunctionByParent = (await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => x.ParentId == parentId).ProjectTo<FunctionListViewModel>(configuration);
            return lstFunctionByParent;
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public async void Update(FunctionListViewModel functionVm)
        {
            var functionDb = (await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == functionVm.Id).FirstOrDefault();
            var function = _mapper.Map<Function>(functionVm);
        }

        //public void ReOrder(string sourceId, string targetId)
        //{
        //    var source = _asyncRepository.FindById(sourceId);
        //    var target = _asyncRepository.FindById(targetId);
        //    int tempOrder = source.SortOrder;

        //    source.SortOrder = target.SortOrder;
        //    target.SortOrder = tempOrder;

        //    _asyncRepository.Update(source);
        //    _asyncRepository.Update(target);
        //}

        public async void UpdateParentId(string sourceId, string targetId, Dictionary<string, int> items)
        {
            //Update parent id for source
            var category = (await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == sourceId).FirstOrDefault();
            //var category = _asyncRepository.FindById(sourceId);
            category.ParentId = targetId;
            await _asyncRepository.UpdateAsync(category);

            //Get all sibling
            var sibling = (await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => items.ContainsKey(x.Id));
            foreach (var child in sibling)
            {
                child.SortOrder = items[child.Id];
                await _asyncRepository.UpdateAsync(child);
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}