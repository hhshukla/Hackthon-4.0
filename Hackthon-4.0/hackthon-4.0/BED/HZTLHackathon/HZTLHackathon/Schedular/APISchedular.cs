using System;
using Sitecore.Configuration;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Publishing;
using Sitecore.Tasks;
using Sitecore.Express;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;



namespace HZTLHackathon.Schedular
{
	public class APISchedular
    {
        public async void Execute(Item[] items, Sitecore.Tasks.CommandItem commandItem, ScheduleItem scheduleItem)
        {
            try
            {
                if (items.Length == 0)
                    return;
                Log.Info("Scheduler Started", this);
                Database dbMaster = Factory.GetDatabase("master");
                Database dbWeb = Factory.GetDatabase("web");
                Item parentItem = items[1];
                if (parentItem == null)
                    return;
                var products = await FetchProductsFromApi();
                foreach (var product in products)
                {
                    string itemName = "Product_" + product.Id;
                    Item newItem = parentItem.Add(itemName, new TemplateID(items[0].ID));
                    if (newItem != null)
                    {
                        newItem.Editing.BeginEdit();
                        newItem.Fields["Id"].Value = product.Id.ToString();
                        newItem.Fields["title"].Value = product.Title;
                        newItem.Fields["description"].Value = product.Description;
                        newItem.Fields["category"].Value = product.Category;
                        newItem.Fields["price"].Value = product.Price.ToString();
                        newItem.Fields["discountPercentage"].Value = product.DiscountPercentage.ToString();
                        newItem.Fields["rating"].Value = product.Rating.ToString();
                        newItem.Fields["stock"].Value = product.Stock.ToString();
                        newItem.Fields["brand"].Value = product.Brand;
                        newItem.Fields["Tags"].Value = string.Join("|", product.Tags);
                        newItem.Fields["images"].Value = string.Join("|", product.Images);
                        newItem.Editing.EndEdit();
                        PublishItemToWeb(newItem, dbMaster, dbWeb);
                        Log.Info($"Created and Published: {itemName}", this);
                    }
                }
                Log.Info("Scheduler Ended", this);
            }
            catch (Exception e)
            {
                Log.Error("Scheduler Exception: " + e.Message, this);
            }
        }
        // Fetch products from the API
        private async Task<List<Product>> FetchProductsFromApi()
        {
            try
            {
                var request = WebRequest.Create("https://dummyjson.com/products");
                request.Method = "GET";
                using (var response = await request.GetResponseAsync())
                using (var stream = response.GetResponseStream())
                using (var reader = new StreamReader(stream))
                {
                    var jsonResponse = await reader.ReadToEndAsync();
                    var apiResponse = JsonConvert.DeserializeObject<ApiResponse>(jsonResponse);
                    return apiResponse.Products ?? new List<Product>();
                }
            }
            catch (Exception ex)
            {
                Log.Error("Error fetching products: " + ex.Message, this);
                return new List<Product>();
            }
        }
        // Publish item to the web database
        private void PublishItemToWeb(Item item, Database dbMaster, Database dbWeb)
        {
            PublishOptions options = new PublishOptions(dbMaster, dbWeb, PublishMode.SingleItem, Sitecore.Context.Language, DateTime.Now)
            {
                RootItem = item,
                Deep = false
            };
            (new Publisher(options)).Publish();
        }
    }
}
