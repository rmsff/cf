export interface IQuotesItem {
	baseVolume: string;
	high24hr: string;
	highestBid: string;
	id: number;
	isFrozen: string;
	last: string;
	low24hr: string;
	lowestAsk: string;
	percentChange: string;
	postOnly: string;
	quoteVolume: string;
	name?: string;
}

export type TQuotes = IQuotesItem[];

export type IQuotesResponse = {
	[key: string]: IQuotesItem;
};
