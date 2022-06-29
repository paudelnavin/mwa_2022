import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule
    // .forRoot([
    //   {path: '', component: HomeComponent},
    //   {path: 'games', component: GamesComponent},
    // ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
