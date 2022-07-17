import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorsComponent } from './colors/colors.component';
import { UtilitiesRoutingModule } from './utilities-routing.module';

@NgModule({
  declarations: [ColorsComponent],
  imports: [CommonModule, UtilitiesRoutingModule],
})
export class UtilitiesModule {}
