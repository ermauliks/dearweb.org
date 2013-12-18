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
                }
            },

            // View Event Handlers
            events: {
                "click .search" : "doSearch"
            },

            init: function(){
                
                $('div.combobox').each(function(){
                    $(this).find('div').hide();
                    $(this).find('span').live('click',function(){
                        $(this).parent().parent().find('h3').text($(this).text());
                        $(this).parent().hide();
                    });
                    $(this).on('mouseover', function(){$(this).find('div').show();})
                           .on('mouseout', function(){$(this).find('div').hide();})
                });

                var buttonGoModel = new Backbone.Model({
                    searchUrl: "/elements"
                });

                var buttonGo = $("#button-go");

                rivets.bind(buttonGo, {
                    buttonGo: buttonGoModel
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
