export default function useUpdateStateTalk(talkID: number, payload: {status: string}) {
    return fetch(`${import.meta.env.VITE_API_HOST}/organizer/talks/${talkID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
        .then(data => data)
}
