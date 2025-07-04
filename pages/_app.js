// import "@/styles/globals.css";
// import { AppProvider } from "../context/AppContext";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
// pages/_app.js
import { AppProvider } from "../context/AppContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
