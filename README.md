# \<tangy-form\>

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/tangy-form) [![Greenkeeper badge](https://badges.greenkeeper.io/Tangerine-Community/tangy-form.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/Tangerine-Community/tangy-form.svg?branch=master)](https://travis-ci.org/Tangerine-Community/tangy-form)

A form element for lazy loaded multipage forms.

- Conforms to Material Design guidelines
- Loads of handy input elements such as `<tangy-gps>`.
- Easy to write logic for the form for hiding / showing and disabling / enabled inputs.

```
<tangy-form id="my-form">
  <tangy-form-item id="item1">
    <template>
      <form>
        <tangy-input name="input1" label="What is your first name?"></tangy-input>
      </form>
    </template>
  </tangy-form-item>
  <tangy-form-item id="item2">
    <template>
      <form>
        <tangy-input name="input2" label="What is your last name?"></tangy-input>
      </form>
    </template>
  </tangy-form-item>
</tangy-form>

<script>
  document.querySelector('#my-form').addEventListener('submit', event => {
    // By default, the form response is locked and the user can browse it. Use event.preventDefault() 
    // to do something else.
    event.preventDefault()
    // 3 ways to inspect the user's response to the form. Ordered by level of detail.
    console.log(event.target.response)
    console.log(event.target.inputs)
    console.log(event.target.values)
  })
</script>
```


## Install in your project
`<tangy-form>` is a Custom Element built with Polymer and can be used in frameworks such as Angular, React, and Vue. Check compatibility with your project's framework on [Custom Elements Everywhere](https://custom-elements-everywhere.com/).  If you are ready to go, run `npm install --save tangy-form` to add it to your project. Depending on your build system/framework, there may be different steps to take to get Web Components loading.

- [Web Components in React](https://reactjs.org/docs/web-components.html)
- [Using Web Components in Angular](https://www.c-sharpcorner.com/article/creating-reusable-web-component-and-using-it-with-angular/)

## Run the demo
Requires node.js and npm installed.
```
git clone https://github.com/tangerine-community/tangy-form
cd tangy-form
npm install
npm install -g polymer-cli
polymer serve
```
Then open http://localhost:8080

