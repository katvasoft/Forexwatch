import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Select,  Store } from '@ngxs/store';
import { AppState } from './../store/State'
import { Observable } from 'rxjs';

@Injectable()
export class RouteGuard implements CanActivate {
    
    @Select(AppState.IsUserLoggedIn)
    isLoggedIn$: Observable<boolean>

    constructor(private store: Store, private router: Router) {}


    canActivate(): Observable<boolean> {
        console.log('Is logged in ? ', this.isLoggedIn$)
        return this.isLoggedIn$
    }

}