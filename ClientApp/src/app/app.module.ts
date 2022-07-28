import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BJCPComponent } from './bjcp/bjcp.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { from } from 'rxjs';
import { AngularMaterialModule } from './angular-material.module';
import { TextColorDirective } from './textColor.directive'
import { BeerAdminComponent } from './beers-admin/beer-admin.component';
import { BeerAdminService } from './beers-admin/beer-admin.service';
import { FilterForm } from './filter-form/filter-form';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { BeerEditComponent } from './beers-admin/beer-edit.component';
import { BeerComponent, DialogContent } from './home/beer-component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { BJCPService } from './bjcp/bjcp.service';
import { CountriesComponent } from './country/countries.component';
import { CountryService } from './country/country.service';
import { FactoryService } from './factory/factory.service';
import { FactoriesComponent } from './factory/factories.component';
import { CountryEditComponent } from './country/country-edit.component';
import { ColorService } from './color/color.service';
import { PropertiesService } from './properties.service';
import { FactoryEditComponent } from './factory/factory-edit.component';
import { ColorsComponent } from './color/colors.component';
import { ColorEditComponent } from './color/color-edit.component';
import { CategoriesComponent } from './bjcp-edit/categories.component';
import { CategoryEditComponent } from './bjcp-edit/category-edit.component';
import { StyleEditComponent } from './bjcp-edit/style-edit.component';
import { AuthGuard, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { Role } from './_models';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
 
    FetchDataComponent,
    BJCPComponent,
    TextColorDirective,
    BeerAdminComponent,
    FilterForm, BeerEditComponent
    , BeerComponent, DialogContent, CountriesComponent
    , FactoriesComponent,
    CountryEditComponent, FactoryEditComponent, ColorsComponent, ColorEditComponent
    , CategoriesComponent, CategoryEditComponent, StyleEditComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
 
    
    ReactiveFormsModule, NgxSliderModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: "beer/:id", component: BeerComponent },
      { path: 'bjcp', component: BJCPComponent },
      { path: 'beeradmin', component: BeerAdminComponent },
      { path: 'beeredit/:id', component: BeerEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'beeredit', component: BeerEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'factories', component: FactoriesComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'colors', component: ColorsComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'country/:id', component: CountryEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'country', component: CountryEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'factory/:id', component: FactoryEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'factory', component: FactoryEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'color/:id', component: ColorEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'color', component: ColorEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'category/:id', component: CategoryEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'category', component: CategoryEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'style/:id', component: StyleEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'style', component: StyleEditComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }

     
    ]),
    AngularMaterialModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [BeerAdminService, BJCPService, CountryService, FactoryService, ColorService, PropertiesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogContent
  ]
})
export class AppModule { }
