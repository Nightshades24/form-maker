let form;
let data;

setTimeout(() => {
  form = window.Formio.forms[document.getElementsByClassName("formio-component-form")[0].id];
  data = form["_data"];

  example();
}, 100);


function example() {
  // alert('Yay! You clicked me!');

  console.log(form);
  console.log(data);

  form.getComponent("firstName").setValue("John");
  form.getComponent("lastName").setValue("Doe");
}

export {
    example
};
