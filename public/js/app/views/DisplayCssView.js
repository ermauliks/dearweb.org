// DisplayCssView - for showing CSS code of an element
// -------
define(["jquery", "backbone", "models/ElementsModel","models/ElementTemplateModel" , "views/ModalView", "text!templates/displayCSS.html"],

    function($, Backbone, ElementsModel,ElementTemplateModel, ModalView, template){

        var DisplayCSSView = ModalView.extend({            
            // View constructor
            initialize: function() {
                // Calls the view's render method
                this.render();
            },
            components:{
                HTMLTextArea : null
            },

            // View Event Handlers
            events: {
            },

            // Renders the view's template to the UI
            render: function() {
                var that = this;

                if(that.id) {
                    that.style = new ElementsModel({"id": that.id});
                    that.style.fetch({
                        success: function(style) {
                            var sData = style.toJSON();
                            var elementType = sData.element_type;
                            var classText = sData.class;
                            that.template = _.template(template, {sData:sData});
                            that.$el.html(that.template);

                            that.elementTemplate = new ElementTemplateModel({"id": elementType});                    
                            that.elementTemplate.fetch({
                                success: function(style) {
                                    var htmlContent = style.toJSON()[0].template;
                                    var regExp = new RegExp("class=\"", "g");
                                    htmlContent=htmlContent.replace(regExp,"class=\""+classText); 
                                    that.updateHTMLContent(htmlContent);
                                }
                            });


                            that.template = _.template(template, {sData:style.toJSON()});
                            that.$el.html(that.template);
                        }
                    })                          
                }

                // Maintains chainability
                return this;
            },

            updateHTMLContent: function (selectedElement) {
                var thisView = this;

                thisView.components.HTMLTextArea = {
                    el: $("#html_content"),
                    element_html: {
                        template: "{{selectedElement}}",
                        rendered: null
                    }
                };

                var htmlArea = thisView.components.HTMLTextArea;
                htmlArea.element_html.rendered = htmlArea.element_html.template.replace("{{selectedElement}}", selectedElement);
                htmlArea.el.text(htmlArea.element_html.rendered);
            }

        });
        // Returns the View class
        return DisplayCSSView;
    }
);