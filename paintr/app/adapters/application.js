import Em from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    namespace: 'api',
    login: Em.inject.service(),
    headers: Em.computed('login.headers', function() {
        return this.get('login.headers');
    })
});
