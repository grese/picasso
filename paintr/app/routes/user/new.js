import UserEditRoute from 'paintr/routes/user/edit';

export default UserEditRoute.extend({
    beforeModel: function() {
        this.controllerFor('user/edit').set('isNewUser', true);
    },
    renderTemplate: function() {
        this.render('user/edit', { controller: 'user/edit' });
    }
});
