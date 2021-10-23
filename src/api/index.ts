import axios, { AxiosPromise } from 'axios';
import { IQuotesResponse } from '../interfaces';
import { ETabsValue } from '../enums/index.enum';

export const getQuotes = (tab: ETabsValue) =>
	(axios({
		method: 'get',
		url: process.env.REACT_APP_API as string,
	}) as AxiosPromise<IQuotesResponse>).then(({ data }) => {
		const items = Object.entries(data).map(([key, value]) => ({ name: key, ...value }));
		const count = items.length;

		switch (Number(tab)) {
			case ETabsValue.first: {
				return items.splice(0, count / 2);
			}
			case ETabsValue.second: {
				return items.splice(count / 2, count);
			}
			default:
				return [];
		}
	});
