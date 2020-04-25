import cheerio from 'cheerio';
import { Config } from 'src/config'

const formatRedemercaData = (pageHTML) => {
	const $ = cheerio.load(pageHTML);

	const selectors = {
		productContainer: 'div[name="Card-Producto"]',
		productImageSrc: '.card-img-top',
		productTitle: 'Descrp',
		productPrice: 'PreU',
	}

	const products = $(selectors.productContainer)

	return products
}

export const scrapRedemerca = async () => {
	const url = `${Config.proxy}https://www.redemerca.com/Productos/Listado`
	const data = await fetch(url)
	const products = formatRedemercaData(data);
	return products
}
