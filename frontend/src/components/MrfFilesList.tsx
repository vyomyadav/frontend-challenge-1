import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Text } from '@mantine/core';
import { mrfStore } from '../stores/mrfStore';

export const MrfFilesList = observer(() => {
  useEffect(() => {
    mrfStore.fetchMrfFiles();
  }, []);

  if (mrfStore.isLoading) {
    return <Text>Loading MRF files...</Text>;
  }

  if (mrfStore.error) {
    return <Text color="red">{mrfStore.error}</Text>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>File Name</th>
          <th style={{ textAlign: 'center' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {mrfStore.mrfFiles.map((file, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{file}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <a href={`/api/mrf/files/${file}`} download>
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}); 