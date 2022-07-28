import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
//import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatExpansionModule, MatRadioModule,
    MatCheckboxModule, MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    //MatSliderModule 
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    MatExpansionModule, MatRadioModule,
    MatCheckboxModule, MatButtonModule
    , MatIconModule,
    MatMenuModule,
    MatDialogModule,
  ]
})
export class AngularMaterialModule { }
