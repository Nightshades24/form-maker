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
            custom: "example(form, data)",
            label: "Click me!",
            theme: "primary",
            logic: [
                {
                    name: "init",
                    trigger: {
                        type: "event",
                        event: "dv-initialized",
                    },
                    actions: [
                        {
                            type: "custom",
                            custom: "console.log('Form initialized!')",
                        },
                    ],
                },
            ],
        },
    ]
});