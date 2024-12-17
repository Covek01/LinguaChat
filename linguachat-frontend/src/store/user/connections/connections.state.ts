import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';
import { ConnectionsState } from './connections.types';

export const connectionsAdapter = createEntityAdapter<UserGetDto>();

export const initialStateConnections: ConnectionsState = connections.getInitialState();