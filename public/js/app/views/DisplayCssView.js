// DisplayCssView - for showing CSS code of an element
// -------
define(["jquery", "backbone","models/Model", "views/ModalView", "text!templates/displayCSS.html"],

    function($, Backbone, Model, ModalView, template){

        var DisplayCSSView = ModalView.extend({            
            // View constructor
            initialize: function(options) {
                // Calls the view's render method
                this.render(options);
            },

            // View Event Handlers
            events: {
            },

            // Renders the view's template to the UI
            render: function(options) {
                var that = this;
               // console.log("DisplayCssView.js "+ options.id);
               // if(options.id) {
                    that.style = new Model({"id": "51275e34ac63810c0c000001"});
                    that.style.fetch({
                        success: function(style) {
                            that.template = _.template(template, {sData:style.toJSON()});
                            that.$el.html(that.template);
                        }
                    })                          
               // }

                // Maintains chainability
                return this;
            }
        });
        // Returns the View class
        return DisplayCSSView;
    }
);