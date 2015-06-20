/**
 * Created by JetBrains PhpStorm.
 * User: amitevski
 * Date: 23.03.12
 * Time: 13:47
 * aco.mitevski@gmail.com
 */
define(['jquery', 'underscore'], function($, _) {
    var loadingIndicator = {
        el: $('#loadingIndicator'),

        show: function() {
            this.el.show();
        },

        hide: function() {
            this.el.hide();
        }
    }

    return loadingIndicator;
});