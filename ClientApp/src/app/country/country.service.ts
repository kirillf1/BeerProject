import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { from, Observable } from 'rxjs';

import { Country } from './country';
@Injectable({
  providedIn: 'root',
})
export class CountryService
  extends BaseService {
  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }
  getData<ApiResult>(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string,
    filterQuery: string,
    

  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/countries';
    var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder)
    if (filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }
    
    
    return this.http.get<ApiResult>(url, { params });
  }
  get<Country>(id): Observable<Country> {
    var url = this.baseUrl + "api/Countries/" + id;
    return this.http.get<Country>(url);
  }
  put<Country>(item): Observable<Country> {
    var url = this.baseUrl + "api/Countries/" + item.id;
    return this.http.put<Country>(url, item);
  }
  post<Country>(item): Observable<Country> {
    var url = this.baseUrl + "api/Countries";
    return this.http.post<Country>(url, item);
  }
  delete<Country>(id): Observable<any> {
    var url = this.baseUrl + "api/Countries/" + id;
    return this.http.delete<Country>(url);
  }
 

}
