import { Component, Inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs';

import { BaseFormComponent } from '../base.form.component';
import { BJCPService } from '../bjcp/bjcp.service';
import { Category, Style } from '../bjcp/bjcp';


@Component({
  selector: 'app-style-edit',
  templateUrl: './style-edit.component.html',
  styleUrls: ['./style-edit.component.scss']
})
export class StyleEditComponent extends BaseFormComponent {

  title: string;
  categories: Category[];
  form: FormGroup;
  description: string;
  style: Style;

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
      styleName: ['',
        Validators.required
      ],
      categoryId: [''],
      description: ['']




    });
    this.loadData();
  }
  loadData() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.bjcpService.getStyle<Style>(this.id).subscribe(result => {
        this.style = result;
        this.title = "Редактировать - " + this.style.styleName;

        this.form.patchValue(this.style);
      }, error => console.error(error));
    }
    else {

      this.title = "Добавить новый стиль";
    }
    this.bjcpService.getCategories().subscribe(res => this.categories = res);
  }
  onDelete() {
    this.bjcpService.deleteCategory(this.id).subscribe(res => this.router.navigate(['/categories']), error => console.log(error));
  }
  onSubmit() {
    var style = (this.id) ? this.style : <Style>{};
    style.styleName = this.form.get("styleName").value;
    style.description = this.form.get("description").value;
    style.categoryId = this.form.get("categoryId").value;
    if (this.id) {


      this.bjcpService.putStyle<Style>(style).subscribe(result => {
        console.log("Style " + style.categoryId + " has been updated.");

        this.router.navigate(['/categories']);
      }, error => console.log(error));
    }
    else {

      this.bjcpService.postStyle<Style>(style).subscribe(result => {
        console.log("Style " + result.styleId + " has been created.");

        this.router.navigate(['/categories']);
      }, error => console.log(error));
    }
  }




}
