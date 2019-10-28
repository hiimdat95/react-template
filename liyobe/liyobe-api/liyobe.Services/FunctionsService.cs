using AutoMapper;
using AutoMapper.QueryableExtensions;
using liyobe.ApplicationCore.Interfaces;
using liyobe.ApplicationCore.ViewModels.System;
using liyobe.Infrastructure.Interfaces.IRepository;
using liyobe.Infrastructure.Interfaces.IUnitOfWork;
using liyobe.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace liyobe.Services
{
    public class FunctionsService : IFunctionsService
    {
        private IAsyncRepository<Functions, string> _functionRepository;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FunctionsService(IMapper mapper,
            IAsyncRepository<Functions, string> functionRepository,
            IUnitOfWork unitOfWork)
        
        
        {
            _functionRepository = functionRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        //public bool CheckExistedId(string id)
        //{
        //    return _functionRepository.GetByIdAsync(id) != null;
        //}
        public async Task<FunctionListViewModel> GetById(string functionId)
        {
            var function = (await _functionRepository.ListAllAsync()).AsEnumerable().Where(x => x.Id == functionId).FirstOrDefault();
            return _mapper.Map<Functions, FunctionListViewModel>(function);
        }

        public void Add(FunctionListViewModel functionVm)
        {
            var function = _mapper.Map<Functions>(functionVm);
            _functionRepository.AddAsync(function);
        }

        public async void Delete(string functionId)
        {
            await _functionRepository.DeleteAsync((await _functionRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == functionId).FirstOrDefault());
        }

        public async Task<List<FunctionListViewModel>> GetAll()
        {
            var query = await _functionRepository.ListAllAsync();
            return _mapper.Map<List<Functions>, List<FunctionListViewModel>>(query);
        }

        public async Task<IEnumerable<FunctionListViewModel>> GetAllWithParentId(string parentId)
        {
            var configuration = new MapperConfiguration(cfg => cfg.CreateMap<Functions, FunctionListViewModel>());
            var lstFunctionByParent = (await _functionRepository.ListAllAsync()).AsQueryable().Where(x => x.ParentId == parentId).ProjectTo<FunctionListViewModel>(configuration);
            return lstFunctionByParent;
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public async void Update(FunctionListViewModel functionVm)
        {
            var functionDb = (await _functionRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == functionVm.Id).FirstOrDefault();
            var function = _mapper.Map<Functions>(functionVm);
        }

        //public void ReOrder(string sourceId, string targetId)
        //{
        //    var source = _functionRepository.FindById(sourceId);
        //    var target = _functionRepository.FindById(targetId);
        //    int tempOrder = source.SortOrder;

        //    source.SortOrder = target.SortOrder;
        //    target.SortOrder = tempOrder;

        //    _functionRepository.Update(source);
        //    _functionRepository.Update(target);
        //}

        public async void UpdateParentId(string sourceId, string targetId, Dictionary<string, int> items)
        {
            //Update parent id for source
            var category = (await _functionRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == sourceId).FirstOrDefault();
            //var category = _functionRepository.FindById(sourceId);
            category.ParentId = targetId;
            await _functionRepository.UpdateAsync(category);

            //Get all sibling
            var sibling = (await _functionRepository.ListAllAsync()).AsQueryable().Where(x => items.ContainsKey(x.Id));
            foreach (var child in sibling)
            {
                child.SortOrder = items[child.Id];
                await _functionRepository.UpdateAsync(child);
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}