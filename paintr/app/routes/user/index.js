import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        params = params || {};

        Ember.Logger.debug('PARAMS: ', params);

        return this.store.findRecord('user', params.user_id);
    }
});
