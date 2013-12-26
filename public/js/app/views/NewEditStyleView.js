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
                            that.updateHTMLContent(style.attributes[0].template);
                        }
                    });
                            
                    //we will make it dynamic
                    
                }); 
            },

            assignClass: function(){
                var that = this;
                var reg = "class=\"";
                $('body').find("input[name='class']").live('keyup', function(){
                    var classText = $(this).val();
                    var htmlContent = $('#element_html').text();
                    var regExp = new RegExp(reg, "g");
                    htmlContent=htmlContent.replace(regExp,"class=\""+classText);
                    $('#element_html').text(htmlContent);
                    $('#class_css').val("."+classText+"{\n\n}");
                    $('#class_hover').val("."+classText+":hover{\n\n}");
                    $('#class_active').val("."+classText+":active{\n\n}");
                    reg = "class=\"" + classText;
                }); 
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

                var goBtn = thisView.components.HTMLTextArea;

                goBtn.element_html.rendered = goBtn.element_html.template.replace("{{selectedElement}}", selectedElement);
                goBtn.el.text(goBtn.element_html.rendered);
            }

        });

        // Returns the View class
        return newEditView;

    }

);