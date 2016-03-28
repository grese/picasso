import Em from 'ember';

export default Em.Route.extend({
    model: function(params) {
        params = params || {};

        if (!Em.isNone(params.id)) {
            return this.store.findRecord('image', params.id);
        }
    }
});
