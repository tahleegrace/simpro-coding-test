import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UsersSearchResults } from '../_types/users-search-results';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    serviceUrl: string = "https://dummyjson.com"; // TODO: This should be provided in a configuration file.

    constructor(private http: HttpClient) { }

    loadUsers(): Observable<UsersSearchResults> {
        // TODO: Use the NgRX store here.
        // TODO: Add support for paging here.
        // TODO: Store the users list in memory.
        return this.http.get<UsersSearchResults>(`${this.serviceUrl}/users`);
    }
}
