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

        [HttpGet]
        public JsonResult GetProducts(string query = "", string category = "", double? minPrice = null, double? maxPrice = null)
        {
            var response = new ApiResponse
            {
                Products = new List<Product>()
            };
            var index = ContentSearchManager.GetIndex("sitecore_web_index");
            var context = index.CreateSearchContext();
            var productQuery = context.GetQueryable<Product>()
                .Where(x => string.IsNullOrEmpty(query) || x.Title.Contains(query) || x.Description.Contains(query));
            // Apply category filter if specified
            if (!string.IsNullOrEmpty(category))
            {
                productQuery = productQuery.Where(x => x.Category == category);
            }
            // Apply price range filter if specified
            if (minPrice.HasValue)
            {
                productQuery = productQuery.Where(x => x.Price >= minPrice.Value);
            }
            if (maxPrice.HasValue)
            {
                productQuery = productQuery.Where(x => x.Price <= maxPrice.Value);
            }
            // Execute the query and take the top 20 results
            var products = productQuery.Take(20).ToList();
            // Map the query results to the ApiResponse model
            response.Products = products.Select(x => new Product
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Category = x.Category,
                Price = x.Price,
                DiscountPercentage = x.DiscountPercentage,
                Rating = x.Rating,
                Stock = x.Stock,
                Brand = x.Brand,
                Tags = x.Tags,
                Images = x.Images
            }).ToList();
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}