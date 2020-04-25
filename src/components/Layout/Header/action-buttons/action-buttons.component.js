import React from 'react';
import {
  Flex,
  useColorMode,
} from '@chakra-ui/core';
import {
  FiList,
  FiGrid,
} from 'react-icons/fi';

import { ActionButton } from './action-button/action-button.component'

const ActionButtons = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const common = {
    size: 'lg',
    variant: 'ghost',
  }
  const actionButtons = [
    {
      ...common,
      isCircle: true,
      label: 'Cambiar formato',
      Icon: props.layout === 'grid' ? FiGrid : FiList,
      onClick: props.toggleLayout,
    },
    {
      ...common,
      isCircle: true,
      variant: 'outline',
      label: 'Cambiar tema',
      Icon: colorMode === 'light' ? 'moon' : 'sun',
      onClick: toggleColorMode,
      variantColor: colorMode === 'light' ? 'purple' : 'yellow',
      color: colorMode === 'light' ? '#805ad5' : '#faf089'
    },
  ];

  return (
    <Flex direction="row">
      {actionButtons.map((actionButton) => (
        <ActionButton
          key={actionButton.label}
          isMobile={false}
          {...actionButton}
        />
      ))}
    </Flex>
  )
}

export { ActionButtons }
