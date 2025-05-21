import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../test-utils';
import { MrfFilesList } from '../../components/MrfFilesList';
import { mrfStore } from '../../stores/mrfStore';

// Mock the MobX store
vi.mock('../../stores/mrfStore', () => ({
  mrfStore: {
    fetchMrfFiles: vi.fn(),
    isLoading: false,
    error: null,
    mrfFiles: ['test-file-1.json', 'test-file-2.json'],
  },
}));

describe('MrfFilesList', () => {
  beforeEach(() => {
    // Reset mock before each test
    vi.clearAllMocks();
  });

  it('calls fetchMrfFiles on mount', () => {
    render(<MrfFilesList />);
    expect(mrfStore.fetchMrfFiles).toHaveBeenCalledTimes(1);
  });

  it('displays loading state when isLoading is true', () => {
    // Override the mock to return loading state
    vi.mocked(mrfStore).isLoading = true;
    
    render(<MrfFilesList />);
    expect(screen.getByText('Loading MRF files...')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    // Override the mock to return error state
    vi.mocked(mrfStore).isLoading = false;
    vi.mocked(mrfStore).error = 'Failed to load MRF files';
    
    render(<MrfFilesList />);
    expect(screen.getByText('Failed to load MRF files')).toBeInTheDocument();
  });

  it('displays the list of MRF files', () => {
    // Reset mock values
    vi.mocked(mrfStore).isLoading = false;
    vi.mocked(mrfStore).error = null;
    
    render(<MrfFilesList />);
    
    // Check if table headers are rendered
    expect(screen.getByText('File Name')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    
    // Check if files are rendered
    expect(screen.getByText('test-file-1.json')).toBeInTheDocument();
    expect(screen.getByText('test-file-2.json')).toBeInTheDocument();
    
    // Check if download links are rendered
    expect(screen.getAllByText('Download')).toHaveLength(2);
  });
}); 