import Em from 'ember';
import DS from 'ember-data';

var ImageModel = DS.Model.extend({
    user: DS.attr('string'),
    title: DS.attr('string'),
    filename: DS.attr('string')
});

ImageModel.reopen({
    getSrc: Em.computed('filename', function() {
        return '/uploads/' + this.get('filename');
    })
});

export default ImageModel;
