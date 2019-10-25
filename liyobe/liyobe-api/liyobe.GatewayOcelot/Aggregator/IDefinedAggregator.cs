using Ocelot.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace liyobe.GatewayOcelot.Aggregator
{
    public interface IDefinedAggregator
    {
        Task<DownstreamResponse> Aggregate(List<DownstreamResponse> responses);
    }
}
