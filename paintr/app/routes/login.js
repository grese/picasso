import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),
    doLogin: function(loginname, password) {
        this.get('login').login(loginname, password).then((userId) => {
            this.transitionTo('user.index', userId);
        }).catch(() => {
            this.get('controller.notify').alert('Your username/email or password was incorrect.');
        });
    },
    actions: {
        login() {
            var loginname = this.get('controller.loginName'),
                password = this.get('controller.password');
            if (!loginname || !password) {
                this.get('controller.notify').alert('Username & password are required.');
            } else {
                this.doLogin(loginname, password);
            }
        }
    }
});
