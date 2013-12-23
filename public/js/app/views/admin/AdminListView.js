// View.js
// -------
define(["jquery", "backbone", "models/ElementsModel","text!templates/adminListStyle.html",'views/NewEditStyleView'],

    function($, Backbone, ElementsModel, template, NewEditStyleView){

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
             'click .delete': 'deleteElement',
              "click .edit" : "showEditDialog",
              "click .new" : "addNew"
            },
             //Show the modal popup for styles code
            showEditDialog: function(ev) {
                var _id = $(ev.currentTarget).attr('id');
                var popup = new NewEditStyleView({"id": _id});                
                popup.render().showModal();
            },

            addNew:function(){
                var popup = new NewEditStyleView({"id": 0}); 
                popup.render().showModal();
            },

            // Renders the view's template to the UI
            render: function() {
                var that = this;
                var elements = new ElementsModel();
                elements.fetch({
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
            deleteElement: function (ev) { 
                var id = $(ev.currentTarget).attr('data-style-id');
                var that = this;  
                that.style = new ElementsModel({"id": id});                 
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