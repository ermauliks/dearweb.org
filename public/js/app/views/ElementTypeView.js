define(["jquery", "backbone", "text!templates/listElementTypes.html", "text!templates/listElementTypes.html"],

    function($, Backbone, template, templateNav){

        var ElementTypeView = Backbone.View.extend({
            tagName: 'span',

            // View constructor
            initialize: function() {},
            
            // Renders the view's template to the UI
            render: function() {
               this.template = _.template(template, {elementList: this.model});                                
               return this.$el.html( this.template );
            },

             renderNav: function() {
               this.templateNav = _.template(template, {elementList: this.model});                                
               return this.$el.html( this.templateNav );
            }
        });
        // Returns the View class
        return ElementTypeView;
    }
);