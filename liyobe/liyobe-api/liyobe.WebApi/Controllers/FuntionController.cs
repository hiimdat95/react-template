using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using liyobe.Services.Interfaces;
using liyobe.Utilities.Constants;
using liyobe.WebApi.Cache;


namespace liyobe.WebApi.Controllers
{
    [Route(RoutesConstant.FunctionApi)]
    [ApiController]
    public class FunctionsController : ControllerBase
    {
        private IFunctionService _functionService;

        public FunctionsController(IFunctionService functionService)
        {
            _functionService = functionService;
        }

        // GET api/values
        [Cached(600)]
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