import Em from 'ember';
import AuthenticatedRoute from 'paintr/routes/authenticated';

export default AuthenticatedRoute.extend({
    notify: Em.inject.service(),

    model: function(params) {
        var record;
        params = params || {};

        if (Em.isNone(params.user_id)) {
            record = this.store.createRecord('user');
        } else {
            record = this.store.findRecord('user', params.user_id);
        }

        return record;
    },

    save() {
        if (!this.get('currentModel.hasDirtyAttributes')) {
            this.get('notify').info('No changes...');
            return;
        }

        if (this.get('currentModel.validatorResultIsValid')) {
            this.set('currentModel.confirmed', true);

            this.get('currentModel').save().then(() => {
                this.get('notify').success('Your changes have been saved.');
            }).catch(() => {
                this.get('notify').alert('An error occurred while saving your changes!');
            });
        }
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
