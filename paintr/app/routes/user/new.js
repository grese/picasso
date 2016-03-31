import UserEditRoute from 'paintr/routes/user/edit';

export default UserEditRoute.extend({

    beforeModel() {
        // overriding beforeModel here because we don't
        // want this route to be authenticated.
    },

    renderTemplate: function() {
        this.render('user/edit');
    }
});
