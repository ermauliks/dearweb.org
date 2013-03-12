// View.js - index.html listing for users
// -------
define(["jquery", "backbone", "text!templates/listButtons.html"],

    function($, Backbone, template){

        var ButtonView = Backbone.View.extend({
            tagName: 'div',
            className: 'buttonArea',

            // View constructor
            initialize: function() {},

            // View Event Handlers
            events: {
              // "click .btn" : "showPopUp"
            },

            //Show the modal popup for styles code
            /*showPopUp: function(ev) {
                var _id = "51275e34ac63810c0c000001" ; //$(ev.currentTarget).attr('id');
                console.log("ButtonView.js "+_id);
                var popup = new DisplayCssView({"id": _id});
                popup.render().showModal();
            },*/

            // Renders the view's template to the UI
            render: function() {
               this.template = _.template(template, {stylesData: this.model});                                
               return this.$el.html( this.template );
            }
        });
        // Returns the View class
        return ButtonView;
    }

);