# fb-group-feed-printer
facebook app to print all messages in a group


This is the source-code for the Group-Feed-Printer app.
https://www.facebook.com/pages/Group-Feed-Printer/746453252139175

Due to a recent change in the facebook permissions the app does not work anymore. The app needs the user_groups permission.

You may try to install the app yourself if you're familiar how to set up a
canvas app in facebook.

As this is something I created some while ago in my spare time I cannot offer any support.
Also I didn't try to install it myself.

If someone gets it up and running feel free to update the documentation and
make a pull request.

# setup

1. create a canvas app on developer.facebook.com
1. checkout this source-code
1. edit index.php and enter the appId and canvas url of the app you created
1. to a web server


# used technologies

1. small php script to handle facebook authorization
1. most code is written in backbone.js
1. fbbootstrap is a modified bootstrap theme that is styled similar to facebook

# changes

the javascript source-code is in subfolder "js".
if you modify it please run "cd js && ./build.sh" to build the project
