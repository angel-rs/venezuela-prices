import React from "react";
import {
  Box,
  Image,
  Skeleton
} from "@chakra-ui/core";

import './style.css'

export const Product = props => {
  const property = {
    imageUrl: "https://bodegonline.net/wp-content/uploads/2019/12/HYRTTH.jpg",
    imageAlt: "Harina pan",
    title: "Harina pan",
    formattedPrice: "1,900.00",
  };

  if (false) {
    return <Skeleton className="product-card" />;
  }

  return (
    <Box className="product-card" borderWidth="1px">
      <Image src={property.imageUrl} alt={property.imageAlt} width="100%" height="100%" />

      <Box className="product-info">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}{' '}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            Bs
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
