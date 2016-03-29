import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {

    this.route('index', {path: '/'});
    this.route('login');
    this.route('user.edit', {path: 'signup'});
    this.route('user.edit', {path: 'user/:user_id/edit'});
    this.route('user.index', {path: 'user/:user_id'});
    this.route('user.images.index', {path: 'user/:user_id/images'});
    this.route('user.images.view', {path: 'user/:user_id/images/:image_id'});
    this.route('user.images.edit', {path: 'user/:user_id/images/:image_id/edit'});
});

export default Router;
