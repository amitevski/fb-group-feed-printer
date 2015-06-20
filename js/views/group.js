/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:01 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'underscore', 'jquery', 'text!templates/group.html'],
function(Backbone, _, $, groupTemplate) {
    var GroupView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function() {
            _.bindAll(this, 'render', 'unrender', 'loadNewsFeed');
            this.template = _.template(groupTemplate);
        },

        /**
         * load news feed for selected group
         */
        loadNewsFeed: function() {
            window.location.hash = 'groups/'  + this.model.getId();
        },

        unrender: function() {
            $(this.model.el).remove();
            return this;
        },

        render: function() {
            this.unrender();
            var model = this.model.toJSON();
            var el = $(this.el);
            el.html(this.template(model));
            el.on('click', _.bind(this.loadNewsFeed))
            this.model.el = el;
            return this;
        }
    });

    return GroupView;
});