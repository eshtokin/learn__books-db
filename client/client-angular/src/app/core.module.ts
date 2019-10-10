import { NgModule } from '@angular/core';
import { AdminGuardService } from 'src/app/guard/admin-guard.service';
import { UserGuardService } from 'src/app/guard/user-gurad.service';

@NgModule({
  providers: [
    AdminGuardService,
    UserGuardService,
  ],
})
export class CoreModule {

}
