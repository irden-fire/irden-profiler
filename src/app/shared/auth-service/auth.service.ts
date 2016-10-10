// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```

// # Recipe Service

import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../app.service';
import {UsersService} from '../../user/users.service';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/X-www-form-urlencoded'
  })
};

@Injectable()
export class AuthService {

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(  private http: Http,
                private appState: AppState,
                private usersService: UsersService
                ) {

    // Bind an observable of our `Users` to `UserService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    // this.user = store.select('Users');
  }

  isLoggedIn() {
      return this.appState.get('isLoggedIn');
  }

  getCureentUser() {
      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                return {
                            userName: success.json().username,
                            userId: success.json()._id
                    }
                },
            error =>  console.log(<any>error.text())
          );
  }
}
