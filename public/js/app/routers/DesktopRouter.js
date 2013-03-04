// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/Styles", "views/ButtonView" ,"views/admin/AdminListView", "views/NewEditStyleView", "collections/Collection"],
        
    function($, Backbone, Model, ButtonView, AdminListView, NewEditView, Collection) {
        var DesktopRouter = Backbone.Router.extend({
            initialize: function() {
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
            },
            // All of your Backbone Routes (add more)
            routes: {                
                // When there is no hash on the url, the home method is called
                "elements": "index",
                "admin": "home",
                "admin/edit/:id": "edit",
                "admin/new": "edit"
            },
            index: function() {
                // Instantiates a new view which will render the header text to the page
                new ButtonView();
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