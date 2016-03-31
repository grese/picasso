import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),

    model() {
        return this.store.createRecord('image', {
            user_id: this.get('login.userId')
        });
    },

    actions: {
        willTransition() {
            // clean up unsaved paintings...
            if (this.get('currentModel.isNew')) {
                this.get('currentModel').deleteRecord();
            }
        },
        createImage(params) {
            params = params || {};

            this.get('currentModel').setProperties({
                data_uri: params.data_uri,
                title: params.title
            });
            this.get('currentModel').save().then(() => {
                this.transitionTo('image.all');
            });
        }
    }
});
