/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 1:01 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone'],
function(Backbone)
{
    var GroupModel = Backbone.Model.extend({

        getId: function() {
            return this.get('id');
        }

    });

    return GroupModel;
});