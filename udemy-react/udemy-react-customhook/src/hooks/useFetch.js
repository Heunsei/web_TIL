import { useEffect, useState } from "react";
// fetchFn이 바뀔 수 있으니 dependency로 fetchFn을 설정해야함
export function useFetch(fetchFn, initalValue) {
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()
    const [fetchedData, setFetchedData] = useState(initalValue)
    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }
            setIsFetching(false);
        }
        fetchData();
    }, [fetchFn]);
    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error
    }
}