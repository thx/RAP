module('utility-structureValidator');


test('Utility: StructureValidator functions test', function () {
    var o1 = {
        p1: 1,
        p2: 2,
        p3: 3,
        obj: [{
            op3: 3,
            op6: 6,
            op7: 7
        }]
    };
    var o2 = {
        p1: 1,
        p3: 3,
        p4: 4,
        obj: []
    };

    var validator = new StructureValidator(o1, o2);

    var correctData = {
        "left": [{"type": "LOST", "property": "p4", "namespace": "obj"}],
        "right": [{"type": "LOST", "property": "p2", "namespace": "obj"}, {
            "type": "EMPTY_ARRAY",
            "property": "obj",
            "namespace": "obj"
        }]
    };
    var realData = validator.getResult();

    deepEqual(correctData, realData, 'strcuture check complete');
});
