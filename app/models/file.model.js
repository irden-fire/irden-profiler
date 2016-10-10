// ```
// recipe.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// recipe.model.js may be freely distributed under the MIT license
// ```

// */app/models/project.model.js*

// # Project Model

// Note: MongoDB will autogenerate an _id for each project object created

// Grab the Mongoose module
import mongoose from 'mongoose';
import User from './user.model.js';


// Create a `schema` for the `Project` object
let fileSchema = new mongoose.Schema({
  name: { type : String },
  description: { type : String },
  type: {type : String },
  file_id: {type: String},
  path: {type: String}
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('File', fileSchema);
