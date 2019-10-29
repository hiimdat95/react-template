using liyobe.ApplicationCore.Interfaces;
using liyobe.Utilities.Constants;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
        [Route( RoutesConstant.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            var listFunction = await _functionService.GetAll();
            return Ok(listFunction);
        }

        [HttpGet]
        [Route( RoutesConstant.Detail)]
        public async Task<IActionResult> Detail(string functionId)
        {
            var function = await _functionService.GetById(functionId);
            return Ok(function);
        }
    }
}