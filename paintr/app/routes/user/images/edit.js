import Em from 'ember';

export default Em.Route.extend({
    model: function(params) {
        var record;
        params = params || {};

        if (Em.isNone(params.image_id)) {
            record = this.store.createRecord('image');
        } else {
            record = this.store.findRecord('image', params.image_id);
        }
        return record;
    }
});
