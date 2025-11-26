import { Injectable } from '@angular/core';
import { ColumnState } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class GridStateService {
  saveState(gridId: string, state: ColumnState[]): void {
    localStorage.setItem(`grid_state_${gridId}`, JSON.stringify(state));
  }

  loadState(gridId: string): ColumnState[] | null {
    const state = localStorage.getItem(`grid_state_${gridId}`);
    return state ? JSON.parse(state) : null;
  }
}
