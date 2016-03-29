import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        Ember.Logger.debug('USER>IMAGES>VIEW', params);
    }
});
