export default function useGetTalkRequests() {
    return function () {
        return fetch(`${import.meta.env.VITE_API_HOST}/getTalkRequests`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Authorization': `Bearer`
            }
        })
            .then(data => data.json())
    }
}
