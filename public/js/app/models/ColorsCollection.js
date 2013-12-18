// ElementTypeCollection.js
// --------
define(["jquery", "backbone", "models/ColorsModel"],

    function($, Backbone, ColorsModel) {

        // Creates a new Backbone Model class object
        var ColorsCollection = Backbone.Collection.extend({
            model: ColorsModel
        });

        // Returns the Collection class
        return ColorsCollection;
    }

);
