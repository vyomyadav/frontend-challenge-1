import { observer } from 'mobx-react-lite';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Group } from '@mantine/core';
import { mrfStore } from '../stores/mrfStore';
import { api } from '../services/api';
import { Claim } from '../stores/mrfStore';

export const ClaimsTable = observer(() => {
  const columnDefs: ColDef<Claim>[] = [
    { field: 'providerId' as keyof Claim, headerName: 'Provider ID', sortable: true, filter: true },
    { field: 'providerNpi' as keyof Claim, headerName: 'NPI', sortable: true, filter: true },
    { field: 'providerTin' as keyof Claim, headerName: 'TIN', sortable: true, filter: true },
    { field: 'procedureCode' as keyof Claim, headerName: 'Procedure Code', sortable: true, filter: true },
    { field: 'placeOfService' as keyof Claim, headerName: 'Place of Service', sortable: true, filter: true },
    { field: 'billingClass' as keyof Claim, headerName: 'Billing Class', sortable: true, filter: true },
    { field: 'allowedAmount' as keyof Claim, headerName: 'Allowed Amount', sortable: true, filter: true },
    { field: 'serviceDate' as keyof Claim, headerName: 'Service Date', sortable: true, filter: true },
  ];

  const handleApprove = async () => {
    try {
      await api.generateMrf(mrfStore.claims);
      await mrfStore.fetchMrfFiles();
    } catch (error) {
      mrfStore.setError(error instanceof Error ? error.message : 'Failed to approve claims');
    }
  };

  const defaultColDef: ColDef<Claim> = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[600px] w-full ag-theme-alpine">
        <AgGridReact<Claim>
          rowData={mrfStore.claims}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationAutoPageSize={true}
          rowModelType="clientSide"
        />
      </div>
      <Group justify="flex-end">
        <Button
          onClick={handleApprove}
          loading={mrfStore.isLoading}
          disabled={mrfStore.claims.length === 0}
        >
          Approve Claims
        </Button>
      </Group>
    </div>
  );
}); 