// ElementTypeListView.js - index.html listing for users
// -------
define(["jquery", "backbone", "models/ColorsCollection", "views/ColorsView", "customs/custom"],

    function($, Backbone, ColorsCollection, ColorsView, custom){

        var ColorsListView = Backbone.View.extend({
           // The DOM Element classes associated with this view
           el: ".colorbox",
           

           // View constructor
           initialize: function(colors ) {
                //Assign the value to 'data' property
                this.data = colors;
                this.render();
            },

            // Renders the view's template to the UI
           
            render: function() {
                _.each( this.data, function( item ) {
                    this.renderElement( item );
                }, this );
            },

            renderElement: function( item ) {
                var colorsView = new ColorsView({
                    model: item
                });
                this.$el.append(colorsView.render());
            },


        });
        // Returns the View class
        return ColorsListView;
    }
);