// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```

// *src/app/app.ts*

// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {AppState} from './app.service';

import {RouterActive} from './shared/directives/router-active/router-active.directive';

import {Home} from './home';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Import Expenses component
import {Expenses} from './expenses/expenses.component';

import {Signup} from './user/user-signup.component';
import {Login} from './user/user-login.component';

import {UsersService} from './user/users.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [  ],
  directives: [ NgFor,
                RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Home'] ">
            Главная
          </button>
          <button md-button router-active [routerLink]=" ['Signup'] ">
            Signup
          </button>
          <button md-button router-active [routerLink]=" ['Login'] ">
            Login
          </button>
          <button md-button router-active [routerLink]=" ['Expense'] ">
            Расходы
          </button>
          <button md-button (click)="usersService.logout()"
                  [routerLink]=" ['Login'] "
          >
            Logout
          </button>
      </md-toolbar>

      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading">
      </md-progress-bar>

      <router-outlet></router-outlet>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
        <img [src]="angularLogo" width="7%">
        <span>Irden fire theater page</span>
      </footer>
    </md-content>
  `
})
@RouteConfig([
  { path: '/', component: Login, name: 'Login',  useAsDefault: true },
  { path: '/home', component: Home,  name: 'Home'},
  // { path: '/todo', component: Todo, name: 'Todo' },
  // { path: '/redux', component: Recipes, name: 'Recipes' },
  // { path: '/', component: Login, name: 'Login', useAsDefault: true },
  { path: '/login', component: Login, name: 'Login'},
  { path: '/sugnup', component: Signup, name: 'Signup' },
  { path: '/eqips', component: Expenses, name: 'Expense' },
  // Async load a component using Webpack's require with
  // es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') },
])
export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Irden fire theater page';
  url = 'https://github.com/forrana';
  socket;
  // Pass in our application `state`
  // Alternative to using `redux`
  constructor(public appState: AppState, public usersService: UsersService) {
  }

  // Fire off upon initialization
  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}

/*
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
