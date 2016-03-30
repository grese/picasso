import Em from 'ember';

export default Em.Route.extend({
    beforeModel: function() {
        this.controllerFor('user/edit').set('isNewUser', false);
    },
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

    _doSave: function(record) {
        if (record) {
            record.save().then(() => {
                this.get('controller.notify').success('Your changes have been saved.');
            }).catch(() => {
                this.get('controller.notify').alert('An error occurred while saving your changes!');
            });
        }
    },

    actions: {
        reset: function(record) {
            record.rollbackAttributes();
        },
        create: function(record) {
            this._doSave(record);
        },
        save: function(record) {
            this._doSave(record);
        }
    }
});
