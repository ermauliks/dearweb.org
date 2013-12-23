// View.js
// -------
define(["jquery","angular", "backbone", "models/ElementsModel","views/ModalView",  "text!templates/newEditStyle.html"],

    function($, angular,Backbone, ElementsModel,ModalView, template){

        var newEditView = ModalView.extend({

            // View constructor
            initialize: function(options) {

                // Calls the view's render method
                this.render(options);

            },

            // View Event Handlers
            // el: '.page',

            events: {
              'submit .edit-styles-form': 'saveElement'
            },


            // Renders the view's template to the UI
            render: function (options) {   
                var that = this;
                if(that.id) {

                    that.style = new ElementsModel({"id": that.id});                    
                    that.style.fetch({
                        success: function(style) {
                            that.template = _.template(template, {sData:style.toJSON()});
                            that.$el.html(that.template);
                        }
                    }); 
                                             
                }
                else {
                    that.template = _.template(template, {sData:''});
                    that.$el.html(that.template);
                }

                return this;
            },

            saveElement: function(ev) {
                var elementDetails = $(ev.target).serializeObject(),
                    _id = null; 

                console.log(elementDetails);

                if(elementDetails.id != undefined){
                     _id = elementDetails.id;
                }
                
                //Model object             
                var element = new ElementsModel({"id": _id});
                element.save(elementDetails, {
                    success: function (data) {                        
                        
                    }
                });
                return false;
            }
        });

        // Returns the View class
        return newEditView;

    }

);