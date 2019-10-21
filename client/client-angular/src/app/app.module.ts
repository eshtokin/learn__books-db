import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { UserInfo } from 'src/app/services/user-info.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CoreModule } from 'src/app/core.module/core.module';
import {ErrorService} from './services/error.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    UserInfo,
    ErrorService
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule {

}
