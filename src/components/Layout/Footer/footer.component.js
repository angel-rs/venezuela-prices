import React from 'react';
import {
  Flex,
  Link,
} from '@chakra-ui/core';
import { FaGithub } from 'react-icons/fa';

import './footer.styles.css';

const Footer = (props) => {
  return (
		<Flex
			direction="row"
			align="center"
			justify="flex-end"
			className="pretty-footer"
		>

      <Link isExternal href="https://github.com/angel-rs/venezuela-prices" style={{ marginLeft: '1em' }}>
        <FaGithub size="1.5em" />
      </Link>
		</Flex>
	);
}

export default Footer;
