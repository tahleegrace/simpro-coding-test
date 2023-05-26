import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, Subject } from 'rxjs';
import { UsersSearchResults } from '../_types/users-search-results';
import { UsersActions } from '../_state/users/users-store';
import { User } from '../_types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    public users$: Subject<User[]> = new Subject<User[]>();
    private serviceUrl: string = "https://dummyjson.com"; // TODO: This should be provided in a configuration file.

    constructor(private http: HttpClient) { }

    loadUsers() {
        // TODO: Add support for paging here.
        // TODO: My attempt at setting NgRx. It doesn't call the reducer for some reason.
        //this.http.get<UsersSearchResults>(`${this.serviceUrl}/users`).subscribe(results => {
        //    UsersActions.saveInitialUsers(results);
        //});

        this.http.get<UsersSearchResults>(`${this.serviceUrl}/users?skip=0&limit=100`)
            .pipe(map(result => result.users))
            .subscribe(users => this.users$.next(users));

        return this.users$;
    }
}
