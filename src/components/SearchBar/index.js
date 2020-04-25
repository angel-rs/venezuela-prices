import React from "react";
import { InputGroup, Input, InputLeftElement, Icon } from "@chakra-ui/core";

import "./styles.css";

export const SearchBar = props => {
  return (
    <InputGroup id="search-bar">
      <InputLeftElement children={<Icon name="search-2" color="gray.300" />} />
      <Input
        placeholder="Buscar"
        onChange={({ target }) => props.onChange(target.value)}
      />
    </InputGroup>
  );
};
