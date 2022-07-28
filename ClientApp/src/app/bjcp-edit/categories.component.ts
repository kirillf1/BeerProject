import { Component, Inject, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ApiResult } from '../base.service';
import { BJCP } from '../bjcp/bjcp';
import { BJCPService } from '../bjcp/bjcp.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  public displayedColumns: string[] = ['Id', 'Название категории', 'Количество пива','Стили'];
  public bjcps: MatTableDataSource<BJCP>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private bjcpService: BJCPService) {
  }
  ngOnInit() {
    this.loadData(null);
  }
  loadData(query: string = null) {
   this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = this.defaultPageIndex;
    this.pageEvent.pageSize = this.defaultPageSize;
    
    this.getData(this.pageEvent);
  }
  getData(event: PageEvent) {
   
    this.bjcpService.getData<ApiResult<BJCP>>(
      event.pageIndex,
      event.pageSize,
     )
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.bjcps = new MatTableDataSource<BJCP>(result.data);
      }, error => console.error(error));
  }

}
