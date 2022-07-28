import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { from, Observable } from 'rxjs';
import { Color} from './color';

@Injectable({
  providedIn: 'root',
})
export class ColorService
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
    var url = this.baseUrl + 'api/colors';
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
  get<Color>(id): Observable<Color> {
    var url = this.baseUrl + "api/Colors/" + id;
    return this.http.get<Color>(url);
  }
  put<Color>(item): Observable<Color> {
    var url = this.baseUrl + "api/Colors/" + item.id;
    return this.http.put<Color>(url, item);
  }
  post<Color>(item): Observable<Color> {
    var url = this.baseUrl + "api/Colors";
    return this.http.post<Color>(url, item);
  }
  delete<Color>(id): Observable<any> {
    var url = this.baseUrl + "api/Colors/" + id;
    return this.http.delete<Color>(url);
  }


}
