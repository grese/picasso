import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    username: DS.attr('string'),
    images: DS.hasMany('image')
});
