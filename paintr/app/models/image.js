import Em from 'ember';
import DS from 'ember-data';
import ConstantsMixin from 'paintr/mixins/constants';

var ImageModel = DS.Model.extend({
    user_id: DS.attr('number'),
    user: DS.belongsTo('user'),
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
