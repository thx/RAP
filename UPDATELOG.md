======================rap v0.6 =================================================
  * data mock
        enhance mock for type equals to "array<string>"
        string data type now support @format
  * workspace
  		new feature: show/hide mock labels, by default, @value labels will be hidden
        fix bug: check in versions disorder
        fix bug: default focus in edit mode inputs disorder
======================rap v0.5 =================================================
  * data mock
        fix problems when request URL is absolute 07/15/2013
        enhance JSON import, default add @value into remark field 07/15/2013
        fix bugs when JSON imported has Array<xxx> elements 07/16/2013
        chenge database table tb_action.request_url, request_template to text,change name to varchar(256) 07/16/2013
        add MD5 password encryption 07/17/2013
        optimize left tree display in interface edit workspace 07/17/2013
        change display order, from name => identifier to identifier => name, optimize parameter list display 07/17/2013
        
======================rap v0.4 =================================================
  * change version back to 0.4
  * add automation testing module, allow user use "modify" and "reset" interfaces to change mock rules dynamically by HTTP requests
  * add timestamp mechanism to prevent from cache errors
  * add new tag format like @format[3], @value[4] to affect specified index of array element
  * add new tag regex like @regex=[a-zA-Z]bc to import powerful regular expression mechanism
  * update pageTester, add new tabs modify and reset which can help operate on mock data

======================rap v1.3 =================================================
  * UE: login automatically redirect 09/10/2012
  * add new mock data tag:@value=[xx], for mocking from 01 to 30, eg->@value=2012-09-[xx], output: 2012-09-01, 2012-09-02, 2012-09-03...  09/10/2012
  * update mock service, add @type=array, @type=array_map, @length=\d+ for action description, add new _c callback  09/10/2012
  * add @code @end support for action description area for code formatting  09/10/2012
  * increase size of working area  09/10/2012
  * fix bugs (data type choose, word file export encoding, etc.)  09/10/2012

======================rap v1.2 =================================================
  * simplify operation flow √ 08/29/2012
  * fix shortcuts compatibilities in different browsers (1.1 only support Firefox)  07/24/2012
  * change literal for some are too old 07/24/2012
  * validation for JSON String in page testers 07/24/2012
  * add more comment for my code 07/24/2012
  * add project introduction in README.md 07/18/2012
  * add new path configuration, static path of local and remote can be same. 07/19/2012
