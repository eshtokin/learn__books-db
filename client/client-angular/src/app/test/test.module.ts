import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
import { ChildComponent } from './child/child.component';
import { Child2Component } from './child2/child2.component';
import { Child3Component } from './child3/child3.component';
import { TestsharedModule } from '../testshared/testshared.module';



@NgModule({
  declarations: [
    TestComponent,
    ChildComponent,
    Child2Component,
  ],
  imports: [
    CommonModule,
    TestsharedModule,
    RouterModule.forChild([
      { path: '', component: TestComponent },
      { path: 'c1', component: ChildComponent },
      { path: 'c2', component: Child2Component },
      { path: 'c3', loadChildren: () => import('./child3/child3.module').then(m => m.Child3Module) },
    ])
  ]
})
export class TestModule { }
