import UserEditRoute from 'paintr/routes/user/edit';

export default UserEditRoute.extend({

    beforeModel() {
        // overriding beforeModel here because we don't
        // want this route to be authenticated.
    },

    model() {
        return this.store.createRecord('user');
    },

    userSaveSuccess(password) {
        this.get('login').login(this.get('currentModel.username'), password).then(() => {
            this.transitionTo('image.new');
        }).catch(() => {
            this.transitionTo('login');
        });
    },

    userSaveFailure() {
        this.get('notify').alert('An error occurred while creating your account.');
    },

    renderTemplate: function() {
        this.render('user/edit');
    }
});
