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
import { ViewPlantsComponent } from './view-plants/view-plants.component';
import { EditPlantComponent } from './edit-plant/edit-plant.component';
import { AddPlantComponent } from './add-plant/add-plant.component';

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
    ViewPlantsComponent,
    EditPlantComponent,
    AddPlantComponent
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
        path:"gethikings",
        component: HikingsComponent
      },
      {
        path:"gethikings/:hikingId",
        component: HikingComponent
      },
      {
        path:"gethikings/:hikingId/getplants",
        component: ViewPlantsComponent
      },
      {
        path:"addhikings",
        component: AddHikingComponent
      },
      {
        path:"gethikings/:hikingId/addplants",
        component: AddPlantComponent
      },
      {
        path:"gethikings/:hikingId/editplants/:plantId",
        component: EditPlantComponent
      },
      {
        path:"edithikings/:hikingId",
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
