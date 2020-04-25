import React from 'react';
import {
  Flex,
  Text,
  Divider,
  Badge,
} from '@chakra-ui/core';

import { useWindowSize } from 'src/hooks';
import { Config } from 'src/config';

import { ActionButtons } from './action-buttons/action-buttons.component'
import './header.styles.css';

const breakPoint = 720;

const Header = (props) => {
  const { width } = useWindowSize();

  return (
		<>
			<Flex
				direction="row"
				align="center"
				justify="space-between"
				className="pretty-header"
				{...props}
			>
				<Flex direction="row">
          <Text fontSize={["sm", "md", "lg", "xl", '2xl', '3xl']} style={{ marginRight: 16 }}>
						<span role="img" aria-label="venezuela">
							🇻🇪
						</span>
						{' '}product-prices
					</Text>
          <Badge variant="subtle" variantColor="blue" style={{ height: 'fit-content', margin: 'auto' }}>
            {Config.version}
          </Badge>
				</Flex>

        <ActionButtons isMobile={width < breakPoint} layout={props.layout} toggleLayout={props.toggleLayout}/>
      </Flex>
			<Divider />
		</>
	);
}

export default Header;
