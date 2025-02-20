Formio.createForm(document.getElementById('dvf-form-viewer'), {
    components: [
        {
            "type": "columns",
            "columns": [
                {
                    "width": 6,
                    "components": [
                        {
                            "type": "textfield",
                            "label": "First Name",
                            "key": "firstName",
                            "input": true,
                            "placeholder": "Enter your first name",
                            "tableView": true
                        }
                    ],
                    "offset": 0,
                    "push": 0,
                    "pull": 0,
                    "size": "md",
                    "currentWidth": 6
                },
                {
                    "width": 6,
                    "components": [
                        {
                            "type": "textfield",
                            "label": "Last Name",
                            "key": "lastName",
                            "input": true,
                            "placeholder": "Enter your last name",
                            "tableView": true
                        }
                    ],
                    "offset": 0,
                    "push": 0,
                    "pull": 0,
                    "size": "md",
                    "currentWidth": 6
                }
            ],
            "input": false,
            "key": "columns",
            "tableView": false,
            "label": "Columns"
        },
        {
            "label": "Text Field",
            "applyMaskOn": "change",
            "tableView": true,
            "validateWhenHidden": false,
            "key": "textField",
            "type": "textfield",
            "input": true
        },
        {
            "type": "button",
            "action": "custom",
            "custom": "example()",
            "label": "Click me!",
            "input": true,
            "key": "submit",
            "tableView": false
        }
    ]
});