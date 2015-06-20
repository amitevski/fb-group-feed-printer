/**
 * Created by JetBrains PhpStorm.
 * User: amitevski
 * Date: 05.03.12
 * Time: 13:20
 * aco.mitevski@mayflower.de
 */
({
    appDir: "../js",
    baseUrl: "./",
    dir: "../buildjs",
    paths: {
        "jquery"    : "lib/jquery/jquery-min",
        "jqueryui"  : 'lib/jquery/jquery-ui-1.8.19.custom.min',
        "underscore": "lib/underscore/underscore-min",
        "backbone"  : "lib/backbone/backbone-optamd3-min",
        "text"      : 'lib/require/text'
    },

    optimize: "uglify",
    optimizeCss: "standard.keepLines",

    modules: [
        {
            name: "main"
        }
    ]
})
