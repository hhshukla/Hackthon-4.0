using HZTLHackathon.App_Start;
using Sitecore.Pipelines;
using System.Web.Routing;

namespace HZTLHackathon.Pipelines
{
    public class LoadRoutes
    {
        public void Process(PipelineArgs args)
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}