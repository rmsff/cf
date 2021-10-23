import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import QuotesState from '../../store/Quotes';
import useQuery from '../../hooks/useQuery';

function AlertDialog() {
	const { tab } = useQuery(['tab']);

	const visible = !!QuotesState.selectedQuote;

	useEffect(() => {
		if (visible) QuotesState.endFetchingQuotes();
	}, [tab, visible]);

	const handleClose = () => {
		QuotesState.setSelectedQuote(null);
		QuotesState.startFetchingQuotes(tab, false, false);
	};

	return (
		<div>
			<Dialog
				open={visible}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{QuotesState.selectedQuote?.name}</DialogTitle>
				<DialogContent>
					<ul>
						{QuotesState.selectedQuote &&
							Object.entries(QuotesState.selectedQuote).map(([key, value]) => (
								<li key={key}>
									{key}: {value}
								</li>
							))}
					</ul>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default observer(AlertDialog);
