import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function() {
        var loggedInUser = this.controllerFor('application').get('user');
        // If we already have a user object, the user is still logged in...
        // so, redirect them to their user page.
        if (!Ember.isNone(loggedInUser)) {
            //this.transitionTo('user.index', loggedInUser.get('id'));
        }
        this.transitionTo('user.index');
    }
});
