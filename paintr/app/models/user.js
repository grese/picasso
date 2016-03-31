import Em from 'ember';
import DS from 'ember-data';
import EmValidator from 'ember-validator';
import { inlineValidator } from 'ember-validator';

var UserModel = DS.Model.extend({
    email: DS.attr('string'),
    username: DS.attr('string'),
    images: DS.hasMany('image', {async: true}),
    password: DS.attr('string', {defaultValue: null}),
    confirmation: DS.attr('boolean', {defaultValue: false})
});

UserModel.reopen(EmValidator, {
    init() {
        this._super(...arguments);
        this.createObjectWithValidator(this, this.validations, true);
    },

    passwordConfirmation: null,
    passwordConfRequired: Em.computed('isNew', 'password', 'isDirty', function() {
        return this.get('isNew') || (this.get('password') && this.get('hasDirtyAttributes'));
    }),

    validations: {
        username: {
            required: { message: 'Username is required.' },
            length: {
                minimum: 4,
                maximum: 20,
                messages: {
                    minimum: 'Username is minimum of 4 characters',
                    maximum: 'Username is maximum of 20 characters'
                }
            }
        },
        password: {
            if: function(model) {
                return model.get('isNew') || !!model.changedAttributes().password;
            },
            required: {
                message: 'Password is required.'
            },
            length: {
                minimum: 6,
                maximum: 20,
                messages: {
                    minimum: 'Password is minimum of 6 characters',
                    maximum: 'Password is maximum of 20 characters'
                }
            }
        },
        passwordConfirmation: {
            if: function(model) {
                return model.get('isNew') || !!model.changedAttributes().password;
            },
            custom: inlineValidator((model) => {
                var msg = 'Please confirm your password.';
                return model.get('password') !== model.get('passwordConfirmation') ? msg : '';
            })
        },
        email: {
            required: 'Email is required.',
            email: 'Must be a valid email address.'
        }
    }
});

export default UserModel;
