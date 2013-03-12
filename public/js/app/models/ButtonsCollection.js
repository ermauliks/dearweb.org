// ButtonsCollection.js
// --------
define(["jquery", "backbone", "models/Model"],

    function($, Backbone, Model) {

        // Creates a new Backbone Model class object
        var ButtonsCollection = Backbone.Collection.extend({
            model: Model
        });

        // Returns the Collection class
        return ButtonsCollection;
    }

);
