import Ember from 'ember';

export default Ember.Mixin.create({
    EMAIL_REGEX: /[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}/i,
    API_KEY_KEY: 'api_key',
    USER_ID_KEY: 'user_id',
    IMAGES_PATH: '/uploads'
});
