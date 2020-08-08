import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as sjcl from 'sjcl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { FormsModule } from "@angular/forms";


const secretKey = environment.secretKey;

Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function (key, value) {
  try {
    const cryptoValue = sjcl.encrypt(secretKey, JSON.stringify(value));
    this._setItem(key, cryptoValue);
  } catch (error) {
    const cryptoValue = sjcl.encrypt(secretKey, value);
    this._setItem(key, cryptoValue);
  }
};

Storage.prototype._getItem = Storage.prototype.getItem;
Storage.prototype.getItem = function (key) {
  try {
    const crytoValue = JSON.parse(this._getItem(key));
    if (crytoValue) {
      const value = sjcl.decrypt(secretKey, crytoValue).toString();
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } else {
      return null;
    }
  } catch (e) {
    const crytoValue = this._getItem(key);
    if (crytoValue) {
      const value = sjcl.decrypt(secretKey, crytoValue).toString();
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } else {
      return null;
    }
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
