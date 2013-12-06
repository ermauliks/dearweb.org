// ElementTypeListView.js - index.html listing for users
// -------
define(["jquery", "backbone", "models/ElementTypeCollection", "views/ElementTypeView", "customs/custom"],

    function($, Backbone, ElementTypeCollection, ElementTypeView, custom){

        var ElementTypeListView = Backbone.View.extend({
           // The DOM Element classes associated with this view
           el: ".elementbox",
           

           // View constructor
           initialize: function(elements ) {
                //Assign the value to 'data' property
                this.data = elements;
                this.render();
                this.renderNav();
            },

          
            // Renders the view's template to the UI
           
            renderNav: function() {
                _.each( this.data, function( item ) {
                    this.renderNavElement( item );
                }, this );
                this.setupNav();

            },

            renderNavElement: function( item ) {
               var elementTypeView = new ElementTypeView({
                    model: item
                });
                $('.nav').append(elementTypeView.renderNav());
            },

            render: function() {
                _.each( this.data, function( item ) {
                    this.renderElement( item );
                }, this );
            },

            renderElement: function( item ) {
                var elementTypeView = new ElementTypeView({
                    model: item
                });
                this.$el.append(elementTypeView.render());
            },


            setupNav: function(){
                var children = [];

                var widthToAssign = 100/$('.nav span').length;
                
                $('.nav span').each(function(){
                    $(this).attr('style','width:'+ widthToAssign + '%');
                });

                function initialization(){
                    $(".nav").children().each(function() {
                        children.push(this);
                    });
                }
                function fadeThemIn(children) { 
                    if (children.length > 0) { 
                        var currentChild = children.shift(); 
                        $(currentChild).find('a').animate({height: "show"}, 'fast', function() { fadeThemIn(children); });     
                     }   
                    $(currentChild).find('a').animate({height: "hide"}, 'fast', function() { fadeThemIn(children); });     
                }
                initialization();    
                fadeThemIn(children);
            }
            
        });
        // Returns the View class
        return ElementTypeListView;
    }
);