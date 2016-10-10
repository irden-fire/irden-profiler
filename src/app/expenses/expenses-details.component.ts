// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// expense.component.js may be freely distributed under the MIT license
// ```

// # Expense Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ExpensesService} from './expenses.service';
import {UsersService} from '../user/users.service';
import {Expense} from './expenses.store';
import {AppStore} from '../app.store';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'expenses-detail',
  template: require('./expenses-details.html'),
})
export class ExpensesDetails {

  originalTitle: string;
  currentDate: string;
  selectedExpense: Expense;
  userName: string;
  user: any;
  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  setExpense = (value) => {
      if (value) this.originalTitle = value.name;
      this.selectedExpense = Object.assign({user: this.userName,
                                            date: this.currentDate
                                            }, value);
      // DEBUG
      console.log('this.selectedExpense: ');
      console.log(this.selectedExpense);
  }

  @Input('expense') set _expense(value: Expense) {
      this.setExpense(value);

      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                this.user.userName = success.json().username;
                this.setExpense(value);
            },
            error =>  {
                console.log(<any>error.text());
            }
          );
  }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor(private usersService: UsersService) {
      this.user = {};
      this.currentDate = new Date().toISOString().slice(0, 10);
  }
  onInit(){
      this.cancelled.emit(this.selectedExpense);
  }

  getCureentUser() {
      this.usersService
          .getCurrentUser()
          .subscribe(
            success => this.userName = success.json().username,
            error =>  console.log(<any>error.text())
          );
  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedRecipe`
  newTag() {

    // blank `tag` object
    let tag = {
      name: ''
    };

    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    if (!this.selectedExpense.tags)
      this.selectedExpense.tags = [];

    this.selectedExpense.tags.push(tag);
  }

  deleteTag(tag) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.selectedExpense.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedExpense.tags[i] === tag) {
        // delete the `tag` at the current index
        this.selectedExpense.tags.splice(i, 1);
      }
    }
  }
}
