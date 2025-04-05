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
        public List<Data> SearchProducts(string keyword, string category, string brand, long? minPrice, long? maxPrice)
        {
            var index = ContentSearchManager.GetIndex("sitecore_web_index");

            using (var context = index.CreateSearchContext())
            {
                var predicate = PredicateBuilder.True<Data>();

                if (!string.IsNullOrWhiteSpace(keyword))
                    predicate = predicate.And(p => p.Title.Contains(keyword) || p.Description.Contains(keyword));

                if (!string.IsNullOrWhiteSpace(category))
                    predicate = predicate.And(p => p.Category == category);

                if (!string.IsNullOrWhiteSpace(brand))
                    predicate = predicate.And(p => p.Brand == brand);

                if (minPrice.HasValue)
                    predicate = predicate.And(p => p.Price >= minPrice.Value);

                if (maxPrice.HasValue)
                    predicate = predicate.And(p => p.Price <= maxPrice.Value);

                return context.GetQueryable<Data>()
                              .Where(predicate)
                              .ToList();
            }
        }
    }
}