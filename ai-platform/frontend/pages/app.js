import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // Inicjalizacja Bootstrap JS po stronie klienta
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;