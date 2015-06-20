 <?php

     $app_id = "348631805186304"; //TODO: enter your facebook app id here

     $canvas_page = "https://apps.facebook.com/group_feed_printer/"; //TODO enter your facebook canvas page link here

     $auth_url = "https://www.facebook.com/dialog/oauth?client_id="
            . $app_id . "&redirect_uri=" . urlencode($canvas_page) . "&scope=user_managed_groups,user_groups";

     $signed_request = $_REQUEST["signed_request"];

     list($encoded_sig, $payload) = explode('.', $signed_request, 2);

     $data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);

     if (empty($data["user_id"])) {
            echo("<script> top.location.href='" . $auth_url . "'</script>");
     } else {
         $token = $data["oauth_token"];
         $template = <<<EOT
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Group Feed Printer</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="oauth_token" content="{$token}">

    <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->


    <!-- Le styles -->
    <link rel="stylesheet"  type="text/css" href="fbootstrapp/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/custom.css">
    <link href="css/print.css" rel="stylesheet" type="text/css" media="print" />
    <script data-main="buildjs/main" src="buildjs/lib/require/require.js"></script>
    <style type="text/css">
    body {padding: 20px 0;}
    </style>

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
  </head>

  <body>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '348631805186304', //TODO: enter your facebook app id here
          xfbml      : true,
          version    : 'v2.3'
        });

        // ADD ADDITIONAL FACEBOOK CODE HERE
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
       window.fbGroupfeedback = function() {
         FB.ui({
          method: 'feed',
          to: '746453252139175' // enter your facebook id
        });
       }
    </script>
    <div class="container canvas">
    <div class="row">
      <span class="pull-right">I would love to get some <a class="btn primary" onclick="fbGroupfeedback()">Feedback</a></span>
      <!-- please leave this as is -->
      <div class="fb-like" data-href="https://www.facebook.com/pages/Group-Feed-Printer/746453252139175" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
    </div>
      <div class="row">
        <div class="span12">
        <div id="loadingIndicator">
            <div class="wrapper span4">
            <div class="progress progress-striped progress-info active">
              <div class="bar" style="width: 100%;"></div>
            </div>
        </div>
        </div>
        <div id="heading" class="hero-unit">
        </div>
        <table id="groupList" class="zebra-striped">
        </table>

        <table id="statusList" class ="zebra-striped">
        </table>
        </div>
      </div>
      <footer>
        <p>&copy; Aco Mitevski 2012</p>
      </footer>

    </div> <!-- /container -->

  </body>
</html>
EOT;
         echo $template;
     }
 ?>
