import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../features/store';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
