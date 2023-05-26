import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createActionGroup, createFeature, createReducer, emptyProps, on, props } from "@ngrx/store";
import { User } from "../../_types/user";

const UsersStoreKey = "users";

export interface UsersState extends EntityState<User> {
    selectedUserId: string | null;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
    selectedUserId: null
});

const convertUsersArrayToDictionary = (users: User[]) => {
    return Object.fromEntries(users.map(u => [u.id, u]));
};

export const UsersActions = createActionGroup({
    source: UsersStoreKey,
    events: {
        Init: emptyProps(),
        'Save Initial Users': props<{ users: User[] }>(),
    }
});

export const UsersReducer = createFeature({
    name: UsersStoreKey,
    reducer: createReducer(
        initialState,
        on(UsersActions.saveInitialUsers, (state, props) => {
            return {
                selectedUserId: null,
                ids: props.users.map(u => u.id),
                entities: convertUsersArrayToDictionary(props.users)
            };
        })
    )
});

