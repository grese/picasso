import Ember from 'ember';

export default Ember.Mixin.create({
    EMAIL_REGEX: /[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}/i
});
