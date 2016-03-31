import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),

    beforeModel() {
        if (!this.get('login.loggedIn')) {
            this.transitionTo('login');
        }
    }
});
