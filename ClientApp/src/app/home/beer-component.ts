import { Component, Inject, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Category, Style } from '../bjcp/bjcp';
import { BaseFormComponent } from '../base.form.component';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { LabelType, Options } from '@angular-slider/ngx-slider';


import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';
import { ShopParserService } from './shop-parser-service';
import { BeerView } from './beerView';
import { BJCPService } from '../bjcp/bjcp.service';


@Component({
  selector: 'app-beer',
  templateUrl: './beer-component.html',
  styleUrls: ['./beer-component.scss']
})
export class BeerComponent {
  id: number;
  beer: BeerView;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    public dialog: MatDialog, private shopService: ShopParserService ) {
  }
  openDialog(styleId: number, isCategory: boolean) {
    console.log("opened");
    var val = this.dialog.open(DialogContent, { data: { id: styleId, isCategory: isCategory } });
   
}
  ngOnInit() {
    this.loadBeer();
    //https://lenta.com/search/?searchText=" + "Балтика 9"
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = "https://krasnoeibeloe.ru/catalog/?q=" + "Балтика 9"; // site that doesn’t send Access-Control-*
    //fetch(proxyurl + url)
    //  .then(response => (response.text())
    //    .then(contents => console.log(contents)))
    //  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }
  loadBeer() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    
    var url = this.baseUrl + "api/Beers/" + this.id;
    return this.http.get<BeerView>(url).subscribe(res => { this.beer = res; console.log(this.beer) }, error => console.error(error));
  }
 
}
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
  styleUrls: ['./beer-component.scss']
})
export class DialogContent {
  constructor(
    private bjcpService: BJCPService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  description: string;
  ngOnInit() {
    if (this.data.isCategory)
      this.bjcpService.getCategory(this.data.id).subscribe((result: Category) => { this.description = result.description; });
    else
      this.bjcpService.getStyle(this.data.id).subscribe((result: Style) => { this.description = result.description; });
    
  }
  
}
export interface DialogData {
  id;
  isCategory: boolean;
}
