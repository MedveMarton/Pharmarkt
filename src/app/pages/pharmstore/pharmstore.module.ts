import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PharmstoreRoutingModule } from './pharmstore-routing.module';
import { PharmstoreComponent } from './pharmstore.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PharmComponent } from './pharm/pharm.component';
import { ReviewsComponent } from './pharm/reviews/reviews.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    PharmstoreComponent,
    PharmComponent,
    ReviewsComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    PharmstoreRoutingModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatPaginatorModule
  ]
})
export class PharmstoreModule { }
