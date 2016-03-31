import Em from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ConstantsMixin from 'paintr/mixins/constants';

export default AjaxService.extend(ConstantsMixin, {
    user: null,
    userId: null,
    apiKey: null,
    store: Em.inject.service(),
    init() {
        this._super(...arguments);
        this._readLocalStorage();
        if (this.get('userId') && !this.get('user')) {
            this.findUser(this.get('userId'));
        }
    },
    loggedIn: Em.computed('apiKey', 'userId', {
        get() {
            return this.get('apiKey') && this.get('userId');
        },
        set(key, value) {
            if (!value) {
                this.set('user', null);
                this.set('userId', null);
                this.set('apiKey', null);
                this._clearLocalStorage();
            }
        }
    }),

    login(loginName, password) {
        var credentials = { password: password };

        if (this.get('EMAIL_REGEX').test(loginName)) {
            credentials.email = loginName;
        } else {
            credentials.username = loginName;
        }

        return new Em.RSVP.Promise((resolve, reject) => {
            this.post('/api/login', {data: credentials}).then((result) => {
                result = result || {};

                this.set('apiKey', result.apiKey || null);
                this.set('userId', result.userId || null);

                if (this.get('apiKey') && this.get('userId')) {
                    this.findUser(this.get('userId'));
                    this._updateLocalStorage();
                    resolve(this.get('userId'));
                } else {
                    reject();
                }

            }).catch(function(err) {
                Em.Logger.error('[LOGIN SERVICE] => ', err);
                reject();
            });
        });
    },

    logout() {
        this.set('loggedIn', false);
        return this.del('/api/logout').catch((err) => {
            Em.Logger.debug('[LOGIN SERVICE] => ', err);
        });
    },

    findUser(userId) {
        this.get('store').findRecord('user', userId).then((user) => {
            this.set('user', user);
        });
    },

    _updateLocalStorage: function() {
        localStorage.setItem(this.get('API_KEY_KEY'), this.get('apiKey'));
        localStorage.setItem(this.get('USER_ID_KEY'), this.get('userId'));
    },

    _clearLocalStorage: function() {
        localStorage.removeItem(this.get('API_KEY_KEY'));
        localStorage.removeItem(this.get('USER_ID_KEY'));
    },

    _readLocalStorage: function() {
        this.set('apiKey', localStorage.getItem(this.get('API_KEY_KEY')) || null);
        this.set('userId', localStorage.getItem(this.get('USER_ID_KEY')) || null);
    },

    headers: Em.computed('apiKey', 'userId', {
        get() {
            return {
                AUTHORIZATION: 'Token token=' + this.get('apiKey'),
                USER_ID: this.get('userId')
            };
        }
    })
});
