// View.js
// -------
define(["jquery","angular", "backbone", "models/Model","views/ModalView",  "text!templates/newEditStyle.html"],

    function($, angular,Backbone, Model,ModalView, template){

        var newEditView = ModalView.extend({

            // View constructor
            initialize: function(options) {

                // Calls the view's render method
                this.render(options);

            },

            // View Event Handlers
            // el: '.page',

            events: {
              'submit .edit-styles-form': 'saveStyles'
            },


            // Renders the view's template to the UI
            render: function (options) {   
                var that = this;
                // console.log(that.id);
                if(that.id) {
                    that.style = new Model({"id": that.id});
                    that.style.fetch({
                        success: function(style) {
                            that.template = _.template(template, {sData:style.toJSON()});
                            that.$el.html(that.template);
                        }
                    })                          
                }
                else {
                    that.template = _.template(template, {sData:null});
                    that.$el.html(that.template);
                }

                return this;
            },

            saveStyles: function(ev) {
                var styleDetails = $(ev.currentTarget).serializeObject(),
                    _id = null;

                if(styleDetails.id != undefined){
                     _id = styleDetails.id;
                }
                
                //Model object                
                var style = new Model({"id": _id});
                style.save(styleDetails, {
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