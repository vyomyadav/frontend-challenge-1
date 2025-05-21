import { Container, Title, Text } from '@mantine/core';
import { MrfFilesList } from '../components/MrfFilesList';

export const PublicMrfPage = () => {
  return (
    <Container size="xl" className="py-8">
      <Title className="mb-8">Machine-Readable Files (MRF)</Title>
      {/* Copied from sample page */}
      <Text my={20}> 
        A machine-readable file is defined as a digital representation of data or information in a file that can be imported or read by a computer system for further processing without human intervention, while ensuring no semantic meaning is lost.
        Below are all of the relevant machine readable files. This page is intended to meet the compliance requirements for the Transparency in Coverage Act. Per that legislation, this page includes these files below.
      </Text>
      <MrfFilesList />
    </Container>
  );
}; 