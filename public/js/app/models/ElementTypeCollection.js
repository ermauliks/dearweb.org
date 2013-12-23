// ElementTypeCollection.js
// --------
define(["jquery", "backbone", "models/ElementTypeListModel"],

    function($, Backbone, ElementTypeListModel) {

        // Creates a new Backbone Model class object
        var ElementTypeCollection = Backbone.Collection.extend({
            model: ElementTypeListModel
        });

        // Returns the Collection class
        return ElementTypeCollection;
    }

);
