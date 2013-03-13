// View.js - index.html listing for users
// -------
define(["jquery", "backbone", "text!templates/headerTemplate.html"],

    function($, Backbone, template){

        var HeaderView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".top-header",

            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.render();
            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {
                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});
                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);
                // Maintains chainability
                return this;
            }
        });

        // Returns the View class
        return HeaderView;
    }
);