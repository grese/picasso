import DS from 'ember-data';

var UserModel = DS.Model.extend({
    email: DS.attr('string'),
    username: DS.attr('string'),
    images: DS.hasMany('image'),
    password: DS.attr('string'),
    confirmation: DS.attr('boolean', {defaultValue: false})
});

UserModel.reopen({
    passwordConfirmation: null
});

export default UserModel;
