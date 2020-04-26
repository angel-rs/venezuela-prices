import React, { useState } from "react"
import { Box, Link, Image, Skeleton, Badge } from "@chakra-ui/core"

import "./style.css";

export const Product = props => {
  const { product, layout } = props;
  const [imgStyle, setImgStyle] = useState({ display: 'none' })
  const [imageIsReady, setImageIsReady] = useState(false);

  if (!product) {
    return <Skeleton className="product-card" />;
  }

  return (
    <Link href={product.href || "#"} isExternal>
      <Box className="product-card" borderWidth="1px">
        {!imageIsReady && (
          <Skeleton
            width={layout === 'grid' ? "200px" : '110px'}
            height="200px"
            style={{
              display: "flex",
              alignSelf: "center",
              padding: "3em 0",
              margin: "2em 0"
            }}
          />
        )}
        <Image
          src={product.image}
          alt={product.name}
          style={imgStyle}
          onLoad={() => {
            setImageIsReady(true)
            setImgStyle({})
          }}
        />

        <Box className="product-info">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {product.name}{" "}
          </Box>

          <Box>
            {product.price.replace("Bs", "")}
            <Box as="span" color="gray.600" fontSize="sm">
              Bs
            </Box>
          </Box>

          <Badge>{product.from}</Badge>
        </Box>
      </Box>
    </Link>
  );
};
