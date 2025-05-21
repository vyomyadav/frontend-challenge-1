import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Context } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

const app = new Hono();

// Enable CORS
app.use('/*', cors());

// Create MRF files directory if it doesn't exist
const MRF_DIR = path.join(process.cwd(), 'mrf_files');
await fs.mkdir(MRF_DIR, { recursive: true });

// Schema for claims data
const ClaimSchema = z.object({
  providerId: z.string(),
  providerNpi: z.string(),
  providerTin: z.string().optional(),
  procedureCode: z.string(),
  placeOfService: z.string(),
  billingClass: z.string(),
  allowedAmount: z.number(),
  serviceDate: z.string(),
});

type Claim = z.infer<typeof ClaimSchema>;

// Generate MRF file from claims data
app.post('/api/mrf/generate', async (c: Context) => {
  try {
    const { claims } = await c.req.json();
    
    // Validate claims data
    const validatedClaims = claims.map((claim: unknown) => ClaimSchema.parse(claim));
    
    // Process claims and generate MRF file
    const mrfData = generateMrfData(validatedClaims);
    
    // Save MRF file
    const fileName = `mrf_${Date.now()}.json`;
    const filePath = path.join(MRF_DIR, fileName);
    await fs.writeFile(filePath, JSON.stringify(mrfData, null, 2));
    
    return c.json({ success: true, fileName });
  } catch (error) {
    return c.json({ success: false, error: error instanceof Error ? error.message : 'Failed to generate MRF' }, 400);
  }
});

// Get list of MRF files
app.get('/api/mrf/files', async (c: Context) => {
  try {
    const files = await fs.readdir(MRF_DIR);
    return c.json(files);
  } catch (error) {
    return c.json({ error: 'Failed to fetch MRF files' }, 500);
  }
});

// Download MRF file
app.get('/api/mrf/files/:filename', async (c: Context) => {
  try {
    const filename = c.req.param('filename');
    const filePath = path.join(MRF_DIR, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return c.json(JSON.parse(fileContent));
  } catch (error) {
    return c.json({ error: 'File not found' }, 404);
  }
});

// Helper function to generate MRF data from claims
function generateMrfData(claims: Claim[]) {
  // Group claims by provider, procedure, place of service, and billing class
  const groupedClaims = new Map<string, { total: number; count: number }>();
  
  claims.forEach(claim => {
    const key = [
      claim.providerId,
      claim.procedureCode,
      claim.placeOfService,
      claim.billingClass
    ].join('_');
    
    const existing = groupedClaims.get(key) || { total: 0, count: 0 };
    groupedClaims.set(key, {
      total: existing.total + claim.allowedAmount,
      count: existing.count + 1
    });
  });
  
  // Calculate averages and format MRF data
  const mrfData = {
    reporting_entity_name: "Sample Health Plan",
    reporting_entity_type: "health_insurance_issuer",
    last_updated_on: new Date().toISOString(),
    version: "1.0.0",
    provider_references: Array.from(groupedClaims.entries()).map(([key, data]) => {
      const [providerId, procedureCode, placeOfService, billingClass] = key.split('_');
      return {
        provider_id: providerId,
        procedure_code: procedureCode,
        place_of_service: placeOfService,
        billing_class: billingClass,
        allowed_amount: data.total / data.count,
        service_count: data.count
      };
    })
  };
  
  return mrfData;
}

serve({ fetch: app.fetch, port: 3000 });
console.log("Server is running on http://localhost:3000");
