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
        [Route(RoutesConstant.FunctionGetAll)]
        public async Task<IActionResult> GetAll()
        {
            var listFunction = await _functionService.GetAll();
            return Ok(listFunction);
        }
        [HttpGet]
        [Route(RoutesConstant.FunctionDetail)]
        public async Task<IActionResult> Detail(string functionId)
        {
            var function = await _functionService.GetById(functionId);
            return Ok(function);
        }
    }
}