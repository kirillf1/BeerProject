
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';
import { BaseFormComponent } from '../base.form.component';
import { ApiResult } from '../base.service';
import { Beer } from '../beer';
import { BeerAdminService } from '../beers-admin/beer-admin.service';
import { BeersState } from '../beers-admin/stateBeers';
import { Category, Style } from '../bjcp/bjcp';
import { Color } from '../color/color';
import { Country } from '../country/country';
import { Factory } from '../factory/factory';
import { PropertiesService } from '../properties.service';
import { FormValue } from './form-value';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'filter-form',
  templateUrl: 'filter-form.html',
  styleUrls: ['filter-form.scss'],
})
export class FilterForm extends BaseFormComponent {
  props: string[];
  title: string;
 
  priceRange;
  minValue: number = 100;
  maxValue: number = 400;
  @Output() onChanged = new EventEmitter<FormValue>();
  form: FormGroup;
  Categories: Category[];
  Styles: Style[];
  Countries: Country[];
  Factories: Factory[];
  Colors: Color[];
  value: FormValue = new FormValue();
  constructor(
    private propsService: PropertiesService) {
    super();

  }
 

  showFiller = false;
  refreshForm() {
    var props = Object.keys(this.form.controls);
    for (var i = 0; i < props.length; i++) {
      this.form.controls[props[i]].setValue(null);
    }
  }
  createForm() {
    this.form = new FormGroup({
      "factoryId": new FormControl(),
      "countryId": new FormControl(),
      "colorId": new FormControl(),
      "categoryId": new FormControl(),
      "styleId": new FormControl(),
      "minBitterness": new FormControl(),
      "maxPrice": new FormControl(),
      "minPrice": new FormControl(),
      "minAlcohol": new FormControl(),
      "maxAlcohol": new FormControl(),
      "filtration": new FormControl(),
      "name": new FormControl(null, []),
      "isLocalShop": new FormControl(null, []),
      "pasterisation": new FormControl(null,[])
    });
  }
  ngOnInit() {
    this.createForm();
    if (BeersState.formValue) {
      this.value = BeersState.formValue;
      this.form.patchValue(this.value);
    }
   
  }
  opened(propName: string) {
    //var prop = propName.split(',');
    //for (var i = 0; i < prop.length; i++) {
    //  if (this[prop[i]].length==0) {
    //    this.loadProp(prop[i]).subscribe(res => this[prop[i]]=res);
    //}
    //}
    switch (propName) {
      case "Category":
        if (!this.Styles || !this.Categories) {
          this.propsService.getCategories().subscribe(res => this.Categories = res);
          this.propsService.getStyles(null).subscribe(res => this.Styles = res);
        }
        break;
      case "Country":
        if (!this.Countries || !this.Factories) {
          this.propsService.getFactories().subscribe(res => this.Factories = res.data);
          this.propsService.getColors().subscribe(res => this.Colors = res.data);
          this.propsService.getCountries().subscribe(res => this.Countries = res.data);
         
        }
        break;
      case "Price":
        if (!this.form.controls['maxPrice'].value) {
          this.form.controls['minPrice'].setValue(0);
          this.form.controls['maxPrice'].setValue(2000);
          this.form.controls['minAlcohol'].setValue(0);
          this.form.controls['maxAlcohol'].setValue(25);
        }
      
      //  break;
      default:
    }
    //if (this[propName].length==0) {
    //  this.loadProp(propName).subscribe(res => this[propName]=res);
    //}
    
  }
  //loadProp(propName: string): Observable<string[]> {
  //  var url = this.baseUrl + "api/properties?propName=" + propName;
  //  return this.http.get <string[]>(url);
  //}
  onSubmit() {
    // цифровые значения из формы бери
    this.value = new FormValue();
    var props = Object.keys(this.form.controls);
    for (var i = 0; i < props.length; i++) {
      if (this.form.controls[props[i]].value != null) {
        if (typeof this.form.controls[props[i]].value === "object") {
          if (this.form.controls[props[i]].value.length > 0) {
            
            this.value[props[i]] = this.getValue(props[i]);
           
          }
        }
        else {
          this.value[props[i]] = this.getValue(props[i]);
          
        }
      }
    }
    this.onChanged.emit(this.value);
   
  }

  changeStyle() {

    
    var val = this.getValue('categoryId');
    if (val != null) {
      this.form.controls['styleId'].setValue(null);

      this.propsService.getStylesByCategId(val).subscribe((result: Style[]) => {
        this.Styles = result;

      });
    }
  }
  buildSliderOpt(sliderName: string): Options {
    var ceil;
    var maxStr;
    var minStr;
    var floor;
    var step;
    switch (sliderName) {
      case "price":
        floor = 0;
        ceil = 2000;
        step = 50;
        maxStr = "<b >макс. цена:</b> руб. ";
        minStr = "<b >мин. цена:</b> руб. "
        break;
      case "alcohol":
        floor = 0;
        ceil = 25;
        step = 1;
        maxStr = "<b>макс. алкоголь:</b> % ";
        minStr = "<b>мин. алкоголь:</b> % "
        break;
      
      default:
    }
    var options = {
      floor: floor,
      ceil: ceil,
      step :step,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `<div>${minStr + value}</div>`;
          case LabelType.High:
            return /*maxStr + value;*/ `<div>${maxStr + value}</div>`;
          default:
            return /*`<div style='font-size:0.5em'>руб. ${value}</div>`;*/ "";
        }
      }
    };
    return options;
  }
}
