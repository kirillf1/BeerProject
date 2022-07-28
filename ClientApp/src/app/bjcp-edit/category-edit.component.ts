import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';

import { BaseFormComponent } from '../base.form.component';
import { BJCPService } from '../bjcp/bjcp.service';
import { Category } from '../bjcp/bjcp';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent extends BaseFormComponent {

  title: string;

  form: FormGroup;
  description: string;
  category: Category;

  id?: number;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private bjcpService: BJCPService) {
    super();

  }
  open() {
   this.description = this.form.get("description").value;
  }
  ngOnInit() {
    this.form = this.fb.group({
       categoryName: ['',
        Validators.required
      ],
      description: ['']
      



    });
    this.loadData();
  }
  loadData() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.bjcpService.getCategory<Category>(this.id).subscribe(result => {
        this.category = result;
        this.title = "Редактировать - " + this.category.categoryName;

        this.form.patchValue(this.category);
      }, error => console.error(error));
    }
    else {

      this.title = "Добавить новую категорию";
    }
  }
  onDelete() {
    this.bjcpService.deleteCategory(this.id).subscribe(res => this.router.navigate(['/categories']), error => console.log(error));
  }
  onSubmit() {
    var category = (this.id) ? this.category : <Category>{};
    category.categoryName = this.form.get("categoryName").value;
    category.description = this.form.get("description").value;
    if (this.id) {
   

      this.bjcpService.putCategory<Category>(category).subscribe(result => {
        console.log("category " + category.categoryId + " has been updated.");

        this.router.navigate(['/categories']);
      }, error => console.log(error));
    }
    else {

      this.bjcpService.postCategory<Category>(category).subscribe(result => {
        console.log("Category " + result.categoryId + " has been created.");

        this.router.navigate(['/categories']);
      }, error => console.log(error));
    }
  }




}
