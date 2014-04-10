Liquid = require("../src/index")

module.exports =
  test_if: renderTest (assert_template_result) ->


    assert_template_result('  ',' {% if false %} this text should not go into the output {% endif %} ')
    assert_template_result('  this text should go into the output  ',
                           ' {% if true %} this text should go into the output {% endif %} ')
    assert_template_result('  you rock ?','{% if false %} you suck {% endif %} {% if true %} you rock {% endif %}?')

  test_if_else: renderTest (assert_template_result) ->


    assert_template_result(' YES ','{% if false %} NO {% else %} YES {% endif %}')
    assert_template_result(' YES ','{% if true %} YES {% else %} NO {% endif %}')
    assert_template_result(' YES ','{% if "foo" %} YES {% else %} NO {% endif %}')

  test_if_boolean: renderTest (assert_template_result) ->


    assert_template_result(' YES ','{% if var %} YES {% endif %}', 'var': true)

  test_if_or: renderTest (assert_template_result) ->


    assert_template_result(' YES ','{% if a or b %} YES {% endif %}', 'a': true, 'b': true)
    assert_template_result(' YES ','{% if a or b %} YES {% endif %}', 'a': true, 'b': false)
    assert_template_result(' YES ','{% if a or b %} YES {% endif %}', 'a': false, 'b': true)
    assert_template_result('',     '{% if a or b %} YES {% endif %}', 'a': false, 'b': false)

    assert_template_result(' YES ','{% if a or b or c %} YES {% endif %}', 'a': false, 'b': false, 'c': true)
    assert_template_result('',     '{% if a or b or c %} YES {% endif %}', 'a': false, 'b': false, 'c': false)

  test_if_or_with_operators: renderTest (assert_template_result) ->


    assert_template_result(' YES ','{% if a == true or b == true %} YES {% endif %}', 'a': true, 'b': true)
    assert_template_result(' YES ','{% if a == true or b == false %} YES {% endif %}', 'a': true, 'b': true)
    assert_template_result('','{% if a == false or b == false %} YES {% endif %}', 'a': true, 'b': true)

  test_comparison_of_strings_containing_and_or_or: renderTest (assert_template_result) ->


    awful_markup = "a == 'and' and b == 'or' and c == 'foo and bar' and d == 'bar or baz' and e == 'foo' and foo and bar"
    assigns = {'a': 'and', 'b': 'or', 'c': 'foo and bar', 'd': 'bar or baz', 'e': 'foo', 'foo': true, 'bar': true}
    assert_template_result(' YES ',"{% if #{awful_markup} %} YES {% endif %}", assigns)

  test_if_from_variable: renderTest (assert_template_result) ->


    assert_template_result('','{% if var %} NO {% endif %}', 'var': false)
    assert_template_result('','{% if var %} NO {% endif %}', 'var': null)
    assert_template_result('','{% if foo.bar %} NO {% endif %}', 'foo': {'bar': false})
    assert_template_result('','{% if foo.bar %} NO {% endif %}', 'foo': {})
    assert_template_result('','{% if foo.bar %} NO {% endif %}', 'foo': null)
    assert_template_result('','{% if foo.bar %} NO {% endif %}', 'foo': true)

    assert_template_result(' YES ','{% if var %} YES {% endif %}', 'var': "text")
    assert_template_result(' YES ','{% if var %} YES {% endif %}', 'var': true)
    assert_template_result(' YES ','{% if var %} YES {% endif %}', 'var': 1)
    assert_template_result(' YES ','{% if var %} YES {% endif %}', 'var': {})
    assert_template_result(' YES ','{% if var %} YES {% endif %}', 'var': [])
    assert_template_result(' YES ','{% if "foo" %} YES {% endif %}')
    assert_template_result(' YES ','{% if foo.bar %} YES {% endif %}', 'foo': {'bar': true})
    assert_template_result(' YES ','{% if foo.bar %} YES {% endif %}', 'foo': {'bar': "text"})
    assert_template_result(' YES ','{% if foo.bar %} YES {% endif %}', 'foo': {'bar': 1 })
    assert_template_result(' YES ','{% if foo.bar %} YES {% endif %}', 'foo': {'bar': {} })
    assert_template_result(' YES ','{% if foo.bar %} YES {% endif %}', 'foo': {'bar': [] })

    assert_template_result(' YES ','{% if var %} NO {% else %} YES {% endif %}', 'var': false)
    assert_template_result(' YES ','{% if var %} NO {% else %} YES {% endif %}', 'var': null)
    assert_template_result(' YES ','{% if var %} YES {% else %} NO {% endif %}', 'var': true)
    assert_template_result(' YES ','{% if "foo" %} YES {% else %} NO {% endif %}', 'var': "text")

    assert_template_result(' YES ','{% if foo.bar %} NO {% else %} YES {% endif %}', 'foo': {'bar': false})
    assert_template_result(' YES ','{% if foo.bar %} YES {% else %} NO {% endif %}', 'foo': {'bar': true})
    assert_template_result(' YES ','{% if foo.bar %} YES {% else %} NO {% endif %}', 'foo': {'bar': "text"})
    assert_template_result(' YES ','{% if foo.bar %} NO {% else %} YES {% endif %}', 'foo': {'notbar': true})
    assert_template_result(' YES ','{% if foo.bar %} NO {% else %} YES {% endif %}', 'foo': {})
    assert_template_result(' YES ','{% if foo.bar %} NO {% else %} YES {% endif %}', 'notfoo': {'bar': true})
