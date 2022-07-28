import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { Observable } from 'rxjs';

import { Category, Style } from './bjcp';

@Injectable({
  providedIn: 'root',
})
export class BJCPService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
   
  }
  getData<ApiResult>(
    pageIndex: number,
    pageSize: number,
    


  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/bjcp';
    var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      


    return this.http.get<ApiResult>(url, { params });
  }
 
  getStyle<Style>(id): Observable<Style> {
    var url = this.baseUrl + "api/Styles/" + id;
    return this.http.get<Style>(url);
  }
  putStyle<Style>(item): Observable<Style> {
    var url = this.baseUrl + "api/Styles/" + item.styleId;
    return this.http.put<Style>(url, item);
  }
  postStyle<Style>(item): Observable<Style> {
    var url = this.baseUrl + "api/Styles";
    return this.http.post<Style>(url, item);
  }
  deleteStyle<Style>(id): Observable<any> {
    var url = this.baseUrl + "api/Styles/" + id;
    return this.http.delete<Style>(url);
  }
  getCategory<Category>(id): Observable<Category> {
    var url = this.baseUrl + "api/Categories/" + id;
    return this.http.get<Category>(url);
  }
  putCategory<Category>(item): Observable<Category> {
    var url = this.baseUrl + "api/Categories/" + item.categoryId;
    return this.http.put<Category>(url, item);
  }
  postCategory<Category>(item): Observable<Category> {
    var url = this.baseUrl + "api/Categories";
    return this.http.post<Category>(url, item);
  }
  deleteCategory<Category>(id): Observable<any> {
    var url = this.baseUrl + "api/Categories/" + id;
    return this.http.delete<Category>(url);
  }
  
  public getCategories(): Observable<Category[]> {
    var url = this.baseUrl + 'api/bjcp/Categories';

    return this.http.get<Category[]>(url);

  }
  public getStylesByCategoryID(categoryId: number): Observable<Style[]> {
    var url = this.baseUrl + 'api/BJCP/StylesById';
   

    var params = new HttpParams().set("categoryId", String(categoryId));
     return this.http.get<Style[]>(url, { params })
       

     
    
  }
  public getCategoryByStyleId(styleId: number): Observable<Category> {
    var url = this.baseUrl + 'api/BJCP/CategoryById';
   
    

    var params = new HttpParams().set("styleId", String(styleId));
    return this.http.get<Category>(url, { params });
    }
  
  public getStyles(categoryName: string): Observable<Style[]> {

    var url = this.baseUrl + 'api/BJCP/Styles';
    var params = new HttpParams().set("categoryName", categoryName);

    return this.http.get<Style[]>(url, { params });

  }
  //public getDescription(isCategory: boolean, id: number): Observable {
  //  var description = "";
  //  if (isCategory)
  //   return this.getCategory(id).subscribe((result: Category) => { description = result.description; });
  //  else
  //  return  this.getStyle(id).subscribe((result: Style) => { description = result.description; });
  
  //}
  
}
