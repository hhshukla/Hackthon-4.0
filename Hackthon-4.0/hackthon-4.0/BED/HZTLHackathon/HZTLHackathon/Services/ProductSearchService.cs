using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.ContentSearch.Linq.Utilities;
using Sitecore.ContentSearch;
using HZTLHackathon.Models;

namespace HZTLHackathon.Services
{
    public class ProductSearchService
    {
        public List<Product> SearchProducts(string keyword, string category, string brand, long? minPrice, long? maxPrice)
        {
            List<Product> results = new List<Product>();

            var index = ContentSearchManager.GetIndex("sitecore_master_index"); // Use web or master as needed
            using (var context = index.CreateSearchContext())
            {
                var predicate = PredicateBuilder.True<ProductSearchResultItemModel>();

                if (!string.IsNullOrEmpty(keyword))
                {
                    predicate = predicate.And(p => p.Title.Contains(keyword) || p.Description.Contains(keyword));
                }

                if (!string.IsNullOrEmpty(category))
                {
                    predicate = predicate.And(p => p.Category == category);
                }

                if (!string.IsNullOrEmpty(brand))
                {
                    predicate = predicate.And(p => p.Brand == brand);
                }

                if (minPrice.HasValue)
                {
                    predicate = predicate.And(p => p.Price >= minPrice.Value);
                }

                if (maxPrice.HasValue)
                {
                    predicate = predicate.And(p => p.Price <= maxPrice.Value);
                }

                var query = context.GetQueryable<ProductSearchResultItemModel>()
                    .Where(predicate);

                results = query.Select(p => new Product
                {
                    Title = p.Title,
                    Description = p.Description,
                    Category = p.Category,
                    Brand = p.Brand,
                    Price = Convert.ToDouble(p.Price),
                    DiscountPercentage = p.DiscountPercentage,
                    Rating = p.Rating,
                    Stock = p.Stock,
                    Tags = p.Tags,
                    Images = p.Images
                }).ToList();
            }

            return results;
        }
    }
}