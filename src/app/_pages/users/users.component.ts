import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../_services/users-service.service';
import { User } from '../../_types/user';
import { HttpClientModule } from '@angular/common/http';

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
    users: User[] = [];

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        // TODO: Add error handling here.
        this.usersService.loadUsers().subscribe(result => {
            this.users = result.users;
        });
    }
}