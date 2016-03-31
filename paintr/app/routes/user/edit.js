import Em from 'ember';

export default Em.Route.extend({
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

    _doSave: function(record) {
        if (record) {
            record.save().then(() => {
                this.get('notify').success('Your changes have been saved.');
            }).catch(() => {
                this.get('notify').alert('An error occurred while saving your changes!');
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
