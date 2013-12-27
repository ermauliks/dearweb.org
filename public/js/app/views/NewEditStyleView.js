// View.js
// -------
define(["jquery","angular", "backbone", "models/ElementsModel", "models/ElementTemplateModel", "views/ModalView",  "text!templates/newEditStyle.html"],

    function($, angular,Backbone, ElementsModel, ElementTemplateModel, ModalView, template){

        var newEditView = ModalView.extend({

            // View constructor
            initialize: function(options) {

                // Calls the view's render method
                this.render(options);
                this.init();
                this.assignClass();
            },

            components:{
                HTMLTextArea : null
            },

            events: {
              'submit .edit-styles-form': 'saveElement'
            },

            init: function(){
                var that = this;
                $('body').find('#elementList').live('change', function(){
                    var selectedElement = $("#elementList option:selected").val();

                    that.elementTemplate = new ElementTemplateModel({"id": selectedElement});                    
                    that.elementTemplate.fetch({
                        success: function(style) {
                            var htmlContent = style.toJSON()[0].template;
                            var cssClass = style.toJSON()[0].css_selector;
                            var classText = $('body').find("input[name='class']").val();
                            var regExp = new RegExp("class=\"", "g");
                            htmlContent=htmlContent.replace(regExp,"class=\""+classText);
                            that.updateHTMLContent(htmlContent);
                            var classText = classText.split(' ').join('.');
                            $('#class_css').val(cssClass+"."+classText+"{\n\n}"); 
                            $('#class_hover').val(cssClass+"."+classText+":hover{\n\n}");
                            $('#class_active').val(cssClass+"."+classText+":active{\n\n}");       
                        }
                    });
                            
                    //we will make it dynamic
                    
                }); 
            },

            assignClass: function(){
                var that = this;
                var reg = "class=\"[^\"]*";
                
                $('body').find("input[name='class']").live('keyup', function(){
                    var selectedElement = $("#elementList option:selected").val();    
                    that.elementTemplate = new ElementTemplateModel({"id": selectedElement});                    
                    that.elementTemplate.fetch({
                        success: function(style) {
                            var cssClass = style.toJSON()[0].css_selector;
                            var classText = $("input[name='class']").val().trim();
                            classText = classText.replace(/\s+/g,' ');
                            var htmlContent = $('#element_html').text();
                            var regExp = new RegExp(reg, "g");
                            htmlContent=htmlContent.replace(regExp,"class=\""+classText);
                            that.updateHTMLContent(htmlContent);
                            var classText = classText.split(' ').join('.');
                            $('#class_css').val(cssClass+"."+classText+"{\n\n}");
                            $('#class_hover').val(cssClass+"."+classText+":hover{\n\n}");
                            $('#class_active').val(cssClass+"."+classText+":active{\n\n}");
                            reg = "class=\"" + classText;
                        }
                    });

                    
                }); 
            },

            // Renders the view's template to the UI
            render: function (options) {   
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

                if(elementDetails.id != undefined){
                     _id = elementDetails.id;
                }
                
                //Model object             
                var element = new ElementsModel({"id": _id});
                console.log(element);
                element.save(elementDetails, {
                    success: function (data) {                        
                        
                    }
                });
                return false;
            },

            updateHTMLContent: function (selectedElement) {
                var thisView = this;

                thisView.components.HTMLTextArea = thisView.components.HTMLTextArea || {
                    el: $("#element_html"),
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
        return newEditView;

    }

);