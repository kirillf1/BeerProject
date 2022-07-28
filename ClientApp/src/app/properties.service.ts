import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { FactoryService } from './factory/factory.service';
import { ApiResult } from './base.service';
import { Factory } from './factory/factory';
import { CountryService } from './country/country.service';
import { Country } from './country/country';
import { Color } from './color/color';
import { ColorService } from './color/color.service';
import { BJCPService } from './bjcp/bjcp.service';
import { Category, Style } from './bjcp/bjcp';



@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(
     private factoryService: FactoryService, private countryService: CountryService,
    private colorService: ColorService, private bjcpService: BJCPService
  ) {

  }
  public getFactories(): Observable<ApiResult<Factory>> {

   return  this.factoryService.getData<ApiResult<Factory>>(0, 10000, "name", "asc", null, null);
  }
  public getCountries(): Observable<ApiResult<Country>> {


   return this.countryService.getData<ApiResult<Country>>(0, 300, "name", "asc", null, null);
    

  }
  public getColors(): Observable<ApiResult<Color>> {
    return this.colorService.getData(0, 255, "name", "asc", null, null);
  }
  public getStyles(categoryName: string): Observable<Style[]> {
  return  this.bjcpService.getStyles(categoryName);
  }
  public getCategories(): Observable<Category[]> {
    return this.bjcpService.getCategories();
  }
  public getCategory(styleId: number): Observable<Category> {
    return this.bjcpService.getCategoryByStyleId(styleId);
  }
  public getStylesByCategId(categoryId: number) {
    return this.bjcpService.getStylesByCategoryID(categoryId);
  }

}
