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
                            $('#class_disabled').val(cssClass+"."+classText+".disabled:active{\n\n}");
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
                            
                            var cssRegExp = new RegExp("{[^]*}", "g");
                            var class_css = cssRegExp.exec($('#class_css').val());
                            cssRegExp = new RegExp("{[^]*}", "g");
                            var class_hover = cssRegExp.exec($('#class_hover').val());
                            cssRegExp = new RegExp("{[^]*}", "g");
                            var class_active = cssRegExp.exec($('#class_active').val());
                            cssRegExp = new RegExp("{[^]*}", "g");
                            var class_disabled = cssRegExp.exec($('#class_disabled').val());

                            var cssClass = style.toJSON()[0].css_selector;
                            var classText = $("input[name='class']").val().trim();
                            classText = classText.replace(/\s+/g,' ');
                            var htmlContent = $('#element_html').text();
                            var regExp = new RegExp(reg, "g");
                            htmlContent=htmlContent.replace(regExp,"class=\""+classText);
                            that.updateHTMLContent(htmlContent);
                            classText = classText.split(' ').join('.');
                            
                            if(class_css == null)
                                class_css="{\n\n}"
                            if(class_hover == null)
                                class_hover="{\n\n}"
                            if(class_active == null)
                                class_active="{\n\n}"
                            if(class_disabled == null)
                                class_disabled="{\n\n}"
                            
                            $('#class_css').val(cssClass+"."+classText+class_css);
                            $('#class_hover').val(cssClass+"."+classText+":hover"+class_hover);
                            $('#class_active').val(cssClass+"."+classText+":active"+class_active);
                            $('#class_disabled').val(cssClass+"."+classText+".disabled:active"+class_disabled);
                            reg = "class=\"" + classText;
                        }
                    });

                    
                }); 
            },

            getCssData: function(){
                var class_css = $('#class_css').val();
                var regExp = new RegExp("{[^]*}", "g");
                var m =regExp.exec(class_css);
                return m[0];
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

                thisView.components.HTMLTextArea = {
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