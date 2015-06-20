/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:54 PM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'underscore', 'jquery', 'text!templates/status.html'],
function(Backbone, _, $,statusTemplate) {
    var StatusView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function() {
            _.bindAll(this, 'render', 'unrender', '_getNormalSizePicture');
            this.template = _.template(statusTemplate);
        },

        unrender: function() {
            $(this.model.el).remove();
            return this;
        },

        render: function() {
            this.unrender();
            var model = this.model.toJSON();
            if (!model.picture) { model.picture = false; }
            if (!model.comments) { model.comments = false; }
            /*
            if (model.picture && model.type == 'photo') {
                model.picture = this._getNormalSizePicture(model.picture);
            }
            */
            var el = $(this.el);
            try {
                el.html(this.template(model));
            } catch (e) {
                console.log('could not render model: ');
                console.log(e);
                console.log(model);
            }
            var hideButton = $('.btn', el);
            hideButton.on('click', _.bind(this.unrender));
            this.model.el = el;
            return this;
        },
        
        /**
         * replace the s at the end with n
         * to get the full size facebook pic
         */
        _getNormalSizePicture: function(picture) {
            var parts = picture.split('.');
            var last  = parts[parts.length-2];
            if (last != 'jpg' || last != 'jpeg') {
                return picture;
            } 
            var tmp   = last.split('');
            //n for facebook normal size
            tmp[tmp.length-1] = 'n';
            parts[parts.length-2] = tmp.join('');
            return parts.join('.');
        }
    });

    return StatusView;
});
