import { NgModule } from '@angular/core';
import { ServerErrPageComponent } from './server-err-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ServerErrPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ServerErrPageComponent}
    ]),
  ],
  entryComponents: [

  ],
  providers: [

  ],
  exports: []
})
export class ServerErrPageModule { }
