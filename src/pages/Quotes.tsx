import React, { SyntheticEvent, useState, memo } from 'react';
import { useHistory } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TableQuotes from '../components/TableQuotes';

import useQuery from '../hooks/useQuery';

import { ETabsValue } from '../enums/index.enum';

interface ITabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: ITabPanelProps) {
	const { children, value, index, ...other } = props;
	return value === index ? (
		<div
			key={value}
			role="tabpanel"
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			<Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>{children}</Box>
		</div>
	) : null;
}

function QuotesPage() {
	const history = useHistory();
	const { tab } = useQuery(['tab']);

	const [valueTabs, setValueTabs] = useState<ETabsValue>(Number(tab) || ETabsValue.first);

	const handleChangeTab = (event: SyntheticEvent, newValue: ETabsValue) => {
		setValueTabs(newValue);
		history.push(`/quotes?tab=${newValue}`);
	};

	return (
		<Box sx={{ borderColor: 'divider' }}>
			<Tabs value={valueTabs} onChange={handleChangeTab} centered>
				<Tab label="Tab 1" />
				<Tab label="Tab 2" />
			</Tabs>
			<TabPanel value={valueTabs} index={ETabsValue.first}>
				<TableQuotes />
			</TabPanel>
			<TabPanel value={valueTabs} index={ETabsValue.second}>
				<TableQuotes />
			</TabPanel>
		</Box>
	);
}

export default memo(QuotesPage);
