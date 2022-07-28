import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn} from '@angular/forms';

import { Observable } from 'rxjs';

import { BaseFormComponent } from '../base.form.component';
import { Factory } from './factory';
import { FactoryService } from './factory.service';
import { Country } from '../country/country';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-factory-edit',
  templateUrl: './factory-edit.component.html',
  styleUrls: ['./factory-edit.component.css']
})
export class FactoryEditComponent extends BaseFormComponent {

  title: string;

  form: FormGroup;

  factory: Factory;
 description: string;
  countries: Country[];
  id?: number;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    
    private factoryService: FactoryService, private propService: PropertiesService) {
    super();
   
  }
  open() {
    this.description = this.form.get("description").value;
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['',
        Validators.required
      ],
      countryId: [''],
    description:['']
        
     
    });
    this.loadData();
  }
  loadData() {
   
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.factoryService.get<Factory>(this.id).subscribe(result => {
        this.factory = result;
        this.title = "Редактировать - " + this.factory.name;
        this.propService.getCountries().subscribe(res => this.countries = res.data);
        this.form.patchValue(this.factory);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Добавить нового производителя";
    }
  }
  onDelete() {
    this.factoryService.delete(this.id).subscribe(res => this.router.navigate(['/factories']), error => console.log(error));
  }
  onSubmit() {
    var factory = (this.id) ? this.factory : <Factory>{};
    factory.name = this.form.get("name").value;
    factory.countryId = this.form.get("countryId").value;
    factory.description = this.form.get("description").value;
    factory.country = null;
    if (this.id) {
      // EDIT mode

      this.factoryService.put<Factory>(factory).subscribe(result => {
          console.log("Factory " + factory.id + " has been updated.");
         
        this.router.navigate(['/factories']);
        }, error => console.log(error));
    }
    else {
      // ADD NEW mode
      this.factoryService.post<Factory>(factory).subscribe(result => {
          console.log("Factory " + result.id + " has been created.");
        
          this.router.navigate(['/factories']);
        }, error => console.log(error));
    }
  }
 

    
  
}
