import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
  this.route('images', function() {
      this.route('index', {path: '/'});
      this.route('edit', {path: '/:id'});
  });
});

export default Router;
