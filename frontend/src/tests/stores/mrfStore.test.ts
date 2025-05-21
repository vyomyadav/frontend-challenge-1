import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mrfStore } from '../../stores/mrfStore';
import { api } from '../../services/api';

// Mock the API service
vi.mock('../../services/api', () => ({
  api: {
    getMrfFiles: vi.fn(),
  },
}));

describe('mrfStore', () => {
  beforeEach(() => {
    // Reset mocks and store state before each test
    vi.clearAllMocks();
    mrfStore.setMrfFiles([]);
    mrfStore.setLoading(false);
    mrfStore.setError(null);
  });

  describe('fetchMrfFiles', () => {
    it('sets loading state while fetching files', async () => {
      // Setup mock to resolve later so we can check the loading state
      const mockPromise = new Promise(resolve => setTimeout(() => resolve(['file1.json']), 100));
      vi.mocked(api.getMrfFiles).mockReturnValue(mockPromise as any);

      // Start the fetch but don't await it yet
      const fetchPromise = mrfStore.fetchMrfFiles();
      
      // Check loading state is true
      expect(mrfStore.isLoading).toBe(true);
      
      // Wait for the fetch to complete
      await fetchPromise;
    });

    it('sets MRF files when fetch is successful', async () => {
      // Setup mock to return files
      const mockFiles = ['file1.json', 'file2.json'];
      vi.mocked(api.getMrfFiles).mockResolvedValue(mockFiles);

      // Call the method
      await mrfStore.fetchMrfFiles();
      
      // Assert the state is updated correctly
      expect(mrfStore.isLoading).toBe(false);
      expect(mrfStore.error).toBeNull();
      expect(mrfStore.mrfFiles).toEqual(mockFiles);
    });

    it('sets error state when fetch fails', async () => {
      // Setup mock to throw an error
      vi.mocked(api.getMrfFiles).mockRejectedValue(new Error('API failure'));

      // Call the method
      await mrfStore.fetchMrfFiles();
      
      // Assert the state is updated correctly
      expect(mrfStore.isLoading).toBe(false);
      expect(mrfStore.error).toBe('API failure');
      expect(mrfStore.mrfFiles).toEqual([]);
    });
  });
}); 