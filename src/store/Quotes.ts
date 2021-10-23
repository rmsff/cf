import { makeAutoObservable, action, observable } from 'mobx';
import nprogress from 'nprogress';

import { IQuotesItem, TQuotes } from '../interfaces';
import { getQuotes } from '../api';
import { ETabsValue } from '../enums/index.enum';

nprogress.configure({ showSpinner: false });

class Quotes {
	constructor() {
		makeAutoObservable(this);
	}

	private intervalTimeout = 5 * 1000;

	private intervalId: any = null;

	@observable
	quotes: TQuotes = [];

	@observable
	selectedQuote: null | IQuotesItem = null;

	@observable
	loading: boolean = false;

	@observable
	isError: boolean = false;

	@action
	setSelectedQuote(quote: null | IQuotesItem) {
		this.selectedQuote = quote;
	}

	@action
	setLoading(loading: boolean) {
		this.loading = loading;
	}

	@action
	async startFetchingQuotes(tab: ETabsValue, visibleProgress?: boolean, discharge = true) {
		this.endFetchingQuotes();
		if (visibleProgress) nprogress.start();
		const fetchQuotes = () => {
			this.setLoading(true);
			return getQuotes(tab)
				.then((quotesResponse) => {
					this.isError = false;
					this.quotes = quotesResponse;
				})
				.catch((error) => {
					this.isError = true;
					console.error(error);
				})
				.finally(() => {
					this.setLoading(false);
				});
		};
		this.intervalId = setInterval(fetchQuotes, this.intervalTimeout);
		if (discharge) this.quotes = [];
		return fetchQuotes();
	}

	@action
	endFetchingQuotes() {
		clearInterval(this.intervalId);
		nprogress.done();
	}
}

export default new Quotes();
