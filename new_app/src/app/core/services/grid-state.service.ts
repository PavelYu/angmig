import { Injectable } from '@angular/core';
import { ColumnState } from 'ag-grid-community';

export interface GridState {
  columnState: ColumnState[];
  columnGroupState?: any;
  filterModel?: any;
  sortModel?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GridStateService {
  saveGridState(gridId: string, state: GridState): void {
    try {
      localStorage.setItem(`grid_state_${gridId}`, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save grid state', e);
    }
  }

  getGridState(gridId: string): GridState | null {
    try {
      const state = localStorage.getItem(`grid_state_${gridId}`);
      return state ? JSON.parse(state) : null;
    } catch (e) {
      console.error('Failed to load grid state', e);
      return null;
    }
  }

  clearGridState(gridId: string): void {
    localStorage.removeItem(`grid_state_${gridId}`);
  }

  saveState(gridId: string, state: ColumnState[]): void {
    this.saveGridState(gridId, { columnState: state });
  }

  loadState(gridId: string): ColumnState[] | null {
    const state = this.getGridState(gridId);
    return state ? state.columnState : null;
  }
}
