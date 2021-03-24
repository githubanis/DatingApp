import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ListResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'likers';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> | Promise<User[]> | any {
    return this.userService
      .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        catchError((error) => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
