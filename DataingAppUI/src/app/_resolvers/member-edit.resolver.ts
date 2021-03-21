import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable({ providedIn: 'root' })
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | any {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving your data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
