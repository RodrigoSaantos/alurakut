import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --background-secondary: #F1F9FE;
    --background-default: #D9E6F6;
    --primary-text: #2E7BB4;
    --secondary-text: #388BB0;
    --tertiary-text: #2F4A71;
    --primary-element: #6F92BB;
    --another-element: #5579A1;
    --gray-1: #333333;
    --gray-2: #5A5A5A;
    --gray-3: #999999;
    --gray-4: #C5C6CA;
    --gray-5: #F4F4F4;
  } 

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: var(--background-default);
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
