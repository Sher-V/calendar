import React from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useApollo } from "../apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";

const App = ({ Component, pageProps }) => {
  const client = useApollo();

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Component {...pageProps} />
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;
