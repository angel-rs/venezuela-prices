import React, { useEffect, useState } from "react";
import { Text, Spinner, Box } from "@chakra-ui/core";
import { FiWifiOff } from 'react-icons/fi'
import LazyLoad from 'react-lazyload'

import { Layout, Product, SearchBar } from "src/components";
import { scrap } from "src/scrapper";

import "./style.css";

export const Home = () => {
  const [products, setProducts] = useState([]);
	const [error, setError] = useState(false)
	const [finishedLoading, setFinishedLoading] = useState(false);
  const [layout, setLayout] = useState(
    localStorage.getItem("layout") || "grid"
  );
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
    scrap(setProducts).then(() => setFinishedLoading(true)).catch(() => {
			setError(true)
			setFinishedLoading(true)
		});
  }, []);

  const headerProps = {
    layout,
    toggleLayout
  };

	if (error) {
		return (
      <Layout
        center
        style={{ flexDirection: "column" }}
        headerProps={headerProps}
      >
				<FiWifiOff color="red" />
				<br />
        <Text>Parece ser que no tiene conexión a internet</Text>
				<Text>Intente de nuevo más tarde</Text>
      </Layout>
    );
	}

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
      	<Product key={product.href} layout={layout} product={product} />
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
