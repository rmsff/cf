import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Toolbar, Button, Box } from '@mui/material';

import quotesState from '../store/Quotes';

import { Routes } from '../enums/routes.enum';
import { ETabsValue } from '../enums/index.enum';

interface IProps {
	children: ReactNode;
}

function Header() {
	const location = useLocation();

	return (
		<header>
			<Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '20px' }}>
				{quotesState.isError && <span>Ошибка!</span>}
			</Box>
			<Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
				{!location.pathname.includes(Routes.Quotes) && (
					<>
						<Button component={Link} to={`/${Routes.Quotes}?tab=${ETabsValue.first}`}>
							Котировки А
						</Button>
						<Button component={Link} to={`/${Routes.Quotes}?tab=${ETabsValue.second}`}>
							Котировки Б
						</Button>
					</>
				)}
				{!location.pathname.includes(Routes.About) && (
					<Button component={Link} to={`/${Routes.About}`}>
						About page
					</Button>
				)}
			</Toolbar>
		</header>
	);
}

const HeaderMemo = observer(Header);

export default function MainLayout({ children }: IProps) {
	return (
		<>
			<HeaderMemo />
			<main>{children}</main>
		</>
	);
}
