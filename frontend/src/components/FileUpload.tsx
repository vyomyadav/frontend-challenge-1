import { useCallback } from 'react';
import { Group, Text, rem } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';
import Papa from 'papaparse';
import { observer } from 'mobx-react-lite';
import { mrfStore, ClaimSchema } from '../stores/mrfStore';
import 'ag-grid-enterprise';

export const FileUpload = observer(() => {
  const handleDrop = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        try {
          const claims = results.data.map((row: any) => ({
            providerId: row['Provider ID'],
            providerNpi: '', // Not available in sample data
            providerTin: '', // Not available in sample data
            procedureCode: row['Procedure Code'],
            placeOfService: row['Place of Service'],
            billingClass: row['Claim Type'],
            allowedAmount: parseFloat(row['Allowed']),
            serviceDate: row['Service Date'],
          }));

          // Validate claims
          claims.forEach((claim) => {
            ClaimSchema.parse(claim);
          });

          mrfStore.setClaims(claims);
        } catch (error) {
          console.error('Parsing error:', error);
          mrfStore.setError('Invalid CSV format or data');
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  }, []);

  return (
    <Dropzone
      onDrop={handleDrop}
      maxSize={5 * 1024 ** 2}
      accept={['text/csv']}
      className="border-2 border-dashed p-4 rounded-lg"
    >
      <Group justify="center" gap="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size="3.2rem" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size="3.2rem" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFile size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag claims CSV file here or click to select
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            File should be less than 5MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}); 