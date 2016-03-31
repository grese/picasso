import UserEditRoute from 'paintr/routes/user/edit';

export default UserEditRoute.extend({
    renderTemplate: function() {
        this.render('user/edit');
    }
});
