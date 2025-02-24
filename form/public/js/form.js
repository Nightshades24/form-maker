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
        },
        {
            "label": "User Select",
            "uniqueOptions": true,
            "tableView": true,
            "defaultValue": {
                "label": "<img src=\"blob:http://localhost:3000/08d81124-8dc7-4cfd-bde5-d9b9dc636cd6\" style=\"width:24px; margin-right:16px\">\nLars van Kleij",
                "value": "10b32635-f427-4d7e-ac73-bc7aa4ed3055"
            },
            "includeUsers": true,
            "includeGroups": true,
            "outputFormat": "identity",
            "disableLimit": false,
            "clearOnHide": false,
            "validate": {
                "select": false
            },
            "key": "user",
            "type": "user",
            "noRefreshOnScroll": false,
            "input": true,
            "dataSrc": "url",
            "searchField": true
        },
        {
            "label": "Complete task",
            "saveProcessVariables": true,
            "saveDMSProperties": true,
            "disableOnInvalid": true,
            "tableView": false,
            "key": "taskCompletionBtn",
            "type": "taskCompletionBtn",
            "input": true,
            "clearOnHide": false,
            "action": "event",
            "event": "taskCompletion"
        }
    ]
});