// View.js - index.html listing for users
// -------
define(["jquery", "backbone", "models/Model", "text!templates/indexTemplate.html", "rivets"],

    function($, Backbone, Model, template, rivets){

        var IndexView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".page",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();
                this.init();

                
            },

            // View Event Handlers
            events: {
                "click .search" : "doSearch"
            },

            init: function(){
                var elementModel = new Backbone.Model({
                    searchUrl: "/elements",
                    elementType: "",
                    elementColor: ""
                });

                $('.colorbox span').each(function(){
                    $(this).attr('style','background-color:'+ $(this).text() + ';color:'+ $(this).text());

                })
                $('div.combobox').each(function(){
                    $(this).find('div').hide();
                    $(this).find('span').live('click',function(){

                        if($(this).parents('.combobox').attr('id') === 'element-dropdown') {
                            elementModel.set("elementType", $(this).text());  
                            console.log($(this).parents('.combobox').attr('id'));       
                        } else {
                            elementModel.set("elementColor", $(this).text()); 
                            console.log($(this).parents('.combobox').attr('id'));
                        }

                        $(this).parent().parent().find('h3').text($(this).text());
                        $(this).parent().hide();
                    });
                    $(this).on('mouseover', function(){$(this).find('div').show();})
                           .on('mouseout', function(){$(this).find('div').hide();})
                });


                rivets.adapters[':'] = {
                    subscribe: function(obj, keypath, callback) {
                        obj.on('change:' + keypath, callback);
                    },
                    unsubscribe: function(obj, keypath, callback) {
                        obj.off('change:' + keypath, callback);
                    },
                    read: function(obj, keypath) {
                        return obj.get(keypath);
                    },
                    publish: function(obj, keypath, value) {
                        obj.set(keypath, value);
                    }
                };

                rivets.formatters.constructUrl = function(value, elementType, elementColor) {
                    return elementType + "/" + elementColor;
                };

                rivets.bind($(".page"), {
                    elementModelEl: elementModel
                });
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            doSearch: function () {

            }

        });

        // Returns the View class
        return IndexView;

    }

);
