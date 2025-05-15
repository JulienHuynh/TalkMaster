export default function useGetTalkRequests() {
    return function () {
        return fetch(`${import.meta.env.VITE_API_HOST}/talks/pending-requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
    }
}
