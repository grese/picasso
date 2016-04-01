import Em from 'ember';
import AuthenticatedRoute from 'paintr/routes/authenticated';

export default AuthenticatedRoute.extend({
    login: Em.inject.service(),
    notify: Em.inject.service(),

    model(params) {
        return this.store.findRecord('user', params.user_id);
    },

    save() {
        var password;

        if (!this.get('currentModel.hasDirtyAttributes')) {
            this.get('notify').info('No changes...');
            return;
        }

        if (this.get('currentModel.validatorResultIsValid')) {

            password = this.get('currentModel.password');
            this.set('currentModel.confirmed', true);

            this.get('currentModel').save().then(() => {
                this.userSaveSuccess(password);
            }).catch(() => {
                this.userSaveFailure();
            }).finally(() => {
                this.set('controller.isSaving', false);
            });
        }
    },

    userSaveSuccess() {
        this.get('notify').success('Your changes have been saved.');
    },

    userSaveFailure(){
        this.get('notify').alert('An error occurred while saving your changes!');
    },

    reset() {
        this.get('currentModel').rollbackAttributes();
    },

    actions: {
        doReset: function() {
            this.reset();
        },
        doSave: function() {
            this.save();
        }
    }
});
