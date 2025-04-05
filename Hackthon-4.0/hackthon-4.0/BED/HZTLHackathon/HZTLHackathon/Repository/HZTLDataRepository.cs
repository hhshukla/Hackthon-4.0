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
        private Data HZTLData;
        private List<Data> HZTLDataList;
        public HZTLDataRepository() {
            _database = Sitecore.Context.Database;
            HZTLData = new Data();
            HZTLDataList = new List<Data>();
        }

        public List<Data> GetData()
        {
            try
            {
                Item Data = _database.GetItem("{3CF974A3-6932-47A1-8C02-D7B3E508F2A0}");
                if (Data != null)
                {
                    foreach (Item dataItem in Data.GetChildren())
                    {
                        Data HZTLData = new Data();

                        HZTLData.Id = Convert.ToInt64(Data.Fields["id"]?.Value);
                        HZTLData.Title = Data["title"];
                        HZTLData.Description = Data["description"];
                        HZTLData.Category = Data["category"];
                        HZTLData.Price = Convert.ToDouble(Data.Fields["price"]?.Value);
                        HZTLData.DiscountPr = Convert.ToDouble(Data.Fields["disccountpercentage"]?.Value);
                        HZTLData.Raiting = Convert.ToDouble(Data.Fields["raiting"]?.Value);
                        HZTLData.Brand = Data["brand"];
                        HZTLData.Image = Data["images"];
                        HZTLData.Stock = Convert.ToInt64(Data.Fields["stock"]?.Value);
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