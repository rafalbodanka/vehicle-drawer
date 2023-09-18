import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { VehicleType } from "../utils/Types"
import generateSitsArray from './helpers/generateSits'

const initialState: VehicleType = {
  type: '',
  wagons: [
    {
      id: 0,
      rows: 2,
      columns: [
        {
          hasBike: false,
          sits: generateSitsArray(5),
        }],
      corridors: [3]
    }
  ],
}

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicle: (state, action: PayloadAction<VehicleType>) => {
      state.type = action.payload.type
      state.wagons = action.payload.wagons
    },
    resetVehicle: (state) => {
      state.type = ''
      state.wagons = [
        {
          id: 0,
          rows: 2,
          columns: [
            {
              hasBike: false,
              sits: generateSitsArray(5),
            }],
          corridors: [3]
        }
      ]
    },
    setVehicleType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    addWagon: (state, action: PayloadAction<number>) => {
    const newWagon = {
      id: state.wagons.length,
      rows: 5,
      columns: [
        {
          hasBike: false,
          sits: generateSitsArray(5)
        }],
      corridors: [1, 4]
    }
    state.wagons = [...state.wagons, newWagon];
    },
    addColumn: (state, action: PayloadAction<number>) => {
      const index = action.payload
      state.wagons[index].columns = [...state.wagons[index].columns, {
        hasBike: false,
        sits: generateSitsArray(state.wagons[index].columns[0].sits.length)
      }]
    },
    deleteColumn: (state, action: PayloadAction<{
      wagonIndex: number;
      columnIndex: number;
    }>) => {
      const {wagonIndex, columnIndex} = action.payload
      state.wagons[wagonIndex].columns.splice(columnIndex, 1)
    },
    moveCorridor: (state, action: PayloadAction<{
      wagonIndex: number;
      prevCorridorIndex: number;
      newCorridorIndex: number
    }>) => {
      const {wagonIndex, prevCorridorIndex, newCorridorIndex} = action.payload
      const corridors = state.wagons[wagonIndex].corridors
      const indexToRemove = corridors.indexOf(prevCorridorIndex)
      corridors.splice(indexToRemove, 1)
      corridors.push(newCorridorIndex);
      corridors.sort();
      },
    setSitType: (state, action: PayloadAction<{
      wagonIndex: number;
      columnIndex: number;
      rowIndex: number;
      newType: string;
    }>) => {
      const {wagonIndex, columnIndex, rowIndex, newType} = action.payload
      state.wagons[wagonIndex].columns[columnIndex].sits[rowIndex].type = newType
    },
    resetColumn: (state, action: PayloadAction<{
      wagonIndex: number;
      columnIndex: number;
    }>) => {
      const { wagonIndex, columnIndex } = action.payload
      state.wagons[wagonIndex].columns[columnIndex] = {
        hasBike: false,
        sits: generateSitsArray(state.wagons[wagonIndex].columns[0].sits.length)
      }
    },
  addCorridor: (state, action: PayloadAction<{
    wagonIndex: number;
    corridorIndex: number;
  }>) => {
    const {wagonIndex, corridorIndex} = action.payload
    state.wagons[wagonIndex].corridors = [...state.wagons[wagonIndex].corridors, corridorIndex]
  },
  switchSitDirection: (state, action: PayloadAction<{
    wagonIndex: number;
    columnIndex: number;
    rowIndex: number;
    opposite: boolean;
  }>) => {
    const {wagonIndex, columnIndex, rowIndex, opposite} = action.payload
    state.wagons[wagonIndex].columns[columnIndex].sits[rowIndex].opposite = opposite
  },
  addRow: (state, action: PayloadAction<{
    wagonIndex: number;
  }>) => {
    const {wagonIndex} = action.payload
    state.wagons[wagonIndex].columns.map(column => {
      column.sits.push({
        type: '',
        number: 5,
        reserved: true,
        opposite: false,
      },)
    })
  },
  deleteRow: (state, action: PayloadAction<{
    wagonIndex: number;
    rowIndex: number;
  }>) => {
    const {wagonIndex, rowIndex} = action.payload
    state.wagons[wagonIndex].columns.map(column => {
      column.sits.splice(rowIndex, 1)
    })
  },
  deleteCorridor: (state, action: PayloadAction<{
    wagonIndex: number;
    corridorIndex: number;
  }>) => {
    const {wagonIndex, corridorIndex} = action.payload
    const corridors = state.wagons[wagonIndex].corridors
    const indexToRemove = corridors.indexOf(corridorIndex)
    corridors.splice(indexToRemove, 1)
  },
  removeCorridorDuplicates: (state, action: PayloadAction<{
    wagonIndex: number;
  }>) => {
    const {wagonIndex} = action.payload
    const newCorridors = new Set(state.wagons[wagonIndex].corridors)
    state.wagons[wagonIndex].corridors = Array.from(newCorridors);
  },
  },
})

export const { setVehicle, setVehicleType, addColumn, deleteColumn, addWagon, moveCorridor, setSitType, resetColumn, addCorridor, switchSitDirection, addRow, deleteRow, deleteCorridor, removeCorridorDuplicates, resetVehicle } = vehicleSlice.actions
export const selectVehicle = (state: RootState) => state.vehicle
export default vehicleSlice.reducer