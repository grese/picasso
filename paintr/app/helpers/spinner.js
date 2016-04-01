import Em from 'ember';

export function spinner(params, hash) {
    return Em.String.htmlSafe('<span class="the-spinner fa fa-circle-o-notch fa-spin ' + (hash.class || '') + '"></span>');
}

export default Em.Helper.helper(spinner);
