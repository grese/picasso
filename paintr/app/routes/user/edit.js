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
            record.save().then(function() {
                Em.Logger.debug("THE RECORD HATH BEEN SAVED!");
            });
        }
    },

    actions: {
        reset: function(record) {
            record.rollback();
        },
        create: function(record) {
            this._doSave(record);
        },
        save: function(record) {
            this._doSave(record);
        }
    }
});
