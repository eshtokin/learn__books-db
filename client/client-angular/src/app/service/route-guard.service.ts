import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserInfo } from './user-info.service';


@Injectable()
export class RouteGuard implements CanActivate {
    constructor(private userInfo: UserInfo) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userInfo.getStatus();
    }
}
