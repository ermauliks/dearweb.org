// DesktopRouter.js
// ----------------
define(["jquery","backbone", "models/Model", "views/NewEditStyleView" , "models/ElementsTypeModel", "models/ElementTypeListModel" ,"models/ElementsModel", "models/ColorsModel" , "views/HeaderView", "views/FooterView","views/IndexView","views/ElementTypeView", "views/ColorsListView","views/ButtonView" , "views/admin/AdminListView", "views/ButtonListView","views/ElementTypeListView","collections/Collection"],
        
    function($, Backbone, Model, NewEditStyleView, ElementsTypeModel, ElementTypeListModel, ElementsModel ,ColorsModel, HeaderView, FooterView, IndexView, ElementTypeView, ColorsListView, ButtonView, AdminListView, ButtonListView,ElementTypeListView, Collection) {
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
                "type/:elementType": "listElementsByType",
                // "elements/:elementType/:color": "listSpecificElementsWithColor",
                "admin": "home",
                "admin/edit/:id": "edit",
                "admin/new": "edit"
            },
            
            index: function() {
                new IndexView();

                var elementTypes = new ElementTypeListModel();
                
                //Get the documents/records
                elementTypes.fetch({
                    success:function (data) {  
                        //Instantiate ElementTypeListView generate buttons dynamically 
                        console.log("In Elements")
                        new ElementTypeListView(data.toJSON());
                    }
                });     

              var colors = new ColorsModel();
                colors.fetch({
                    success:function (data) {
                        //Instantiate ColorsListView generate colors dynamically
                        console.log("In Colors");
                        console.log("Error Fetching Colors", data.toJSON());
                        new ColorsListView(data.toJSON());
                    }
                });  
            },

            elements: function() {
                //Instantiate the model
                var allElements = new ElementsModel();
                //Get the documents/records
                allElements.fetch({
                    success:function (data) {  
                        //Instantiate ButtonListView generate buttons dynamically 
                        new ButtonListView(data.toJSON());
                    }
                })                
            },

            listElementsByType: function(elementType) {
            
                var options = new Object();
                options.id = elementType;
                console.log(options);
                var elementsByType = new ElementsTypeModel(options);

                elementsByType.fetch({
                    success:function (data) {
                        //Instantiate ButtonListView generate buttons dynamically
                        new ButtonListView(data.toJSON());
                    }
                })


            },            
            listSpecificElementsWithColor: function(elementType, color) {
                // alert('we will search ' + elementType + ' with ' + color);           
            },
            home: function() {
                new AdminListView();
            },
            edit: function(id) {
                new NewEditStyleView({"id":id});
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