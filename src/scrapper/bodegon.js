import cheerio from "cheerio";
import { Config } from "src/config";

const formatRedemercaData = pageHTML => {
  const $ = cheerio.load(pageHTML);

  const selectors = {
    productContainer: ".product_item--inner",
    productImageSrc: ".attachment-woocommerce_thumbnail", // src
    productTitle: ".product_item--title", // innerText
    productPrice: ".woocommerce-Price-amount" // innerText (remove "Bs")
  };

  const products = $(selectors.productContainer);

  return products.map(product => ({
    name: $(product, selectors.productTitle),
    price: $(product, selectors.productPrice),
    image: $(product, selectors.productImageSrc)
  }));
};

export const scrapBodegon = async () => {
  const data = [];
  let page = 1;
  let shouldScrap = true;

  while (shouldScrap) {
    const url = `${Config.proxy}https://bodegonline.net/shop/page/PAGE_NUMBER/?per_page=100`.replace(
      "PAGE_NUMBER",
      page
    );

    try {
      const response = await fetch(url);

			if (response.status === 200) {
        const formattedData = formatRedemercaData(response);
        data.push(response);
        page += 1;
			} else {
        shouldScrap = false;
			}
    } catch (e) {
      shouldScrap = false;
    }
  }

  return data;
};
