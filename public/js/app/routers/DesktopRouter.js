// DesktopRouter.js
// ----------------
define(["jquery","backbone", "models/Model", "views/NewEditStyleView" , "models/ElementTypeModel", "views/HeaderView", "views/FooterView","views/IndexView","views/ElementTypeView", "views/ButtonView" , "views/admin/AdminListView", "views/NewEditStyleView", "views/ButtonListView","views/ElementTypeListView","collections/Collection"],
        
    function($, Backbone, Model,NewEditView, ElementTypeModel, HeaderView, FooterView, IndexView, ElementTypeView, ButtonView, AdminListView, NewEditStyleView, ButtonListView,ElementTypeListView, Collection) {
        var DesktopRouter = Backbone.Router.extend({
            initialize: function() {
                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();
                new HeaderView();
                new FooterView();
                this.tracking();
            },
            // All of your Backbone Routes (add more)
            routes: {                
                // When there is no hash on the url, the home method is called
                "": "index",
                "elements": "elements",
                "elements/:elementType": "listSpecificElements",
                "elements/:elementType/:color": "listSpecificElementsWithColor",
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
            listSpecificElements: function(elementType) {
                alert('we will search ' + elementType);           
            },            
            listSpecificElementsWithColor: function(elementType, color) {
                alert('we will search ' + elementType + ' with ' + color);           
            },
            home: function() {
                new AdminListView();
            },
            edit: function(id) {
                new NewEditView({"id":id});
            },
            tracking: function() {
                  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                  ga('create', 'UA-40337186-1', 'frontend.in');
                  ga('send', 'pageview');

            } 
        });

        // Returns the DesktopRouter class
        return DesktopRouter;
    }
);