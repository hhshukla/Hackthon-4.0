using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using Sitecore.ContentSearch;
//using Sitecore.ContentSearch.SearchTypes;

namespace HZTLHackathon.Models
{
    public class Data
    {
        //[IndexField("id")]
        public long Id {  get; set; }

        //[IndexField("title")]
        public string Title {  get; set; }

        //[IndexField("description")]
        public string Description {  get; set; }

        //[IndexField("category")]
        public string Category { get; set; }

        //[IndexField("price")]
        public double Price {  get; set; }

        //[IndexField("discountpr")]
        public double DiscountPr {  get; set; }

        //[IndexField("raiting")]
        public double Raiting {  get; set; }

        //[IndexField("stock")]
        public long Stock {  get; set; }

        //[IndexField("brand")]
        public string Brand {  get; set; }

        //[IndexField("image")]
        public string Image {  get; set; }
    }
}