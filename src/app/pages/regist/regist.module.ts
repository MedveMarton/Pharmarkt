import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistRoutingModule } from './regist-routing.module';
import { RegistComponent } from './regist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [
    RegistComponent
  ],
  imports: [
    CommonModule,
    RegistRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule
  ]
})
export class RegistModule { }
