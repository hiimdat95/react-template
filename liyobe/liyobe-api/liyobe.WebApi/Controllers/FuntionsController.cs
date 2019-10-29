using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using liyobe.ApplicationCore.Interfaces;
using liyobe.Services;
using liyobe.Utilities.Constants;
using Microsoft.AspNetCore.Mvc;

namespace liyobe.WebApi.Controllers
{
    [Route(RoutesConstant.FunctionApi)]
    [ApiController]
    public class FunctionsController : ControllerBase
    {
        private IFunctionsService _functionService;

        public FunctionsController(IFunctionsService functionService)
        {
            _functionService = functionService;
        }

        // GET api/values
        [HttpGet]
        [Route(RoutesConstant.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _functionService.GetAll());
        }
        [HttpGet]
        [Route(RoutesConstant.Detail)]
        public async Task<IActionResult> Detail(string functionId)
        {
            return Ok(await _functionService.GetById(functionId));
        }
    }
}