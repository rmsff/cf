import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import FallbackSuspense from './components/FallbackSuspense';

import { Routes } from './enums/routes.enum';

import 'nprogress/nprogress.css';

export default function App() {
	const Quotes = lazy(() => import('./pages/Quotes'));
	const About = lazy(() => import('./pages/About'));
	const MainLayout = lazy(() => import('./Layouts/MainLayout'));

	return (
		<Suspense fallback={<FallbackSuspense />}>
			<MainLayout>
				<Switch>
					<Route exact path={`/${Routes.About}`} component={About} />;
					<Route exact path={`/${Routes.Quotes}`} component={Quotes} />;
					<Redirect to={`/${Routes.About}`} />
				</Switch>
			</MainLayout>
		</Suspense>
	);
}
