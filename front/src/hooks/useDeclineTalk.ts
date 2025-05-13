export default function useDeclineTalk(talkID: number) {
    return fetch(`${import.meta.env.VITE_API_HOST}/organizer/talks/${talkID}/refused`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(data => data)
}
