import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { api } from '../services/api';

// Define the claim schema
export const ClaimSchema = z.object({
  providerId: z.string(),
  providerNpi: z.string().optional(),
  providerTin: z.string().optional(),
  procedureCode: z.string(),
  placeOfService: z.string(),
  billingClass: z.string(),
  allowedAmount: z.number(),
  serviceDate: z.string(),
});

export type Claim = z.infer<typeof ClaimSchema>;

class MrfStore {
  claims: Claim[] = [];
  isLoading = false;
  error: string | null = null;
  mrfFiles: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setClaims(claims: Claim[]) {
    this.claims = claims;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setMrfFiles(files: string[]) {
    this.mrfFiles = files;
  }

  async uploadClaims(file: File) {
    this.setLoading(true);
    this.setError(null);

    try {
      // Implementation will be added in the FileUpload component
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      this.setLoading(false);
    }
  }

  async approveClaims() {
    this.setLoading(true);
    this.setError(null);

    try {
      // Implementation for sending approved claims to backend
      // Will be implemented in the services layer
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      this.setLoading(false);
    }
  }

  async fetchMrfFiles() {
    this.setLoading(true);
    this.setError(null);

    try {
      const files = await api.getMrfFiles();
      this.setMrfFiles(files);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      this.setLoading(false);
    }
  }
}

export const mrfStore = new MrfStore(); 