import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { UserStore } from './store/user.store';
import { UserService } from './service/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AkitaNgRouterStoreModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserStore, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
