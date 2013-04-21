# DearWeb is a Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB #

"DearWeb.org" is a open source platform to share Snippets of Websites and its built on recent hot technlogies like Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

The application allows you to browse through a list of Website snippets like Buttons, Navigation, Radio buttons and etc etc, as well as user can contribute using the Github account.

This application spike/ sample demo is [here](http://dearweb.herokuapp.com/#/elements).


## To setup Source code:##

1. Install npm - this command will install all dependencies
		
		$ sudo npm install

2. Import all collections from db_collections folder [commands coming soon :-)]


## To run the application on your own Heroku account:##

1. Install the [Heroku Toolbelt](http://toolbelt.heroku.com)

2. [Sign up](http://heroku.com/signup) for a Heroku account

3. Login to Heroku from the `heroku` CLI:

        $ heroku login

4. Create a new app on Heroku:

        $ heroku create

5. Add the [MongoLab Heroku Add-on](http://addons.heroku.com/mongolab)

        $ heroku addons:add mongolab

6. Upload the app to Heroku:

        $ git push heroku master

7. Open the app in your browser:

        $ heroku open

