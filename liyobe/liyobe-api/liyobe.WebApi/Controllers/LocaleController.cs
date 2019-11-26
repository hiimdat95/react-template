using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using liyobe.Services.Interfaces;
using liyobe.Utilities.Constants;
using liyobe.WebApi.Cache;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace liyobe.WebApi.Controllers
{
    [Route(RoutesConstant.LocaleApi)]
    [ApiController]
    public class LocaleController : ControllerBase
    {
        private readonly ILocaleService _localeService;
        public LocaleController(ILocaleService localeService)
        {
            _localeService = localeService;
        }
        // GET api/values
        [Cached(600)]
        [HttpGet]
        [Route(RoutesConstant.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _localeService.GetAll());
        }

        [HttpGet]
        [Route(RoutesConstant.Detail)]
        public async Task<IActionResult> Detail(string functionId)
        {
            return Ok(await _localeService.GetById(functionId));
        }
    }
}