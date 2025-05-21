import { Claim } from '../stores/mrfStore';

const API_BASE_URL = '/api';

export const api = {
  async generateMrf(claims: Claim[]) {
    const response = await fetch(`${API_BASE_URL}/mrf/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ claims }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate MRF file');
    }

    return response.json();
  },

  async getMrfFiles() {
    const response = await fetch(`${API_BASE_URL}/mrf/files`);

    if (!response.ok) {
      throw new Error('Failed to fetch MRF files');
    }

    return response.json();
  },
}; 