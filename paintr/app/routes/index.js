import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.findAll('image');
    },

    actions: {
        createImage: function(params) {
            params = params || {};

            var image = this.store.createRecord('image', {
                user: params.user,
                title: params.title,
                data_uri: params.data_uri
            });
            Ember.Logger.debug('THE IMAGE RESPONSE: ', image);
            //image.save().then(function(resp) {
            //    Ember.Logger.debug('THE IMAGE RESPONSE: ', resp);
            //});
        }
    }
});
