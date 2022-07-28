import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { Observable } from 'rxjs';
import { FilterForm } from '../filter-form/filter-form';
import { FormValue } from '../filter-form/form-value';

@Injectable({
  providedIn: 'root',
})
export class BeerAdminService
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
    FormValue: FormValue = null,
   
  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/beers/getbeers';
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
    if (FormValue != null && FormValue !== undefined) {
      var props = Object.keys(FormValue);
      for (var i = 0; i < props.length; i++) {
     
          params = params.set(props[i], FormValue[props[i]]);
        
      }
    }
    return this.http.get<ApiResult>(url, { params });
  }
  get<BeerForm>(id): Observable<BeerForm> {
    var url = this.baseUrl + "api/Beers/GetBeerAdm?id=" + id;
    return this.http.get<BeerForm>(url);
  }
  put<BeerForm>(item): Observable<BeerForm> {
    var url = this.baseUrl + "api/Beers/" + item.beerId;
    return this.http.put<BeerForm>(url, item);
  }
  post<BeerForm>(item): Observable<BeerForm> {
    var url = this.baseUrl + "api/Beers";
    return this.http.post<BeerForm>(url, item);
  }
  delete<BeerForm>(id): Observable<any> {
    var url = this.baseUrl + "api/Beers/" + id;
    return this.http.delete<BeerForm>(url);
  }
  isDupeBeer(item): Observable<boolean> {
    var url = this.baseUrl + "api/Beers/IsDupeBeer";
    return this.http.post<boolean>(url, item);
  }

}
