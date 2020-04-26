import React, { useEffect, useState } from "react";
import { Text, Spinner, Box } from "@chakra-ui/core";
import LazyLoad from 'react-lazyload'

import { Layout, Product, SearchBar } from "src/components";
import { scrap } from "src/scrapper";

import "./style.css";

export const Home = () => {
  const [products, setProducts] = useState([]);
	const [finishedLoading, setFinishedLoading] = useState(false);
  const [layout, setLayout] = useState(
    localStorage.getItem("layout") || "grid"
  );
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const toggleLayout = () => {
    if (layout === "grid") {
      setLayout("list");
      localStorage.setItem("layout", "list");
    } else {
      setLayout("grid");
      localStorage.setItem("layout", "grid");
    }
  };

  useEffect(() => {
    scrap(setProducts).then(() => setFinishedLoading(true));
  }, []);

  const headerProps = {
    layout,
    toggleLayout
  };

  if (!products.length) {
    return (
      <Layout
        center
        style={{ flexDirection: "column" }}
        headerProps={headerProps}
      >
        <Spinner />
        <br />
        <Text>Cargando productos...</Text>
      </Layout>
    );
  }

	const filterBySearch = ({ name }) => {
		if (search === "") {
			return true;
		}
		if (name.toLowerCase().includes(search.toLowerCase())) {
			return true;
		}
		return false;
	}

  const productsToRender = products
    .filter(filterBySearch)
    .map((product, index) => (
			<LazyLoad height={layout === 'grid' ? 300 : 112} offset={200} once>
      	<Product key={product.href} layout={layout} product={product} isLoaded={!isSearching} />
			</LazyLoad>
    ));

  return (
    <Layout id="product-wrapper" className={layout} headerProps={headerProps}>
			<br />

			<Box d="flex" alignItems="center" justifyContent="center">
				{!finishedLoading && (
					<Spinner size="xs" style={{ marginRight: '1em' }}/>
				)}
	      <Text>
	        ({products.length}) Productos
	      </Text>
				<br />
			</Box>

			<Box d="flex" alignItems="center" justifyContent="center">
				{search !== '' && (
					<Text>
						({products.filter(filterBySearch).length}) Coincidencias
					</Text>
				)}
			</Box>

      <br />

      <SearchBar onChange={setSearch} />

			<br />
			<br />

      <Box className="product-list">{productsToRender}</Box>
    </Layout>
  );
};
