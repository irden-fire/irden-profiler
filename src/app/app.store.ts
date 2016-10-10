
import {User} from './user/users.store';
// Import our `Expenses` store
import {Expense} from './expenses/expenses.store';


// We are dealing with a single object that has:
//   * An `recipes` collection
//   * A `selectedRecipe` property holding a single `Recipe`
export interface AppStore {

    expenses: Expense[];
    selectedExpense: Expense;

    // If ever you were to desire more functionality, you
    // could expand the `store` with new `key, value` pairs
    // to accomodate the updated model
    //
    // . . .
    //
};
