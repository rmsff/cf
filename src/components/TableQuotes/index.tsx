import { useEffect } from 'react';
import nprogress from 'nprogress';
import { observer } from 'mobx-react';

import { makeStyles } from '@mui/styles';
import Dialog from '../Dialog';

import quotesState from '../../store/Quotes';
import useQuery from '../../hooks/useQuery';

nprogress.configure({ showSpinner: false });

function TableQuotes() {
	const classes = useStyles();
	const { tab } = useQuery(['tab']);

	useEffect(() => {
		quotesState
			.startFetchingQuotes(tab, true)
			.then(() => nprogress.start())
			.finally(() => nprogress.done());
		return () => {
			quotesState.endFetchingQuotes();
		};
	}, []);

	return (
		<>
			<table className={classes.root}>
				<caption>Quotes {Number(tab) + 1}</caption>
				{!!quotesState.quotes.length && (
					<thead>
						<tr className={classes.tr}>
							<th>name</th>
							<th>last</th>
							<th>highestBid</th>
							<th>percentChange</th>
						</tr>
					</thead>
				)}
				<tbody className={classes.tbody}>
					{quotesState.quotes.map((item) => {
						const { id, name, last, highestBid, percentChange } = item;
						return (
							<tr
								className={`${classes['table-row']} ${classes.tr}`}
								key={id}
								onClick={() => quotesState.setSelectedQuote(item)}
							>
								<td>{name}</td>
								<td>{last}</td>
								<td>{highestBid}</td>
								<td>{percentChange}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<Dialog />
		</>
	);
}

export default observer(TableQuotes);

const useStyles = makeStyles(() => ({
	root: {
		fontSize: '20px',
		borderCollapse: 'collapse',
		'& caption': {
			padding: '20px',
			whiteSpace: 'nowrap',
		},
	},
	'table-row': {
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'gray',
		},
	},
	'column-title': {},
	tr: {
		'& td, th': {
			padding: '5px 10px',
			textAlign: 'center',
			minWidth: '156px',
		},
	},
	tbody: {
		'& tr:nth-child(odd)': {
			backgroundColor: '#F5F5F5',
			'&:hover': {
				backgroundColor: 'gray',
			},
		},
	},
}));
