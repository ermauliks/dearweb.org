// ElementsModel.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            url : '/elements',

            // Model Constructor
            initialize: function(options) {
                if(options != undefined && options.id != undefined){
                    this.url= this.url + "/" + options.id;
                }
            },

            // Default values for all of the Model attributes
            defaults: {

            },

            // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);