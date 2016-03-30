import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {

    this.route('index', {path: '/'});
    this.route('login');

    this.route('image', {path: 'images'}, function() {
        this.route('all', {path: '/'});
        this.route('view', {path: '/:image_id'});
    });

    this.route('user', function() {
      this.route('index', {path: '/:user_id'});
      this.route('edit', {path: '/:user_id/edit'});
    });
    this.route('user.new', {path: '/signup'});
});

export default Router;
