
import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Role, User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  loading = false;
  user: User;
  userFromApi: User;
  isAdmin: boolean = false;
  constructor(private userService: UserService,
    private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
   
  }
  ngOnInit() {
    this.loading = true;
    this.authenticationService.userUpdated.subscribe(user => { this.user = user; this.changeNavmenu(); });
    
    this.changeNavmenu();
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }
  changeNavmenu(){
    if (this.user != null)
      this.userService.getByTocken(this.user.token).pipe(first()).subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
        this.isAdmin = this.userFromApi.role == Role.Admin ? true : false;
      });
}
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.userFromApi = null;
    this.isAdmin = false;
    this.authenticationService.logout();
  }
}
