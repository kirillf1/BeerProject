import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn} from '@angular/forms';

import { Observable } from 'rxjs';

import { BaseFormComponent } from '../base.form.component';
import { CountryService } from './country.service';
import { Country } from './country';
@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent extends BaseFormComponent {
 
  title: string;

  form: FormGroup;
 
  country: Country;
 
  id?: number;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
   
    private countryService: CountryService){
    super();
   
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['',
        Validators.required
      ],
      
    
        
     
    });
    this.loadData();
  }
  loadData() {
   
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.countryService.get<Country>(this.id).subscribe(result => {
        this.country = result;
        this.title = "Редактировать - " + this.country.name;
      
        this.form.patchValue(this.country);
      }, error => console.error(error));
    }
    else {
  
      this.title = "Добавить новую страну";
    }
  }
  onDelete() {
    this.countryService.delete(this.id).subscribe(res => this.router.navigate(['/countries']), error => console.log(error));
  }
  onSubmit() {
    var country = (this.id) ? this.country : <Country>{};
    country.name = this.form.get("name").value;
    country.factories = null;
    if (this.id) {
      // EDIT mode

      this.countryService.put<Country>(country).subscribe(result => {
          console.log("Country " + country.id + " has been updated.");
        
          this.router.navigate(['/countries']);
        }, error => console.log(error));
    }
    else {
      
      this.countryService.post<Country>(country).subscribe(result => {
          console.log("Country " + result.id + " has been created.");
     
          this.router.navigate(['/countries']);
        }, error => console.log(error));
    }
  }
 

    
  
}
