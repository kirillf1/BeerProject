import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { from, Observable } from 'rxjs';
import { Factory } from './factory';

@Injectable({
  providedIn: 'root',
})
export class FactoryService
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
    var url = this.baseUrl + 'api/factories';
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
  get<Factory>(id): Observable<Factory> {
    var url = this.baseUrl + "api/Factories/" + id;
    return this.http.get<Factory>(url);
  }
  put<Factory>(item): Observable<Factory> {
    var url = this.baseUrl + "api/Factories/" + item.id;
    return this.http.put<Factory>(url, item);
  }
  post<Factory>(item): Observable<Factory> {
    var url = this.baseUrl + "api/Factories";
    return this.http.post<Factory>(url, item);
  }
  delete<Factory>(id): Observable<any> {
    var url = this.baseUrl + "api/Factories/" + id;
    return this.http.delete<Factory>(url);
  }
 

}
