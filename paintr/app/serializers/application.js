import DS from 'ember-data';
import Em from 'ember';

export default DS.JSONAPISerializer.extend({
    keyForAttribute: function(key) {
        return Em.String.decamelize(key);
    }
});
