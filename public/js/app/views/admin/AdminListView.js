// View.js
// -------
define(["jquery", "backbone", "models/Styles", "models/Model", "text!templates/adminListStyle.html"],

    function($, Backbone, Styles, Model, template){

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
                'click .delete': 'deleteStyle'
            },

            // Renders the view's template to the UI
            render: function() {
                var that = this;
                var styles = new Styles();
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

            },
            deleteStyle: function (ev) { 
                var id = $(ev.currentTarget).attr('data-style-id');
                var that = this;  
                that.style = new Model({"id": id});                 
                that.style.destroy({
                  success: function () {
                        location.reload(true);
                  }
                });  
                ev.stopPropagation();
                return false;  
            }

        });
        // Returns the View class
        return AdminListView;

    }

);