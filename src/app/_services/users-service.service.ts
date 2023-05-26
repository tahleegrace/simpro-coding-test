import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { cloneDeep } from "lodash";
import { map, Subject, tap } from 'rxjs';
import { UsersSearchResults } from '../_types/users-search-results';
import { UsersActions } from '../_state/users/users-store';
import { User } from '../_types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private usersStore: User[] = [];
    private selectedUserId = -1;

    public users$: Subject<User[]> = new Subject<User[]>();
    private serviceUrl: string = "https://dummyjson.com"; // TODO: This should be provided in a configuration file.

    constructor(private http: HttpClient) { }

    loadUsers() {
        // TODO: Add support for paging here.
        // TODO: My attempt at setting up NgRx. It doesn't call the reducer for some reason.
        // In a real world scenario, I would look at existing code and ask my fellow team members for assistance.
        //this.http.get<UsersSearchResults>(`${this.serviceUrl}/users`).subscribe(results => {
        //    UsersActions.saveInitialUsers(results);
        //});

        // Load data from the service. Get the users object and send it to whoever is subscribing to this.
        this.http.get<UsersSearchResults>(`${this.serviceUrl}/users?skip=0&limit=100`)
            .pipe(
                map(result => result.users),
                tap(
                    response => console.log("Successfully loaded users."),
                    error => console.log("Error loading users.")
                )
            )
            .subscribe(users => {
                this.usersStore = users;
                this.users$.next(users);
            });

        return this.users$;
    }

    toggleUser(userId: string) {
        // TODO: cloneDeep isn't good for performance where you have deep object structures or big arrays.
        let newUsers = cloneDeep(this.usersStore);
        let user = this.usersStore.filter(u => u.id == userId)[0];

        if (!user) {
            return;
        }

        user.isOpen = !user.isOpen;
    }

    updateUser(userToUpdate: User) {
        // TODO: Use NgRX here.
        // TODO: cloneDeep isn't good for performance where you have deep object structures or big arrays.
        let newUsers = cloneDeep(this.usersStore);
        let existingUser = this.usersStore.filter(u => u.id == userToUpdate.id)[0];

        if (!existingUser) {
            // Don't update the user. We could potentially return an error message here.
            return;
        }

        Object.assign(existingUser, userToUpdate);

        this.usersStore = newUsers;
        this.users$.next(this.usersStore);
    }
}
