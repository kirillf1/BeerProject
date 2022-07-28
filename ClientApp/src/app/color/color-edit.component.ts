import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn} from '@angular/forms';

import { Observable } from 'rxjs';

import { BaseFormComponent } from '../base.form.component';
import { Color } from './color';
import { ColorService } from './color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent extends BaseFormComponent {
 
  title: string;

  form: FormGroup;

  color: Color;
 
  id?: number;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
   
    private colorService: ColorService){
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
      this.colorService.get<Color>(this.id).subscribe(result => {
        this.color = result;
        this.title = "Редактировать - " + this.color.name;
      
        this.form.patchValue(this.color);
      }, error => console.error(error));
    }
    else {
  
      this.title = "Добавить новую страну";
    }
  }
  onDelete() {
    this.colorService.delete(this.id).subscribe(res => this.router.navigate(['/countries']), error => console.log(error));
  }
  onSubmit() {
    var color = (this.id) ? this.color : <Color>{};
    color.name = this.form.get("name").value;
   
    if (this.id) {
      // EDIT mode

      this.colorService.put<Color>(color).subscribe(result => {
          console.log("Color " + color.id + " has been updated.");
        
        this.router.navigate(['/colors']);
        }, error => console.log(error));
    }
    else {

      this.colorService.post<Color>(color).subscribe(result => {
          console.log("Color " + result.id + " has been created.");
     
          this.router.navigate(['/colors']);
        }, error => console.log(error));
    }
  }
 

    
  
}
