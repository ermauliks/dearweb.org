define(["jquery", "backbone", "text!templates/listColors.html"],

    function($, Backbone, template){

        var ColorsView = Backbone.View.extend({
            attributes: function(){
                return {
                    'style': 'background-color: ' + this.model.hex_color + '; color: ' + this.model.hex_color
                };
            },
            tagName: 'span',
            

            // View constructor
            initialize: function() {},
            
            // Renders the view's template to the UI
            render: function() {
               this.template = _.template(template, {colorsList: this.model});                                
               return this.$el.html( this.template );
            },

        });
        // Returns the View class
        return ColorsView;
    }
);