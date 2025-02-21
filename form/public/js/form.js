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
            "type": "button",
            "action": "custom",
            "custom": "example()",
            "label": "Click me!",
            "input": true,
            "key": "submit",
            "tableView": false
        },
        {
            "label": "Upload",
            "tableView": false,
            "webcam": false,
            "fileTypes": [
                {
                    "label": "",
                    "value": ""
                }
            ],
            "validateWhenHidden": false,
            "key": "file",
            "type": "file",
            "input": true
        }
    ]
});