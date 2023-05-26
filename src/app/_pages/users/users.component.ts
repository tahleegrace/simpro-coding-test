import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../_services/users-service.service';
import { User } from '../../_types/user';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { UsersReducer, UsersState } from '../../_state/users/users-store';
import { Dictionary } from '@ngrx/entity';
import { UsersSearchResults } from '../../_types/users-search-results';

@Component({
  selector: 'app-users',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UsersService
    ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users$!: Observable<User[]>;

    constructor(private usersService: UsersService, private store: Store<UsersState>) {
    }

    ngOnInit() {
        // Attempted to get NgRX working here. Didn't have much luck as the reducer for setInitialState doesn't work.
        //this.users$ = this.store.select('entities');

        //this.store.subscribe(users => {
        //    debugger;
        //});
        
        // TODO: Add error handling here.
        this.users$ = this.usersService.loadUsers();
    }
}