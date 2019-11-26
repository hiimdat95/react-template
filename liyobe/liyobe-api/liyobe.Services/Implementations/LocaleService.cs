using AutoMapper;
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
    public class LocaleService : BaseService<Locale>, ILocaleService
    {
        public LocaleService(IMapper mapper,
            IAsyncRepository<Locale, string> functionRepository,
            IUnitOfWork unitOfWork) : base(mapper, functionRepository, unitOfWork)
        {
        }
        public bool CheckExistedId(int id)
        {
            return _asyncRepository.GetByIdAsync(id) != null;
        }

        public async Task<LocaleListViewModel> GetById(string functionId)
        {
            var locale = (await _asyncRepository.ListAllAsync()).AsEnumerable().Where(x => x.Id == functionId).FirstOrDefault();
            return _mapper.Map<Locale, LocaleListViewModel>(locale);
        }

        public void Add(LocaleListViewModel functionVm)
        {
            var locale = _mapper.Map<Locale>(functionVm);
            _asyncRepository.AddAsync(locale);
        }

        public async void Delete(string functionId)
        {
            await _asyncRepository.DeleteAsync((await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == functionId).FirstOrDefault());
        }

        public async Task<List<LocaleListViewModel>> GetAll()
        {
            var query = await _asyncRepository.ListAllAsync();
            return _mapper.Map<List<Locale>, List<LocaleListViewModel>>(query);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public async void Update(LocaleListViewModel functionVm)
        {
            var localeDb = (await _asyncRepository.ListAllAsync()).AsQueryable().Where(x => x.Id == functionVm.Id).FirstOrDefault();
            var locale = _mapper.Map<Locale>(functionVm);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}