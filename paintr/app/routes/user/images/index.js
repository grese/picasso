import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        this._super();

        // User Model should be present from parent route's
        // model function, so just get the images.
        controller.set('model', model.get('images'));
    }
});
