using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HZTLHackathon.Models;
using Sitecore.Data;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;

namespace HZTLHackathon.Repository
{
    public class HZTLDataRepository
    {
        private readonly Database _database;
        private readonly Product HZTLData;
        private readonly List<Product> HZTLDataList;
        public HZTLDataRepository() {
            _database = Sitecore.Context.Database;
            HZTLData = new Product();
            HZTLDataList = new List<Product>();
        }

        public List<Product> GetData()
        {
            try
            {
                Item Data = _database.GetItem("{7F3C1BA2-22AD-47D7-BF61-AFD57D87B7EE}");
                if (Data != null)
                {
                    foreach (Item dataItem in Data.GetChildren())
                    {
                        Product HZTLData = new Product();
                        
                        HZTLData.Id = Convert.ToInt32(dataItem.Fields["Id"]?.Value);
                        HZTLData.Title = dataItem.Fields["title"]?.Value.ToString();
                        HZTLData.Description = dataItem.Fields["description"]?.Value.ToString();
                        HZTLData.Category = dataItem.Fields["category"]?.Value.ToString();
                        HZTLData.Price = Convert.ToDouble(dataItem.Fields["price"]?.Value.ToString());
                        HZTLData.DiscountPercentage = Convert.ToDouble(dataItem.Fields["discountPercentage"]?.Value.ToString());
                        HZTLData.Rating = Convert.ToDouble(dataItem.Fields["rating"]?.Value.ToString());
                        HZTLData.Brand = dataItem.Fields["brand"]?.Value.ToString();
                        var imagesRaw = dataItem.Fields["images"]?.Value;
                        if (!string.IsNullOrWhiteSpace(imagesRaw))
                        {
                            HZTLData.Images = imagesRaw.Split('|').ToList();
                        }

                        // For tags
                        var tagsRaw = dataItem.Fields["Tags"]?.Value;
                        if (!string.IsNullOrWhiteSpace(tagsRaw))
                        {
                            HZTLData.Tags = tagsRaw.Split('|').ToList();
                        }
                        HZTLData.Stock = Convert.ToInt32(dataItem.Fields["stock"]?.Value.ToString());
                        HZTLDataList.Add(HZTLData);
                    }
                    return HZTLDataList;
                }
                else
                {
                    Log.Warn("Data is null. Check if the datasource item exists.", this);
                }



            }
            catch (Exception ex)
            {
                Log.Error("Error in DataRepository: " + ex.Message, ex, this);
            }
            return HZTLDataList;
        }
    }
}