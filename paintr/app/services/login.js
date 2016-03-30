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

    login(loginname, password) {
        var credentials = { password: password };

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

    logout() {
        this.setProperties({
            user: null,
            apiKey: false,
            loggedIn: false
        });
        return this.del('/api/logout').catch((err) => {
            Em.Logger.debug('[LOGIN SERVICE] => ', err);
        });
    },

    getUser(userId) {
        this.get('store').findRecord('user', userId).then((user) => {
            this.set('user', user);
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
