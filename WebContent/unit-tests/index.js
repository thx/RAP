module('env confirm');
test('no KISSY.io when kissy seed inited', function () {
    ok(KISSY.io === undefined, 'KISSY.io is undefined when kissy seed loaded');
});

var scripts = [
    'getrule/base.js',

    'utility/structureValidator.js',

    'getruledata/base.js',
    'getruledata/datatypes.js',

    'rap-plugin/base.js',
    'rap-plugin/jsapis.js',
    'rap-plugin/modes.js',
    'rap-plugin/whiteblack.js',
    'rap-plugin/for-seajs.js',

    'errors/rap-plugin-error.js',
    'errors/bugfix-list.js'
];

loadScripts(scripts, function () {
});
