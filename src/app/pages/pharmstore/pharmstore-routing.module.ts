import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmstoreComponent } from './pharmstore.component';
import { PharmComponent } from './pharm/pharm.component';

const routes: Routes = [
  {path: '', component: PharmstoreComponent},
  {path: 'pharm/:PharmId', component: PharmComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmstoreRoutingModule { }
