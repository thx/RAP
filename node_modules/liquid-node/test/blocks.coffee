Liquid = require("../src/index")

module.exports =
  test_assigned_variable: renderTest (render, assert) ->
    render  '.foo.',
            '{% assign foo = values %}.{{ foo[0] }}.',
            'values': ["foo", "bar", "baz"]

    render  '.bar.',
            '{% assign foo = values %}.{{ foo[1] }}.',
            'values': ["foo", "bar", "baz"]

  test_for_with_variable: renderTest (render, assert) ->
    render(' 1  2  3 ', '{%for item in array%} {{item}} {%endfor%}', array: [1, 2, 3])
    render('123', '{%for item in array%}{{item}}{%endfor%}', array: [1, 2, 3])
    render('123', '{% for item in array %}{{item}}{% endfor %}', array: [1, 2, 3])
    render('abcd', '{%for item in array%}{{item}}{%endfor%}', array: ['a', 'b', 'c', 'd'])
    render('a b c', '{%for item in array%}{{item}}{%endfor%}', array: ['a', ' ', 'b', ' ', 'c'])
    render('abc', '{%for item in array%}{{item}}{%endfor%}', array: ['a', '', 'b', '', 'c'])

  test_for_index: renderTest (render, assert) ->
    render('123', '{%for item in array%}{{forloop.index}}{%endfor%}', array: [1,2,3])
    render('321', '{%for item in array%}{{forloop.rindex}}{%endfor%}', array: [1,2,3])
    render('210', '{%for item in array%}{{forloop.rindex0}}{%endfor%}', array: [1,2,3])
    render('123', '{%for item in array%}{{forloop.index}}{%endfor%}', array: ['a','b','c'])
    render('123', '{%for item in array%}{{forloop.index}}{%endfor%}', array: ['a','b','c'])
    render('012', '{%for item in array%}{{forloop.index0}}{%endfor%}', array: ['a','b','c'])
    render('1234', '{%for item in array%}{{forloop.index}}{%endfor%}', array: [{a:1},{b:1},{c:1},{d:1}])
    render('', '{%for item in array%}{{forloop.index}}{%endfor%}', array: [])
    render('first123', '{% for item in array %}{% if forloop.first%}first{% endif %}{{forloop.index}}{% endfor %}', array: [1,2,3])
    render('123last', '{% for item in array %}{{forloop.index}}{% if forloop.last%}last{% endif %}{% endfor %}', array: [1,2,3])
    render('vw', '{%for item in array limit:2%}{{item}}{%endfor%}', array: ['v','w','x','y'])
    render('xy', '{%for item in array offset:2%}{{item}}{%endfor%}', array: ['v','w','x','y'])

  test_ifchanged: renderTest (render, assert) ->
    render('123', '{%for item in array%}{%ifchanged%}{{item}}{% endifchanged %}{%endfor%}', array: [ 1, 1, 2, 2, 3, 3 ])
    render('1', '{%for item in array%}{%ifchanged%}{{item}}{% endifchanged %}{%endfor%}', array: [ 1, 1, 1, 1 ])

  test_reverse: renderTest (render, assert) ->
    array = [ 1, 2, 3 ]
    render('321', '{% for item in array reversed %}{{ item }}{% endfor %}', array: array)
    assert.eql 3, array.length, "Expected array contents to remain the same"
    assert.eql 1, array[0], "Expected array order to remain the same"

