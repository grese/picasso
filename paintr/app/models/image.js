import Em from 'ember';
import DS from 'ember-data';
import ConstantsMixin from 'paintr/mixins/constants';

var ImageModel = DS.Model.extend({
    user: DS.belongsTo('user', {async: true}),
    title: DS.attr('string'),
    filename: DS.attr('string'),
    data_uri: DS.attr('string')
});

ImageModel.reopen(ConstantsMixin, {
    getSrc: Em.computed('filename', function() {
        return this.get('IMAGES_PATH') + '/' + this.get('filename');
    })
});

export default ImageModel;
