// View.js
// -------
define(["jquery", "backbone", "models/Model", "text!templates/newEditStyle.html"],

    function($, Backbone, Model, template){

        var newEditView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".page",

            // View constructor
            initialize: function(options) {

                // Calls the view's render method
                this.render(options);

            },

            // View Event Handlers
            el: '.page',
            events: {
                'submit .edit-styles-form': 'saveStyles'
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
                        console.log('DATA ADDED SUCCESSFULLY: ' + data);
                       // Backbone.Router.navigate('', {trigger:true})
                    }
                });
                return false;
            },
            // Renders the view's template to the UI
            render: function (options) {   
                var that = this;
                if(options.id) {
                    that.style = new Model({"id": options.id});
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
            }            
        });

        // Returns the View class
        return newEditView;

    }

);