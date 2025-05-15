export default async function useUpdateStateTalk(payload: {
  talkId: number;
  roomId: number;
  slotsIndex: object[];
}) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const response = await fetch(
    `${import.meta.env.VITE_API_HOST}/slots/assign`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const { error } = await response.json();
    // console.log(await response.json());
    throw new Error(error || "Failed to update talk state");
  }
  return response.json();
}
