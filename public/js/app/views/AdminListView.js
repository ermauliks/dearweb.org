// View.js
// -------
define(["jquery", "backbone", "models/Styles", "text!templates/admin/adminListStyle.html"],

    function($, Backbone, Model, template){

        var AdminListView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".page",

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
                var that = this;
                var styles = new Model();
                styles.fetch({
                    success:function (data) {
                       // Setting the view's template property using the Underscore template method
                       that.template = _.template(template, {stylesData: data.toJSON()});
                       // Dynamically updates the UI with the view's template
                       that.$el.html(that.template); 
                    }
                })
                
                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return AdminListView;

    }

);