function parseSquareCatalog(catalog) {
    if (!catalog || !catalog.objects) {
      return [];
    }
  
    // Filter only the ITEM objects
    const itemObjects = catalog.objects.filter((obj) => obj.type === "ITEM");
  
    // Map and reshape each item
    return itemObjects.map((item) => {
      const { itemData } = item;
      const name = itemData?.name || "";
      const description = itemData?.description || "";
      const imageIds = itemData?.imageIds || [];
  
      const variations = (itemData?.variations || []).map((variation) => {
        const vData = variation.itemVariationData || {};
        const priceMoney = vData.priceMoney || {};
  
        // Convert BigInt to string if needed
        const amount =
          typeof priceMoney.amount === "bigint"
            ? priceMoney.amount.toString()
            : priceMoney.amount;
  
        return {
          variationId: variation.id,
          variationName: vData.name,
          sku: vData.sku,
          priceAmount: amount || null,
          priceCurrency: priceMoney.currency || null,
        };
      });
  
      return {
        itemId: item.id,
        itemName: name,
        itemDescription: description,
        variations,
        imageIds,
      };
    });
  }
  
  module.exports = parseSquareCatalog;