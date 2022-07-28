import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from '../_services';
import { Observable } from 'rxjs';
import { Role, User } from '../_models';
import { cwd } from 'process';



@Component({
  templateUrl: 'register.component.html' ,

  selector: 'app-register',
  styleUrls: ['./register.component.scss']
}
)
export class RegisterComponent  {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        
    }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required], this.isDupeUser()],
        password: ['', [Validators.required]],
        // реализовать проверку пароля
        //passwordCheck: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['']
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  isDupeUser(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {
      var user = new User();

      user.username = this.f["username"].value;

      return this.authenticationService.isDupeUser(user)
        .pipe(map(result => {
    
          return (result ? { isDupeUser: true } : null);
        }));

    }
  }
  isCheckedPassword(): ValidatorFn {
   return (control: AbstractControl): { [key: string]: boolean } | null => {
     if (this.f['password'].value != this.f['passwordCheck']) {
       console.log(true);
        return { 'different': true };
      }
      return null;
    };
  }
  emailDomainValidator(control: FormControl) {
  
    if (this.f['password'].value != this.f['passwordCheck']) {
      console.log(true);
      return { 'different': true };
    }
    return null;
}
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
      var user = new User();
      
      user.username = this.f["username"].value;
      user.firstName = this.f["firstName"].value;
      user.lastName = this.f["lastName"].value;
      user.password = this.f["password"].value;
      user.role = Role.User;
      this.loading = true;
      this.authenticationService.register(user)
            .pipe(first())
            .subscribe(
              data => {
                //location.reload(true);
                this.router.navigate([this.returnUrl]);
              
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
