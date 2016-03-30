import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),
    model: function() {
        return this.store.findAll('image');
    },

    actions: {
        createImage: function(params) {
            params = params || {};

            var image = this.store.createRecord('image', {
                user: this.get('login.user'),
                title: params.title,
                data_uri: params.data_uri
            });
            image.save().then(function(resp) {
                Em.Logger.debug('THE IMAGE RESPONSE: ', resp);
            });
        }
    }
});
