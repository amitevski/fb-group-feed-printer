/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:01 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'underscore', 'jquery', 'views/group', 'text!templates/groupHeading.html'],
function(Backbone, _, $, groupView,  groupHeading) {
    var GroupListView = Backbone.View.extend({
        el: $('#groupList'),

        collection: null,

        initialize: function() {
            _.bindAll(this, 'unrender', 'render', 'appendGroup');
        },

        unrender: function() {
            this.el.html('');
            $('#heading').html('');
            this.el.hide();
        },

        appendGroup: function(group) {
            var view = new groupView({model: group});
            var el   = view.render().el;
            this.el.append(el);
        },

        render: function(collection) {
            this.el.show();
            $('#heading').html(_.template(groupHeading));
            collection.each(this.appendGroup);
        }
    });

    return new GroupListView;
});
