import axios from 'axios'
import { Config } from 'src/config'

const formatRedemercaData = (htmlString) => {
	const parser = new DOMParser();
	const html = parser.parseFromString(htmlString, 'text/html');

	const selectors = {
		productContainer: 'div[name="Card-Producto"]',
		productImageSrc: '.card-img-top',
		productTitle: 'Descrp',
		productPrice: 'PreU',
	}

	const products = html.querySelectorAll(selectors.productContainer)

	return products
}

export const scrapRedemerca = async () => {
	const url = `${Config.proxy}https://www.redemerca.com/Productos/Listado`
	const response = await axios.get(url)
	console.log(response)
	return response;
	// const products = formatRedemercaData(response);
	// return products
}
