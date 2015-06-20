/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 12:30 AM
 * To change this template use File | Settings | File Templates.
 */
define(['backbone',
        'underscore',
        'jquery',
        'collections/groups',
        'collections/statusMessages',
        'views/groupList',
        'views/statusList',
        'views/LoadingIndicator'
       ],

function(Backbone, _, $, groups, statusMessages, groupListView, statusListView,
         loadingIndicator)
{
    var AppRouter = Backbone.Router.extend({
        routes: {
            ''          : 'home',
            'groups'    : 'groups',
            'groups/:id': 'groupsFeed',
            'groups/:id/from/:from/to/:to' : 'dateFilteredFeed'
        },

        _preHook: function() {
            groupListView.unrender();
            statusListView.unrender();
            statusMessages.reset(null, {silent: true});
        },

        home: function() {
            //forward to groups page
            window.location.hash = 'groups';
        },

        groups: function() {
            this._preHook();
            //dont refetch if there are already groups
            if (groups.length > 0) {
                groupListView.render(groups);
                return true;
            }
            //show groups of user
            // e.g. https://graph.facebook.com/me/groups?access_token=AAAAAAITEghMBAIqki7pereoI0meHmpfiEUJV0k7pZBgQi1TXZC0PJOwA3lpCX0cR4RqRiLgCAif2n8MMwUhAPZCTmqsoLZBZBgxVngS8ycXVuZBqUjnxHH

            this._queryFbGraph('https://graph.facebook.com/v2.3/me/groups?access_token='+
                                this._getToken()+'&callback=?', groups, groupListView);
        },

        dateFilteredFeed: function(id, from, to) {
            if (statusMessages.length < 0) {
                window.location.hash = 'groups';
            }
           var filtered = statusMessages.filterDateBetween(from, to);
           statusListView.unrenderCollection();
           statusListView.renderCollection(filtered);
        },

        groupsFeed: function(id) {
            this._preHook();
            //show printable all time feed
            // e.g. https://graph.facebook.com/116003811822459/feed?access_token=AAAAAAITEghMBAHVQBjk4NSCQxVBMqU9ZB188XXRzPwb5jXR5eVMgYiUrC8wyoO59v6ysosK5CJM991nNw6gwlH6HI546WIsMrfjM3BrPedmYTNSY4&limit=25&until=1326471489&__paging_token=116003811822459_211771318912374
            statusListView.renderForm(statusMessages);
            this._queryFbGraph('https://graph.facebook.com/v2.3/'+id+'/feed?access_token=' +
                                this._getToken()+'&limit=500&callback=?', statusMessages, statusListView);
        },

        _getToken: function() {
            return $("meta[name=oauth_token]").attr("content");
        },

        /**
         *
         * @param url to query
         * @param collection to add objects to
         * @private
         */
        _queryFbGraph: function(url, collection, view, cb) {
            var self = this;

            $.getJSON(url,
                function(response) {
                    if (response.data && response.data.length > 0) {
                            collection.add(response.data, {silent: true});
                    }
                    if (response.paging && response.paging.next) {
                        var urlFragments = response.paging.next.split('&');
                        //urlFragments.splice(1,1); //remove callback
                        urlFragments.push('callback=?');
                        var newUrl = urlFragments.join('&');
                        self._queryFbGraph(newUrl, collection, view);
                    } else {
                        view.render(collection);
                        loadingIndicator.hide();
                    }
                });
        }

    });

    return AppRouter;
});
