const API_URL = import.meta.env.VITE_API_URL;

export async function getTournaments() {
  const response = await fetch(`${API_URL}/tournaments`);
  return await response.json();
}

export async function createTournament(tournament) {
  const response = await fetch(`${API_URL}/tournaments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tournament)
  });
  return await response.json();
}

export async function deleteTournament(id) {
  await fetch(`${API_URL}/tournaments/${id}`, {
    method: 'DELETE'
  });
}
