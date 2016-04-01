import Em from 'ember';
import EmValidator from 'ember-validator';
import LoginModel from 'paintr/models/login';

export default Em.Route.extend(EmValidator, {
    login: Em.inject.service(),
    notify: Em.inject.service(),

    model: function() {
        var model = LoginModel.create(),
            validations = {
                loginName: {
                    required: {message: 'username or email is required.'}
                },
                password: {
                    required: {message: 'password is required.'}
                }
            };

        return this.createObjectWithValidator(model, validations, true);
    },

    validateAndLogin: function() {
        if (this.get('currentModel').get('validatorResultIsValid')) {

            this.get('login').login(
                this.get('currentModel.loginName'),
                this.get('currentModel.password')
            ).then(() => {
                this.transitionTo('image.new');
                this.set('controller.isLoggingIn', false);
            }).catch(() => {
                this.get('notify').alert('Your username/email or password was incorrect.');
                this.set('controller.isLoggingIn', false);
            });
        }
    },

    actions: {
        doValidateAndLogin: function() {
            this.validateAndLogin();
        }
    }
});
