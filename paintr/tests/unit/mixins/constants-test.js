import Ember from 'ember';
import ConstantsMixin from 'paintr/mixins/constants';
import { module, test } from 'qunit';

module('Unit | Mixin | constants');

// Replace this with your real tests.
test('it works', function(assert) {
  let ConstantsObject = Ember.Object.extend(ConstantsMixin);
  let subject = ConstantsObject.create();
  assert.ok(subject);
});
