import { Container, Title, Stack, Alert, Button, Group } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import { ClaimsTable } from '../components/ClaimsTable';
import { mrfStore } from '../stores/mrfStore';

export const UploadPage = observer(() => {
  const navigate = useNavigate();

  return (
    <Container size="xl" className="py-8">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title>Upload Claims Data</Title>
          <Button
            color="blue"
            onClick={() => navigate('/mrf')}
          >
            View MRF Files
          </Button>
        </Group>
        {mrfStore.error && (
          <Alert color="red" title="Error">
            {mrfStore.error}
          </Alert>
        )}
        <FileUpload />
        {mrfStore.claims.length > 0 && <ClaimsTable />}
      </Stack>
    </Container>
  );
}); 