const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/quiz/api';

export const api = {
	async createSession(teamName: string) {
		const response = await fetch(`${API_BASE_URL}/sessions/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ team_name: teamName }),
		});
		if (!response.ok) throw new Error('Failed to create session');
		return response.json();
	},

	async completePhase(sessionId: number, phaseNumber: number, tokensEarned: number) {
		const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete_phase/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phaseNumber, tokensEarned }),
		});
		if (!response.ok) throw new Error('Failed to complete phase');
		return response.json();
	},

	async completeGame(sessionId: number) {
		const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete_game/`, {
			method: 'POST',
		});
		if (!response.ok) throw new Error('Failed to complete game');
		return response.json();
	},

	async getTokenConfigs() {
		const response = await fetch(`${API_BASE_URL}/token-configs/`);
		if (!response.ok) throw new Error('Failed to fetch token configs');
		return response.json();
	},
};

export type Api = typeof api;


