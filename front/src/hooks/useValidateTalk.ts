export default function useValidateTalk(talkID: number) {
    return fetch(`${import.meta.env.VITE_API_HOST}/organizer/talks/${talkID}/validated`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(data => data)
}
