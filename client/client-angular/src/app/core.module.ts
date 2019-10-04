
import { NgModule } from '@angular/core';
import { AdminGuardService } from './guard/admin-guard.service';
import { UserGuardService } from './guard/user-gurad.service';

@NgModule({
  providers: [
    AdminGuardService,
    UserGuardService,
  ],
})
export class CoreModule {

}
