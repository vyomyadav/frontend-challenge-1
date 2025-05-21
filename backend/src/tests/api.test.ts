import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Hono } from 'hono';
import * as fs from 'fs';

// Create a mock Hono app for testing
const mockApp = new Hono();

// Setup mock routes similar to the actual app
mockApp.get('/api/mrf/files', async (c) => {
  try {
    const files = await fs.promises.readdir('./mrf_files');
    return c.json(files);
  } catch (error) {
    return c.json({ error: 'Failed to read MRF files' }, 500);
  }
});

mockApp.post('/api/mrf/generate', async (c) => {
  try {
    const body = await c.req.json();
    if (!body.claims || !Array.isArray(body.claims)) {
      return c.json({ error: 'Invalid request body' }, 400);
    }
    
    const filename = `mrf-${Date.now()}.json`;
    await fs.promises.writeFile(`./mrf_files/${filename}`, JSON.stringify(body.claims));
    
    return c.json({ filename });
  } catch (error) {
    return c.json({ error: 'Failed to generate MRF file' }, 500);
  }
});

// Mock fs module
vi.mock('fs', () => ({
  promises: {
    readdir: vi.fn(),
    writeFile: vi.fn(),
  },
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
}));

describe('MRF API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/mrf/files', () => {
    it('should return an array of MRF filenames', async () => {
      // Mock the readdir function to return file names
      const mockFiles = ['file1.json', 'file2.json', 'file3.json'];
      vi.mocked(fs.promises.readdir).mockResolvedValue(mockFiles as any);

      // Make a test request to the API
      const res = await mockApp.request('/api/mrf/files');
      const data = await res.json();

      // Assert that the response is as expected
      expect(res.status).toBe(200);
      expect(data).toEqual(mockFiles);
      expect(fs.promises.readdir).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when reading files', async () => {
      // Mock the readdir function to throw an error
      vi.mocked(fs.promises.readdir).mockRejectedValue(new Error('Failed to read directory'));

      // Make a test request to the API
      const res = await mockApp.request('/api/mrf/files');
      
      // Assert that the response is an error
      expect(res.status).toBe(500);
      expect(await res.json()).toHaveProperty('error');
    });
  });

  describe('POST /api/mrf/generate', () => {
    it('should generate an MRF file from claims data', async () => {
      // Mock fs functions
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.promises.writeFile).mockResolvedValue(undefined);

      // Sample claims data
      const claimsData = [
        {
          providerId: 'provider1',
          providerNpi: '1234567890',
          providerTin: '123456789',
          procedureCode: 'XYZ123',
          placeOfService: 'Office',
          billingClass: 'Fee',
          allowedAmount: 100.50,
          serviceDate: '2023-01-15'
        }
      ];

      // Make a test request to the API
      const res = await mockApp.request('/api/mrf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claims: claimsData }),
      });

      // Assert that the response is as expected
      expect(res.status).toBe(200);
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
      expect(await res.json()).toHaveProperty('filename');
    });

    it('should return 400 for invalid input', async () => {
      // Make a test request with invalid data
      const res = await mockApp.request('/api/mrf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invalidField: 'invalid data' }),
      });

      // Assert that the response is an error
      expect(res.status).toBe(400);
    });
  });
}); 