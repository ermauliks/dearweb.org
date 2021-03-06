// View.js - index.html listing for users
// -------
define(["jquery", "backbone", "models/Model", "text!templates/indexTemplate.html"],

    function($, Backbone, Model, template){

        var IndexView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".page",

            components: {
                goButton: null
            },

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
                var thisView = this;

                $('div.combobox').each(function(){
                    $(this).find('div').hide();
                    $(this).find('span').live('click',function(){
                        $(this).parent().parent().find('h3').text($(this).text());
                        $(this).parent().hide();

                        // Update the Go button URL based on current selection (i.e. `href` attribute)
                        thisView.updateGoButton($(this).children(":first").data("uri"));
                    });
                    $(this).on('mouseover', function(){$(this).find('div').show();})
                           .on('mouseout', function(){$(this).find('div').hide();})
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

            },

            updateGoButton: function (componentUri) {
                var thisView = this;

                thisView.components.goButton = thisView.components.goButton || {
                    el: $("#button-go"),
                    url: {
                        template: "#/type/{{componentUri}}",
                        rendered: null
                    }
                };

                var goBtn = thisView.components.goButton;

                goBtn.url.rendered = goBtn.url.template.replace("{{componentUri}}", componentUri);
                goBtn.el.attr("href", goBtn.url.rendered);
            }
        });

        // Returns the View class
        return IndexView;

    }

);
