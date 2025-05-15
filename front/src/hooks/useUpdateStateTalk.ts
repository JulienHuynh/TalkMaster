export default function useUpdateStateTalk(payload: {
  talkId: number;
  roomId: number;
  slotsIndex: object[];
}) {

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return fetch(`${import.meta.env.VITE_API_HOST}/slots/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }).then((data) => data);
}
