import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInfo } from './service/user-info.service';
import { AdminGuardService } from './guard/admin-guard.service';
import { UserGuardService } from './guard/user-gurad.service';
import { HeaderComponent } from './shared/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [
  ],
  providers: [
    UserInfo,
    AdminGuardService,
    UserGuardService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
