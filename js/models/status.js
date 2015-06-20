/**
 * Created with JetBrains PhpStorm.
 * User: acomitevski
 * Date: 4/29/12
 * Time: 2:00 PM
 * To change this template use File | Settings | File Templates.
 */
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
    var StatusModel = Backbone.Model.extend({

        getId: function() {
            return this.get('id');
        },
        
        getType: function() {
            return this.get('type');
        }

    });

    return StatusModel;
});