# Make Forms

A simple jquery plugin to make forms faster

## Getting Started

This plugin requires jQuery 1.7 or higher.
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lambda2/MakeForms/master/dist/jquery.makeforms.min.js
[max]: https://raw.github.com/lambda2/MakeForms/master/dist/jquery.makeforms.js

In your web page:

```html
<!-- the form that will contain the form elements -->
<form id="myForm">
    <button type="submit">Go!</button>
</form>
<script src="jquery.js"></script>
<script src="dist/makeforms.min.js"></script>
<script>
jQuery(function($)
{
    var questions = {
        question_one: {
            title: "Do you like donuts ?",
            choices: {
                yes: {label: "Yes"},
                no: {label: "No"}
            }
        }
    };

    $("#myForm").makeforms({
        components: questions
    });
});
</script>
```

Will generate :

```html

<form id="myForm">
    <p>Do you like donuts ?</p>
    <input type="radio" name="question_one" id="question_one_yes" value="yes">
    <input type="radio" name="question_one" id="question_one_no" value="no">
    <button type="submit">Go!</button>
</form>
```

## Documentation

To generate the elements of a form, you must supply to the _components_ parameter a json object containing the definition of all the form fields.

### Available options : 
`components: {}` : the json object containing all the fields

`groupSize: 1` :  the size of a group. set to 0 for no groups. The template of a group can be set by the template.group parameter.

`selectMinSize: 18 ` : the minimum size to generate a list (with <select> tag) instead of radio elements.

`position: "before"` : the position of the generated code in the target selector, can be `before`, `after` or `replace`

```
templates:
{
    item: "{{item}}",
    title: "<p>{{title}}</p>",
    group: "{{group}}",
    label: '<label for="{{id}}">{{label}}</label>',
    radio: '<input type="radio" name="{{name}}" id="{{id}}" value="{{value}}">',
    text: '<input type="text" name="{{name}}" id="{{id}}" value="{{value}}">',
    input: '<input type="{{type}}" name="{{name}}" id="{{id}}" value="{{value}}">',
    select: '<select id="{{id}}" name="{{name}}">{{options}}</select>',
    option: '<option id="{{id}}" value="{{value}}">{{label}}</option>'
}
```
See [templates] section.

### JSON definition
All the form elements are defined with a json object containin all the elements.
there is the structure of each question:
```
question
    ├── beforeTitle         // a raw content to insert before title template
    ├── title               // the title of the question
    ├── afterTitle          // a raw content to insert after title template
    └── choices             // contain all the choices for the current question
        ├── name            // the name of the form element
        │   ├── label       // the label of the current choice
        │   ├── value       // the value of the current choice
        │   ├── type = auto // the type (ex : 'text', 'radio', 'select'...)
        │   ├── before = "" // some text to insert before the html code
        │   └── after = ""  // some text to insert after the html code
        │
        └...                // Add other choices
```

For example :
```javascript
{
    q1: {
        beforeTitle: "<h1>Let's start !</h1>",
        title: "Do you like donuts ?",
        choices: {
            yes: {
                label: "Yes"
            },
            no: {
                label: "No"
            }
        }
    },
    q2: {
        title: "And what is your favorite color ?",
        choices: {
            blue: { label: "blue" },
            red: { label: "red" },
            other: {
                label: "other :",
                value: "",
                type: "text"
            }
        }
    }
}
```

### Templates
You can change the default template for all generated fields via the "template" parameter.
The variables are defined with "Mustache" notation, like `<p>{{ my_var }}</p>`.
