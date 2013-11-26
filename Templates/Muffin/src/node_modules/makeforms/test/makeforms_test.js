(function($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/
     
     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    var items = {
        q1: {
            title: "Test title for question one",
            choices: {
                female: {
                    label: "Female"
                },
                male: {
                    label: "Male"
                }
            }
        },
        q2: {
            choices: {
                opt_1: {
                    label: "option one"
                },
                opt_2: {
                    label: "option two"
                },
                opt_3: {
                    label: "option three"
                }
            }
        },
        q3: {
            title: "A question with no choices",
            choices: {
            }
        }
    };

    var opts = {
        components: items,
        groupSize: 1
    };


    module('Simple tests', {
        // This will run before each test in this module.
        setup: function() {
            this.elems = $("#qunit-form").makeForms(opts).children();
        }
    });

    test('is chainable', function() {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.elems.makeForms(opts), this.elems, 'should be chainable (' + this.elems.html());
    });

    test('all items are here', function() {
        expect(3);
        strictEqual(this.elems.length, 7, '7 items have to be count...\n' + $("#qunit-form").html());
        strictEqual(this.elems.filter("p").length, 2, '2 items have to be count...\n' + $("#qunit-form").html());
        strictEqual(this.elems.filter("input").length, 5, '5 items have to be count...\n' + $("#qunit-form").html());
    });

    test('titles are correct', function() {
        expect(2);
        strictEqual(this.elems.filter("p").first().html(),
                "Test title for question one",
                'First title is not correct');
        strictEqual(this.elems.filter("p").last().html(),
                "A question with no choices",
                'Last (second) title is not correct');
    });

    module('JSON tests', {
        // This will run before each test in this module.
        setup: function() {

            items.q1.choices.female.before = "<span class='q1 before'>before-q1</span>";
            items.q2.choices.opt_1.after = "<span class='q2 after'>after-q2-opt1</span>";
            items.q2.choices.opt_2.before = "<span class='q2 before'>before-q2-opt2</span>";
            items.q2.choices.opt_2.after = "<span class='q2 after'>after-q2-opt2</span>";

            opts = {
                components: items,
                groupSize: 1
            };

            this.elems = $("#qunit-form").makeForms(opts).children();
        }
    });

    test('before and after elements', function() {

        expect(6);
        strictEqual(this.elems.filter(".before").length, 2,
            "two before element expected");
        strictEqual(this.elems.filter(".after").length, 2,
            "two afte elemen expected");
        strictEqual(this.elems.filter(".q1").length, 1,
            "one span element expected for question one");
        strictEqual(this.elems.filter(".q2").length, 3,
            "three span elements expected for question two");
        strictEqual(this.elems.filter(".q1.before").html(), "before-q1",
            "wrong text in the before-q1 span tag");
        strictEqual(this.elems.filter(".q2").html(), "after-q2-opt1",
            "wrong text in the q2 span tag" + this.elems.filter(".q2").html());
    });
    

    $("#qunit-form").makeForms(opts);


}(jQuery));
