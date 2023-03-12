const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userone:userone@ictakfiles.by4qw.mongodb.net/RECIPE?retryWrites=true&w=majority");
const Schema = mongoose.Schema;
var recipeSchema = new Schema({
    r_name : String,
    r_duration : Number,
    r_num : Number
   
});

var RecipeInfo = mongoose.model("inrecipes",recipeSchema);
module.exports = RecipeInfo;