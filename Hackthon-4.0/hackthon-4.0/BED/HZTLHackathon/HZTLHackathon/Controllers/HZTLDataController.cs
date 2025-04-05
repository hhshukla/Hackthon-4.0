using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Channels;
using System.Web;
using System.Web.Mvc;
using HZTLHackathon.Models;
using HZTLHackathon.Repository;
using HZTLHackathon.Services;
using Sitecore.ContentSearch;

namespace HZTLHackathon.Controllers
{
    public class HZTLDataController : Controller
    {
        private HZTLDataRepository hZTLDataRepository;
        private readonly ProductSearchService productSearchService;
        public HZTLDataController()
        {
            hZTLDataRepository=new HZTLDataRepository();
            productSearchService=new ProductSearchService();
        }
        // GET: Default
        public ActionResult Index()
        {

            return Json(new
            {
                status = "success",
                statuscode = "200",
                message = "Request processed successfully.",
                data = hZTLDataRepository.GetData()
,
                
            },JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Search(string keyword=null, string category = null, string brand = null, long? minPrice = null, long? maxPrice = null)
        {
            var result=productSearchService.SearchProducts(keyword, category, brand, minPrice, maxPrice);
            return Json(result,JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index2()
        {

           return View();
        }

        
    }
}