import { useLocation } from 'react-router-dom';

export default function useQuery<T>(names: string[]) {
	const { search } = useLocation();
	const query = new URLSearchParams(search);

	return names.reduce((acc, curr) => {
		return { [curr]: query.get(curr), ...acc };
	}, {}) as T | { [key: string]: string };
}
