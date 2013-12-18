# DearWeb: Open Source Design Element Templates #

Have you ever spent hours trying to find that right button or navigation elements for your website? Have you reinvented it a few times? A hundred times? Every time?!?! This project was born partly out of the pain I've faced while trying to build and prototype websites quickly.

"DearWeb.org" is an open source platform to share snippets of websites, and it is built on top of Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

The application allows you to browse through and use various style elements(buttons, navigation, radio buttons etc). Feel free to fork and contribute your own style elements to DearWeb.org.

You may find a demo [here](http://dearweb.herokuapp.com/#/elements).


#Presentation about DearWeb.org
[![ScreenShot](https://raw.github.com/ermauliks/dearweb.org/master/public/img/video.png)](http://y2u.be/jOrzO0V0o7s)

## To setup Source code:##

1. Install npm - this command will install all dependencies
		
		$ sudo npm install

2. Import all collections in your localhost/ remote server from project folder

		$ mongoimport --collection element_type --file db_collections/DearWeb2004ElementType.json
		$ mongoimport --collection stylesDB --file db_collections/DearWeb2004StyleDB.json
		$ mongoimport --collection colorsDB --file db_collections/DearWeb2004ColorsDB.json


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

