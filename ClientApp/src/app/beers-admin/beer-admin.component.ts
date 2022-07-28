import { Component, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { BeerAdminService } from './beer-admin.service';
import { ApiResult } from '../base.service';
import { Beer } from '../beer';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewportScroller } from '@angular/common';


import { FilterForm } from '../filter-form/filter-form';
import { FormValue } from '../filter-form/form-value';
import { Router } from '@angular/router';
import { BeersState } from './stateBeers';
import { MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-beerAdmin',
  templateUrl: './beer-admin.component.html',
  styleUrls: ['./beer-admin.component.scss']
})
export class BeerAdminComponent {
  @Input('isUser') isUser: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(FilterForm) form: FilterForm;
  @ViewChild("sidenav") sidenav: MatSidenav;
  value: FormValue;
  
  pageEvent: PageEvent;
  public beers: Beer[];
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: string = "asc";
  defaultFilterColumn: string = "name";
  isEnd: boolean;
  filterQuery: string = null;
  sorts  = [
    { value: 'name', viewValue: 'По имени' },
    { value: 'country', viewValue: 'По стране' },
    { value: 'price', viewValue: 'По цене' },
    { value: 'alcohol', viewValue: "По алкоголю" },
    { value: 'rating', viewValue: "По рейтингу" },
    { value: 'factory', viewValue: "По производителю" }

  ];
  orders = [{ value: 'DESC', viewValue: 'По убыванию' },
    { value: 'asc', viewValue: 'По возрастанию' },];
  constructor(
    private beerService: BeerAdminService, private viewportScroller: ViewportScroller,
    private router: Router, private cdr: ChangeDetectorRef) {
   
  }
  sortChanged() {
    this.getValue(this.value);
  }
  ngOnInit() {
    this.isUser = this.isUser !== undefined;
    if (!this.isUser) {
      this.sorts.push({ value: "photoId", viewValue: "По фото"});
    }
    this.loadData();
    
    
  }
  public ngAfterViewInit() {
    this.paginator._intl.firstPageLabel = 'первая страница';
  
    this.paginator._intl.lastPageLabel = 'последняя страница';
    this.paginator._intl.nextPageLabel = 'следующая страница';
    this.paginator._intl.previousPageLabel = 'прошлая страница';
    this.paginator._intl.itemsPerPageLabel = 'Количество пива на странице';
    if (BeersState.filterOpened) {
      
      this.sidenav.toggle();
    }
    this.cdr.detectChanges();
   
  }
  ngOnDestroy() {
    BeersState.pageEvent = this.pageEvent;
    BeersState.formValue = this.value;
    BeersState.filterOpened = this.sidenav.opened;
  }
  loadData() {
    
    if (BeersState.pageEvent)
      this.pageEvent = BeersState.pageEvent;
    else {
      this.pageEvent = new PageEvent();
      this.pageEvent.pageIndex = this.defaultPageIndex;
      this.pageEvent.pageSize = this.defaultPageSize;
    }
    if (BeersState.formValue) {
      this.value = BeersState.formValue;
    }
   
    this.getData(this.pageEvent);
    
  }
  addBeer() {
    this.router.navigate(['/beeredit']);

    
  }
  getValue(form: FormValue) {
    this.beers = undefined;
    this.value = form;
    console.log(this.form.value);
    var filterColumn = (this.filterQuery)
      ? this.defaultFilterColumn
      : null;
    var filterQuery = (this.filterQuery)
      ? this.filterQuery
      : null;
    this.beerService.getData<ApiResult<Beer>>(
      this.defaultPageIndex,
      this.defaultPageSize ,
      this.defaultSortColumn,
      this.defaultSortOrder,
      filterColumn,
      filterQuery,form)
      .subscribe(result => {

        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.beers = (result.data);

      }, error => console.error(error));
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getData(event: PageEvent) {
    this.beers = undefined;
    this.pageEvent = event;
    this.defaultPageSize = event.pageSize;
    var filterColumn = (this.filterQuery)
      ? this.defaultFilterColumn
      : null;
    var filterQuery = (this.filterQuery)
      ? this.filterQuery
      : null;
    this.beerService.getData<ApiResult<Beer>>(
      event.pageIndex,
      event.pageSize,
      this.defaultSortColumn,
      this.defaultSortOrder,
      filterColumn,
      filterQuery, this.value)
      .subscribe(result => {
        this.beers = null;
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.beers = result.data;
       
      }, error => console.error(error));
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let scroll = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0;

    const max = document.documentElement.scrollHeight -
      document.documentElement.clientHeight -100;
   
    if (scroll >= max ) {
      this.isEnd = true;
    
    }
    else {

      this.isEnd = false;
    }
  }
  
}
