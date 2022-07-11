import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HikingsComponent } from './hikings/hikings.component';
import { HikingComponent } from './hiking/hiking.component';
import { EditHikingComponent } from './edit.hiking/edit.hiking.component';
import { AddHikingComponent } from './add.hiking/add.hiking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { RoutePlantsComponent } from './route-plants/route-plants.component';
import { ViewPlantsComponent } from './view-plants/view-plants.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    HikingsComponent,
    HikingComponent,
    EditHikingComponent,
    AddHikingComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    RoutePlantsComponent,
    ViewPlantsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"getRoutes",
        component: HikingsComponent
      },
      {
        path:"routes/:routeId/getPlants",
        component: ViewPlantsComponent
      },
      {
        path:"getRoutes/:routeId",
        component: HikingComponent
      },
      {
        path:"addRoutes",
        component: AddHikingComponent
      },
      {
        path:"routes/:routeId/addPlants",
        component: RoutePlantsComponent
      },
      {
        path:"editRoutes/:routeId",
        component: EditHikingComponent
      },
      {
        path:"register",
        component: RegisterComponent
      },
      {
        path:"login",
        component: LoginComponent
      },
      {
        path:"searchplants",
        component: SearchComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
