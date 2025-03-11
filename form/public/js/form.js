Formio.createForm(document.getElementById('dvf-form-viewer'), {
    components: [
        {
            "type": "columns",
            "columns": [
                {
                    "width": 6,
                    "components": [
                        {
                            "label": "First Name",
                            "placeholder": "Enter your first name",
                            "applyMaskOn": "change",
                            "tableView": true,
                            "validateWhenHidden": false,
                            "key": "firstName",
                            "type": "textfield",
                            "input": true
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
            "label": "Text Field",
            "applyMaskOn": "change",
            "tableView": true,
            "validateWhenHidden": false,
            "key": "textField",
            "type": "textfield",
            "input": true
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
            "defaultValue": "identity:///identityprovider/scim/users/10b32635-f427-4d7e-ac73-bc7aa4ed3055",
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
            "label": "Start process",
            "processId": "test",
            "tableView": false,
            "key": "procStartBtn",
            "type": "procStartBtn",
            "input": true,
            "clearOnHide": false,
            "action": "custom"
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