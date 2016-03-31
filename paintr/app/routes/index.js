import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),
    model: function() {
        return this.store.createRecord('image', {
            user_id: this.get('login.user.id'),
            user: this.get('login.user')
        });
    },

    actions: {
        createImage: function(params) {
            params = params || {};

            this.get('currentModel').setProperties({
                data_uri: params.data_uri,
                title: params.title
            });
            this.get('currentModel').save().then(function(resp) {
                Em.Logger.debug('THE IMAGE RESPONSE: ', resp);
            });
        }
    }
});
