import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ NavigationComponent ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  exports: [ NavigationComponent ]
})
export class SharedModule { }
