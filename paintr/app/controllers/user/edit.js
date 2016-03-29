import Em from 'ember';

export default Em.Controller.extend({
    isNewUser: Em.computed('model.id', function() {
        return this.get('model') && this.get('model.isNew');
    })
});
