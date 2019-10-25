using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace liyobe.OrdersApi.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        // GET api/values
        [HttpGet, Route("")]
        public ActionResult GetOrders()
        {
            var o1 = new Order("ID1", 2000);
            var o2 = new Order("ID2", 4000);
            return BadRequest(new List<Order> { o1, o2 });
        }
    }

    public class Order
    {
        public string Id { get; set; }
        public decimal Amount { get; set; }
        public Order(string id, decimal amount)
        {
            Id = id;
            Amount = amount;
        }
    }
}
