import React, { useEffect, useState } from 'react'
import { Text, Spinner, Box } from '@chakra-ui/core'

import { Layout, Product, SearchBar } from 'src/components'
import { scrap } from 'src/scrapper'

import './style.css'

export const Home = () => {
	const [products, setProducts] = useState([...Array(29)]);
	const [layout, setLayout] = useState(localStorage.getItem('layout') || 'grid')
	const [isSearching, setIsSearching] = useState(false)
	const [search, setSearch] = useState('')

	const toggleLayout = () => {
		if (layout === 'grid') {
			setLayout('list')
			localStorage.setItem('layout', 'list')
		} else {
			setLayout('grid')
			localStorage.setItem('layout', 'grid')
		}
	}

	// useEffect(() => {
	// 	scrap().then((products) => {
	// 		setProducts(products)
	// 	})
	// }, [])

	const headerProps = {
		layout,
		toggleLayout,
	}

	if (!products.length) {
		return (
			<Layout center style={{ flexDirection: 'column' }} headerProps={headerProps}>
				<Spinner />
				<Text>
					Cargando productos...
				</Text>
			</Layout>
		)
	}

	return (
		<Layout id="product-wrapper" className={layout} headerProps={headerProps}>
			<SearchBar onChange={setSearch} />

			<Box className="product-list">
				{products.map((product, index) => (
					<Product key={index} product={product} isLoaded={!isSearching} />
				))}
			</Box>
		</Layout>
	)
}
