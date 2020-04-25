import { scrapRedemerca } from './redemerca'
import { scrapBodegon } from './bodegon'

export const scrap = async () => {
	const response = await Promise.all([
		// scrapBodegon(),
		scrapRedemerca(),
	])

	return response;
}
