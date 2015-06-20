/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'underscore', 'jquery',
        'views/status', 'jqueryui',
        'text!templates/statusHeading.html'],
function(Backbone, _, $, statusView, ui, statusHeading) {
    var StatusListView = Backbone.View.extend({
        el: $('#statusList'),

        collection: null,

        initialize: function() {
            _.bindAll(this, 'unrender','unrenderCollection',
                      'render','renderForm',
                      'renderCollection','prependStatus');
        },

        unrender: function() {
            this.unrenderCollection();
            $('#heading').html('');
            this.el.hide();
        },
        
        unrenderCollection: function() {
            this.el.html('');
        },

        prependStatus: function(status) {
            if (!status.get('message')) { return; }
            var view = new statusView({model: status});
            var el   = view.render().el;
            this.el.prepend(el);
        },
        
        renderForm: function(collection) {
            this.el.show();
            var heading = $('#heading');
            heading.html(_.template(statusHeading));
            $('#dateFrom', heading).datepicker();
            $('#dateTo', heading).datepicker();
            $('#filterButton', heading).on('click', function(){
                var from = $('#dateFrom', heading).datepicker('getDate');
                var to   = $('#dateTo', heading).datepicker('getDate');
                window.location.hash = 'groups/'+ collection.get('id') + '/from/' + from + '/to/' + to;
            });
            $('#resetButton', heading).on('click', _.bind(this.renderCollection, this, collection));
        },
        
        renderCollection: function(collection) {
            collection.each(this.prependStatus);
        },

        render: function(collection) {
            //this.renderForm(collection);
            this.renderCollection(collection);
        }
    });

    return new StatusListView;
});
