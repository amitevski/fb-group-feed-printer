/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:56 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:01 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'underscore', 'jquery','models/status'],
function(Backbone, _, $, statusModel)
{
    var StatusMessages = Backbone.Collection.extend({
        model: statusModel,
        filterDateBetween: function(from, to) {
            from = new Date(from);
            to   = new Date(to);
            return _(this.filter(function(data){
                var statusDate = new Date();
                statusDate.setISO8601(data.get('created_time'));
                return from < statusDate && statusDate < to;
            }));
        }
    });

    return new StatusMessages;
});
