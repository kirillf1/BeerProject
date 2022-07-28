import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { User } from '../_models';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.user = this.userSubject.asObservable();
  }
  userUpdated: EventEmitter<User> = new EventEmitter();

  setUser(user) {

    this.userUpdated.emit(user);
  }

  
    public get userValue(): User {
        return this.userSubject.value;
  }
  isDupeUser(user: User): Observable<boolean> {
  
    var url = this.baseUrl + "api/users/IsDupeUser";
   
    return this.http.post<boolean>(url, user);
  }
  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}api/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
              if (user && user.token) {
                
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userSubject.next(user);
              }
              this.setUser(user);
                return user;
            }));
  }
  register(user: User) {
    return this.http.post<any>(`${this.baseUrl}api/users/register`,  user )
      .pipe(map(user => {
       
        if (user && user.token) {

   
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
        }
        this.setUser(user);
        return user;
      }));

  }
    logout() {
        // remove user from local storage to log user out
      localStorage.removeItem('currentUser');

      this.userSubject.next(null);
      
    }
}
