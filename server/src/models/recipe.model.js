const mongoose = require('mongoose');
//mongoose_fuzzy_searching is a npm package from: https://github.com/VassilisPallas/mongoose-fuzzy-searching#work-with-pre-existing-data
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            text: true,
        },
        preambleHTML: {
            type: String,
            required: true,
            text: true,
        },
        //TODO Change to handle "real" images
        image: {
            type: mongoose.ObjectId,
            ref: "File",
        },
        portions: {
            type: Number,
            required: true,
        },
        cookingTime: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
            text: true,
        },
        ingredients: [{
            type: String,
            required: true,
            text: true,
        }],
        cookingSteps: [{
            type: String,
            required: true
        }],
        mdsaCategories: [{
            type: String,
            required: true,
            text: true,
        }],
        authorId: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true,
            text: true,
        },
        isShared:{
            type: Boolean,
            required: true
        },
        timeStamp: {
            type: Date,
            required: true,
            default: Date.now,
        }
    },
    {
        //inkludes the virtual object to data so fetcher gets url to image
        id: false,
        toJSON: {
          virtuals: true,
        },
    },
    { autoIndex: false }
);

RecipeSchema.plugin(mongoose_fuzzy_searching, { 
    fields: [
        {
            name: 'title',
            weight: 3,
            minSize: 4
        },
        {
            name: 'preambleHTML',
            weight: 1,
            minSize: 4
        },
        {
            name: 'difficulty',
            weight: 4,
            minSize: 3
        },
        {
            name: 'author',
            weight: 1
        },
        {
            name: 'ingredients',
            weight: 5,
            minSize: 4
        },
        {
            name: 'mdsaCategories',
            weight: 5,
            minSize: 3
        },
    ]
});

//Create Index for search-functionality
RecipeSchema.index({'$**': 'text'});

//handles getting avatar-image-file
RecipeSchema.virtual("imageURL").get(function () {
return process.env.DOMAIN + this.image.toString();
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = { Recipe, RecipeSchema }