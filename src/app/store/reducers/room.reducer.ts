import { Action, createReducer, on } from '@ngrx/store';

import { RoomStateInterface } from 'src/app/models/types/states/roomState.interface';
import { deactivateRoomAction } from '../actions/message.action';
import {
  getRoomsAction,
  getRoomsSuccessAction,
  getRoomsFailureAction,
  getRoomsWithOffsetAction,
  getRoomsWithOffsetSuccessAction,
  getRoomsWithOffsetFailureAction,
} from 'src/app/store/actions/rooms.action';
import {
  createRoomAction,
  createRoomFailureAction,
  createRoomSuccessAction,
  getRoomAction,
  getRoomFailureAction,
  getRoomSuccessAction,
  getRoomByIdAction,
  getRoomByIdFailureAction,
  getRoomByIdSuccessAction,
} from 'src/app/store/actions/room.action';

const initialState: RoomStateInterface = {
  isLoading: false,
  total: null,
  error: null,
  rooms: null,
  activeRoom: null,
};

const roomReducer = createReducer(
  initialState,
  // Get Rooms Reducers
  on(
    getRoomsAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomsSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      rooms: action.payload?.documents,
    })
  ),
  on(
    getRoomsFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  on(
    getRoomsWithOffsetAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomsWithOffsetSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      rooms: [...state.rooms, ...action.payload?.documents],
    })
  ),
  on(
    getRoomsWithOffsetFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  // Get Room Reducers
  on(
    getRoomAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
      activeRoom: null,
    })
  ),
  on(
    getRoomSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      rooms: [action.payload, ...(state.rooms || [])],
    })
  ),
  on(
    getRoomFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  // Create Room Reducers
  on(
    createRoomAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    createRoomSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      rooms: [action.payload, ...(state.rooms || [])],
    })
  ),
  on(
    createRoomFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  // Get Room By Id Reducers
  on(
    getRoomByIdAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomByIdSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      rooms: [action.payload, ...(state.rooms || [])],    })
  ),
  on(
    getRoomByIdFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  // Deactivate Room Reducers
  on(deactivateRoomAction, (state, action): RoomStateInterface => {
    return {
      ...state,
      rooms: state.rooms.map((room) =>
        room.$id === action.payload.$id ? action.payload : room
      ),
    };
  })
);

export function roomReducers(state: RoomStateInterface, action: Action) {
  return roomReducer(state, action);
}