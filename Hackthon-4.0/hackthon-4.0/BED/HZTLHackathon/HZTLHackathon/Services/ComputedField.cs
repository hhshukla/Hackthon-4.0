using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.ContentSearch.ComputedFields;
using Sitecore.ContentSearch;

namespace HZTLHackathon.Services
{
    public class ComputedField
    {

        public class DecimalComputedField : IComputedIndexField
        {
            public string FieldName { get; set; }
            public string ReturnType { get; set; }
            public object ComputeFieldValue(IIndexable indexable)
            {
                var item = indexable as SitecoreIndexableItem;
                if (item == null) return null;

                string fieldName = FieldName;
                var fieldValue = item.Item[FieldName];

                if (double.TryParse(fieldValue, out var result))
                {
                    return result;
                }

                return 0d;
            }
        }

        public class IntComputedField : IComputedIndexField
        {
            public string FieldName { get; set; }
            public string ReturnType { get; set; }
            public object ComputeFieldValue(IIndexable indexable)
            {
                var item = indexable as SitecoreIndexableItem;
                if (item == null) return null;

                string fieldValue = item.Item[FieldName];

                if (int.TryParse(fieldValue, out var result))
                {
                    return result;
                }

                return 0;
            }
        }
    }
}