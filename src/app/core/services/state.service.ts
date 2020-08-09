import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class StateApp {

    private subject = new BehaviorSubject({});
    data: any = { state: [] };

    constructor() {
        this.data['state'] = [];
    }

    getObservable(): Observable<any> {
        return this.subject.asObservable();
    }

    setData(value: any) {
        var keyValue = Object.keys(value);
        keyValue.forEach((key) => {
            this.data['state'][key] = value[key];
        })
        this.subject.next(this.data['state']);
    }


}