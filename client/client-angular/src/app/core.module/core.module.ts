import { NgModule } from '@angular/core';
import { AdminGuardService } from 'src/app/core.module/guard/admin-guard.service';
import { UserGuardService } from 'src/app/core.module/guard/user-gurad.service';

@NgModule({
  providers: [
    AdminGuardService,
    UserGuardService,
  ],
})
export class CoreModule {

}
