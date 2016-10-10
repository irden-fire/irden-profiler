// App
export * from './app.component';
export * from './app.service';

import {AppState} from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];

//# Global Redux Stores
//
//** These `redux` `stores` are available in any template **

// Import module to provide an app `store` for the life-cycle of the app
import {provideStore} from '@ngrx/store';

// Import all of the files necessary for our `expense` component
import {UsersService} from './user/users.service';
import {users} from './user/users.reducer';
import {selectedUser} from './user/selected-user.reducer';

import {ExpensesService} from './expenses/expenses.service';
import {expenses} from './expenses/expenses.reducer';
import {selectedExpense} from './expenses/selected-expense.reducer';

//# Application Redux Stores
//
//** Redux stores for use with our Angular 2 app **
export const APP_STORES = [
  // These are the primary consumers of our app store
 // RecipeService,
  ExpensesService,
  UsersService,
  // Inititialize app store available to entire app
  // and pass in our reducers.
  // Notice that we are passing in an object that matches the
  // `AppStore` interface
  provideStore({ expenses, selectedExpense,
                 users, selectedUser,
             }),
 // provideStore({ recipes, selectedRecipe })
];
