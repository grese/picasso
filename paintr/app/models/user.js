import Em from 'ember';
import DS from 'ember-data';

var UserModel = DS.Model.extend({
    email: DS.attr('string'),
    username: DS.attr('string'),
    images: DS.hasMany('image', {async: true}),
    password: DS.attr('string', {defaultValue: null}),
    confirmation: DS.attr('boolean', {defaultValue: false})
});

UserModel.reopen({
    passwordConfirmation: null,
    passwordConfRequired: Em.computed('isNew', 'password', 'isDirty', function() {
        return this.get('isNew') || (this.get('password') && this.get('hasDirtyAttributes'));
    })
});

export default UserModel;
