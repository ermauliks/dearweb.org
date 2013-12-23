// DisplayCssView - for showing CSS code of an element
// -------
define(["jquery", "backbone", "models/ElementsModel", "views/ModalView", "text!templates/displayCSS.html"],

    function($, Backbone, ElementsModel, ModalView, template){

        var DisplayCSSView = ModalView.extend({            
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

                if(that.id) {
                    that.style = new ElementsModel({"id": that.id});
                    that.style.fetch({
                        success: function(style) {
                            that.template = _.template(template, {sData:style.toJSON()});
                            that.$el.html(that.template);
                        }
                    })                          
                }

                // Maintains chainability
                return this;
            }
        });
        // Returns the View class
        return DisplayCSSView;
    }
);