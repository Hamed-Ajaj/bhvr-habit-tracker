
export const fetchFocusSessionsToday = async () => {

  const response = await fetch(`${import.meta.env.VITE_API_URL}/focus`, {
    credentials: "include"
  });

  const data = await response.json();
  return data;
}
