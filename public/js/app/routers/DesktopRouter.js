// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Model", "models/ElementTypeModel", "views/HeaderView", "views/FooterView","views/IndexView","views/ElementTypeView", "views/ButtonView" , "views/admin/AdminListView", "views/NewEditStyleView", "views/ButtonListView","views/ElementTypeListView","collections/Collection"],
        
    function($, Backbone, Model, ElementTypeModel, HeaderView, FooterView, IndexView, ElementTypeView, ButtonView, AdminListView, NewEditStyleView, ButtonListView,ElementTypeListView, Collection) {
        var DesktopRouter = Backbone.Router.extend({
            initialize: function() {
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
                new HeaderView();
                new FooterView();
            },
            // All of your Backbone Routes (add more)
            routes: {                
                // When there is no hash on the url, the home method is called
                "": "index",
                "elements": "elements",
                "admin": "home",
                "admin/edit/:id": "edit",
                "admin/new": "edit"
            },
            index: function() {
                new IndexView();

                var elementTypes = new ElementTypeModel();
                //Get the documents/records
                elementTypes.fetch({
                    success:function (data) {  
                        //Instantiate ElementTypeListView generate buttons dynamically 
                        new ElementTypeListView(data.toJSON());
                    }
                })     
            },
            elements: function() {
                //Instantiate the model
                var styles = new Model();
                //Get the documents/records
                styles.fetch({
                    success:function (data) {  
                        //Instantiate ButtonListView generate buttons dynamically 
                        new ButtonListView(data.toJSON());
                    }
                })                
            },
            home: function() {
                new AdminListView();
            },
            edit: function(id) {
                new NewEditView({"id":id});
            }    
        });

        // Returns the DesktopRouter class
        return DesktopRouter;
    }
);