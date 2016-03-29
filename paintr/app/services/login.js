import Em from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ConstantsMixin from 'paintr/mixins/constants';

export default AjaxService.extend(ConstantsMixin, {
    user: null,
    apiKey: null,
    loggedIn: false,
    store: Em.inject.service(),

    init() {
        this._super(...arguments);
    },

    login: function(loginname, password) {
        var credentials = {
                password: password
            };
        if (this.get('EMAIL_REGEX').test(loginname)) {
            credentials.email = loginname;
        } else {
            credentials.username = loginname;
        }

        return new Em.RSVP.Promise((resolve, reject) => {
            this.post('/api/login', {data: credentials}).then((result) => {
                result = result || {};

                this.set('loggedIn', true);
                this.set('apiKey', result.apiKey);
                this.getUser(result.userId);
                resolve(result.userId);
            }).catch(function(err) {
                Em.Logger.error('[LOGIN SERVICE] => ', err);
                reject(err);
            });
        });
    },

    getUser: function(userId) {
        var self = this;

        this.get('store').findRecord('user', userId).then(function(user) {
            self.set('user', user);
        });
    },

    headers: Em.computed('authToken', {
        get() {
            let headers = {};
            const authToken = this.get('authToken');
            if (authToken) {
                headers['auth-token'] = authToken;
            }
            return headers;
        }
    })
});
