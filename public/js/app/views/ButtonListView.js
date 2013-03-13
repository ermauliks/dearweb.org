// ButtonListView.js - index.html listing for users
// -------
define(["jquery", "backbone", "models/ButtonsCollection", "views/ButtonView", "views/DisplayCssView"],

    function($, Backbone, ButtonsCollection, ButtonView, DisplayCssView){

        var ButtonListView = Backbone.View.extend({
           // The DOM Element classes associated with this view
           el: '.page',

           // View constructor
           initialize: function( initialButtons ) {
                //Assign the value to 'data' property
                this.data = initialButtons;
                this.render();
            },

            // View Event Handlers
            events: {
              "click .buttonArea .thumbs" : "showPopUp"
            },

            //Show the modal popup for styles code
            showPopUp: function(ev) {
                var _id = $(ev.currentTarget).find('button').attr('id');
                var popup = new DisplayCssView({"id": _id});
                popup.render().showModal();
            },

            // Renders the view's template to the UI
            render: function() {
                _.each( this.data, function( item ) {
                    this.renderButton( item );
                }, this );
            },

            renderButton: function( item ) {
                var buttonView = new ButtonView({
                    model: item
                });

                this.$el.append(buttonView.render());
            }
        });
        // Returns the View class
        return ButtonListView;
    }
);