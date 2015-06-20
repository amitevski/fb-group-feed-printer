/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:01 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone', 'underscore', 'jquery','models/group'],
function(Backbone, _, $, groupModel)
{
    var Groups = Backbone.Collection.extend({
        model: groupModel
    });

    return new Groups;
});