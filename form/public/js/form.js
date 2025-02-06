Formio.createForm(document.getElementById('dvf-form-viewer'), {
    components: [
        {
            type: "columns",
            columns: [
                {
                    width: 6,
                    components: [
                        {
                            type: "textfield",
                            label: "First Name",
                            key: "firstName",
                            input: true,
                            placeholder: "Enter your first name",
                        },
                    ],
                },
                {
                    width: 6,
                    components: [
                        {
                            type: "textfield",
                            label: "Last Name",
                            key: "lastName",
                            input: true,
                            placeholder: "Enter your last name",
                        },
                    ],
                },
            ],
        },
        {
            type: "button",
            action: "custom",
            custom: "example()",
            label: "Click me!",
            theme: "primary",
        },
    ]
});