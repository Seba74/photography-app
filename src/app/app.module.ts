import { isDevMode, NgModule } from '@angular/core';
// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Store Modules
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/app.state';
import { PhotoEffect } from './state/effects/photo.effect';

// App Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

// Components and others services



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    // Angular Modules
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,

    // Store Modules
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ name: 'Photography App', logOnly: isDevMode()}),
    EffectsModule.forRoot([PhotoEffect]),

    // App Modules
    SharedModule,
    ComponentsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
