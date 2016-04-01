import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['spinner-button'],
    classNameBindings: ['_spinningClass'],
    tagName: 'button',
    spinning: false,
    _spinningClass: Ember.computed('spinning', function() {
        return this.get('spinning') ? 'is-spinning' : '';
    }),

    click() {
        this.set('spinning', true);
        this.sendAction();
    }
});
