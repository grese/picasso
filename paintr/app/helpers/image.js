import Em from 'ember';

export function image(params, hash) {
    return Em.String.htmlSafe([
        '<img src="', hash.src,
        '" class="', (hash.class || ''),
        '" width="', hash.width,
        '" height="', hash.height,
        '" ', '/>'
    ].join(''));
}

export default Em.Helper.helper(image);
