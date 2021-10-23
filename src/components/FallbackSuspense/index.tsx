import { useEffect } from 'react';
import nprogress from 'nprogress';

nprogress.configure({ showSpinner: false });

export default function Fallback() {
	useEffect(() => {
		nprogress.start();
		return () => {
			nprogress.done();
		};
	}, []);
	return null;
}
