export async function fetchHealth() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/health`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch health: ${res.status}`);
  return res.json();
}
