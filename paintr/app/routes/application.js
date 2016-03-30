import Em from 'ember';

export default Em.Route.extend({
    login: Em.inject.service(),
    afterModel: function() {
        this.get('login').login('johngrese@me.com', 'schroeder').then(function() {
            Em.Logger.debug("LOGGED IN");
        }).catch(function() {
            Em.Logger.debug("LOGIN FAILED");
        });
    },

    actions: {
        logout() {
            this.get('login').logout();
        }
    }
});
