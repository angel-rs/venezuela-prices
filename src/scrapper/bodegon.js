import axios from 'axios'
import { Config } from "src/config";

const formatRedemercaData = htmlString => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  const selectors = {
    productContainer: ".product_item--inner",
    productImageSrc: ".attachment-woocommerce_thumbnail",
    productTitle: ".product_item--title",
    productPrice: ".woocommerce-Price-amount",
    productHref: '.woocommerce-LoopProduct-link'
  };

  const products = html.querySelectorAll(selectors.productContainer);

  const formattedProducts = [...products].map(product => ({
    name: product.querySelector(selectors.productTitle).innerText,
    price: product.querySelector(selectors.productPrice).innerText,
    image: product.querySelector(selectors.productImageSrc).getAttribute('src'),
    href: product.querySelector(selectors.productHref).getAttribute('href'),
    from: 'BodegOnline'
  }))

  return formattedProducts;
};

export const scrapBodegon = async (updateProducts) => {
  let page = 1;
  let shouldScrap = true;

  while (shouldScrap) {
    const url = `${Config.proxy}https://bodegonline.net/shop/page/PAGE_NUMBER/?per_page=30&currency=Bs`.replace(
      "PAGE_NUMBER",
      page
    );

    try {
      const response = await axios.get(url);

			if (response.status === 200) {
        const formattedData = formatRedemercaData(response.data);
        updateProducts(prevProducts => [
          ...prevProducts,
          ...formattedData
        ])
        page += 1;
			} else {
        shouldScrap = false;
			}
    } catch (e) {
      shouldScrap = false;
    }
  }
};
