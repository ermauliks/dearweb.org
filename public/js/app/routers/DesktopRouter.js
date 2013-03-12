// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Model", "views/HeaderView", "views/FooterView","views/IndexView", "views/ButtonView" ,"views/admin/AdminListView", "views/NewEditStyleView", "views/ButtonListView","collections/Collection"],
        
    function($, Backbone, Model, HeaderView, FooterView, IndexView, ButtonView, AdminListView, NewEditView, ButtonListView, Collection) {
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