import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInfo } from './service/user-info.service';
import { AdminGuardService } from './guard/admin-guard.service';
import { UserGuardService } from './guard/user-gurad.service';
import { CatalogModule } from './shared/catalog/catalog.module';
import { BooksManagerModule } from './admin/books-manager/books-manager.module';
import { SharedModule } from './shared/shared.module';
import { UserManagerModule } from './admin/user-manager/user-manager.module';
import { ProfileModule } from './shared/profile/profile.module';
import { AuthFormModule } from './auth-form/auth-form.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    SharedModule,
    UserManagerModule,
    CatalogModule,
    BooksManagerModule,
    ProfileModule,
    AuthFormModule
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
