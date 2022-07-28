import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { BeerAdminService } from './beer-admin.service';



import { BeerForm } from './beer-form';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Style } from '../bjcp/bjcp';
import { BaseFormComponent } from '../base.form.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { PropertiesService } from '../properties.service';
import { Country } from '../country/country';
import { Color } from '../color/color';
import { Factory } from '../factory/factory';



@Component({
  selector: 'app-beerEdit',
  templateUrl: './beer-edit.component.html',
  styleUrls: ['./beer-edit.component.scss']
})
export class BeerEditComponent extends BaseFormComponent {
  form: FormGroup;
 
  beer: BeerForm;
  Countries: Country[];
  Colors: Color[];
  Factories: Factory[];
  styles: Style[];
  categories: Category[];
  id?: number;
  title: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, private propService: PropertiesService, 
    private beerService: BeerAdminService) {
    super();
  }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      styleId: new FormControl(null, [
      ]),
      categoryId: new FormControl(null, [
      ]),
      factoryId: new FormControl('', [
      ]),
      filtration: new FormControl(true, [
      ]),
      pasterisation: new FormControl(false, [
      ]),
      description: new FormControl('', [
      ]),
      rating: new FormControl(0, [
      ]),
      taste: new FormControl('', [
      ]),
      isLocalShop: new FormControl(false, [
      ]),
      bitterness: new FormControl(0, []),
      initialWort: new FormControl(0, []),
      countryId: new FormControl('', []),
      colorId: new FormControl('', []),
      price: new FormControl(0, []),
      alcohol: new FormControl(0, []),
      photoId: new FormControl('', [])

    }, null, this.isDupeBeer());
    this.loadBeer();
    this.propService.getCountries().subscribe(res => this.Countries = res.data, error => console.log(error));
    this.propService.getColors().subscribe(res => this.Colors = res.data, error => console.log(error));
    this.propService.getFactories().subscribe(res => this.Factories = res.data, error => console.log(error));
  }
  changeProp(propName: string, select: MatSelect) {
    select.value = this.form.controls[propName].value;
  }
 
  onSubmit() {
    console.log(this.form.controls);
    var props = Object.keys(this.form.controls);
    for (var i = 0; i < props.length; i++) {
      if (this.form.controls[props[i]].value != null || this.form.controls[props[i]].value !="") {
        this.beer[props[i]] = this.form.controls[props[i]].value;
      }
     

    }
   
    if (this.id) {
      this.beerService.put(this.beer).subscribe(res => {

        window.alert("Пиво успешно изменено!");
        this.router.navigate(['/beeradmin']);
      }, error => { window.alert("произошла ошибка, проверьте правильность данных"); console.error(error) });
      console.log(this.beer);
    }
    else {
      
      this.beerService
        .post<BeerForm>(this.beer).subscribe(result => {
          window.alert("Пиво успешно добавлено!");
        
          this.router.navigate(['/beeradmin']);
        }, error => console.log(error));
    }
    }
  
  loadBeer() {

    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategories();
    if (this.id) {
      
      this.beerService.get<BeerForm>(this.id).subscribe((result:BeerForm) => {
        this.beer = result;
        this.title = "Изменить - " + this.beer.name;
        this.form.patchValue(this.beer);
       
        console.log(this.beer);
        this.getStyles(this.beer.categoryId);
      }, error => console.error(error));
     
    }
    else {

      this.beer = <BeerForm>{};
      //this.beer.beerId = 0;
      this.form.patchValue(this.beer);
      this.title = "Создать новое пиво";
    }

  }
  //loadProp(propName: string): Observable<string[]> {
  //  var url = this.baseUrl + "api/properties?propName=" + propName;
  //  return this.http.get<string[]>(url);
  //}
 
  changeCategory() {
   
    var val = this.getValue('styleId');
    if (val) {

      this.propService.getCategory(val).subscribe((result: Category) => {
        
        this.form.controls['categoryId'].setValue(result.categoryId);
       
      });
    }
  }
  changeStyle() {


    var val = this.getValue('categoryId');
    if (val) {
      //this.form.controls['styleId'].setValue(null);

      this.propService.getStylesByCategId(val).subscribe((result: Style[]) => {
        this.styles = result;

      });
    }
  }
  public getStyles(categoryId: number) {

    if (!categoryId)
      this.propService.getStyles(null).subscribe((result: Style[]) => { this.styles = result; });
      else
    this.propService.getStylesByCategId(categoryId).subscribe((result: Style[]) => { this.styles = result; });

  }
  
  public getCategories() {
   

    this.propService.getCategories().subscribe(result => { this.categories = result; }, error => console.error(error));

  }
  isDupeBeer(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {
      var beerForm = <BeerForm>{};
     
      //beerForm.name = this.form.get("name").value;
      //beerForm.country = this.form.get("country").value;

      return this.beerService.isDupeBeer(beerForm)
        .pipe(map(result => {
          return (result ? { isDupeBeer: true } : null);
        }));

    }
  }
  buildSliderOpt(sliderName: string): Options {
    var ceil;
    
    var minStr;
    var floor;
    var step;
    switch (sliderName) {
      case "price":
        floor = 0;
        ceil = 2000;
        step = 1;
       
        minStr = "<b > цена:</b> руб. "
        break;
      case "alcohol":
        floor = 0;
        ceil = 25;
        step = 1;
        minStr = "<b> алкоголь:</b> в % ";
       
        break;
      case "rating":
        floor = 0;
        ceil = 10;
        step = 1;
        minStr = "<b> рейтинг:</b> ";
        break;
      case "bitterness":
        floor = 0;
        ceil = 300;
        step = 1;
        minStr = "<b> горечь:</b>  ";
        break;
      case "initialWort":
        floor = 0;
        ceil = 80;
        step = 1;
        minStr = "<b> экстративность сусла:</b> в % ";
        break;
      default:
    }
    var options = {
      floor: floor,
      ceil: ceil,
      step: step,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `<div>${minStr + value} </div>`;
          
          default:
            return /*`<div style='font-size:0.5em'>руб. ${value}</div>`;*/ "";
        }
      }
    };
    return options;
  }
  deleteBeer() {
    if (window.confirm("Вы точно хотите удалить " + this.beer.name)) {
      this.beerService.delete(this.id).subscribe(res => {
        window.alert("Пиво успешно удалено!");
    
        this.router.navigate(['/beeradmin']);
      }, error => { window.alert("произошла ошибка, проверьте правильность данных"); console.error(error) });
    }
  }
}
