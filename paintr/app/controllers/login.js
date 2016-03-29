import Em from 'ember';

export default Em.Controller.extend({
    notify: Em.inject.service(),
    loginName: '',
    password: ''
});
