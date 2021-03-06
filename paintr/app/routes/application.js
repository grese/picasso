import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),

    actions: {
        logout() {
            this.get('login').logout();
            window.location = '/login';
        }
    }
});
