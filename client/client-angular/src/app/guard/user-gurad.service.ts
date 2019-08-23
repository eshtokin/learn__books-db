import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserInfo } from '../service/user-info.service';


@Injectable()
export class UserGuardService implements CanActivate {
    constructor(private userInfo: UserInfo) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.userInfo.getCurrentUser();
      if (currentUser.role === 1) {
        return true;
      }

      if (currentUser.role === 2) {
        return true;
      }

      return false;
    }
}
