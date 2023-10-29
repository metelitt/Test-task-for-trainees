import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider, useTheme } from './assets/ThemeContext';

const customThemeLight = extendTheme({
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
  },
});
const customThemeDark = extendTheme({
  colors: {
    primary: '#8e44ad',
    secondary: '#e74c3c',
  },
});
const ChakraThemeSetter = ({ customThemeLight, customThemeDark, children }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? customThemeDark : customThemeLight;
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
const rootElem = document.getElementById('root');
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <ThemeProvider>
        <ChakraThemeSetter
          customThemeLight={customThemeLight}
          customThemeDark={customThemeDark}>
          <App />
        </ChakraThemeSetter>
      </ThemeProvider>
    </Provider>,
  );
}
