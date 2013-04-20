// ElementTypeCollection.js
// --------
define(["jquery", "backbone", "models/ElementTypeModel"],

    function($, Backbone, ElementTypeModel) {

        // Creates a new Backbone Model class object
        var ElementTypeCollection = Backbone.Collection.extend({
            model: ElementTypeModel
        });

        // Returns the Collection class
        return ElementTypeCollection;
    }

);
