import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, ApiResult } from '../base.service';
import { Observable } from 'rxjs';
import { FilterForm } from '../filter-form/filter-form';
import { FormValue } from '../filter-form/form-value';

import BeautifulDom from 'beautiful-dom';

@Injectable({
  providedIn: 'root',
})
export class ShopParserService {
  constructor(
    private http: HttpClient
  ) { }
  parseLentaShop(htmlDoc: string) {
    //var url = "https://lenta.com/search/?searchText=" + beerName;
    const dom = new BeautifulDom(htmlDoc);
    var data = dom.getElementsByClassName("sku-card-small__title");
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].textContent);
    }
    var prices = dom.getElementsByClassName("square__inner");
    for (var i = 0; i < prices.length; i++) {
      console.log(prices[i].textContent);
    }
  }

  getHtmlPage(url: string): Observable<string> {
    return this.http.get<string>(url);
  }
}
