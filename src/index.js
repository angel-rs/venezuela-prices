import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';

import App from './App';
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
