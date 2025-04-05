using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;

namespace HZTLHackathon.Models
{
    public class ProductSearchResultItemModel : SearchResultItem
    {
        [IndexField("title")]
        public string Title { get; set; }

        [IndexField("description")]
        public string Description { get; set; }

        [IndexField("category")]
        public string Category { get; set; }

        [IndexField("brand")]
        public string Brand { get; set; }

        [IndexField("price")]
        public double Price { get; set; }

        [IndexField("discountPercentage")]
        public double DiscountPercentage { get; set; }

        [IndexField("rating")]
        public double Rating { get; set; }

        [IndexField("stock")]
        public int Stock { get; set; }

        [IndexField("tags")]
        public List<string> Tags { get; set; }

        [IndexField("images")]
        public List<string> Images { get; set; }
    }
}