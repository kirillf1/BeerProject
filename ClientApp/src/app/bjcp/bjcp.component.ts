import { Component, Inject } from '@angular/core';
import { Style,Category } from './bjcp';
//import { MatTableDataSource } from '@angular/material/table';
//import { MatPaginator, PageEvent } from '@angular/material/paginator';
//import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BJCPService } from './bjcp.service';


@Component({
  selector: 'app-bjcp',
  templateUrl: './bjcp.component.html',
  styleUrls: ['./bjcp.component.css']
})
export class BJCPComponent {
  public displayedColumns: string[] = ['категории', 'стили', 'описание'];
  public description: string;
  public categories: Category[];
  public styles: Style[];
  
  constructor(
    private bjcpService: BJCPService) {
  }
  ngOnInit() {
  
  
    this.getCategories();
  }
  public getCategories() {
    this.bjcpService.getCategories().subscribe(result =>
   { this.categories = result; }, error => console.error(error));
 
  }
  public getStyles(categoryName: string) {
    
    

    this.bjcpService.getStyles(categoryName).subscribe((result: Style[]) => { this.styles = result; });
  
  }
  public getDescription(isCategory: boolean, id) {
    if (isCategory)
      this.bjcpService.getCategory(id).subscribe((result: Category) => { this.description = result.description; });
    else
      this.bjcpService.getStyle(id).subscribe((result: Style) => { this.description = result.description; });
   
    
  }
}
