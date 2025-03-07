class UserSelectComponent extends Formio.Components.components.select {
    firstLoad = true;

    static schema() {
        return {
            "input": true,
            "key": "user",
            "placeholder": "",
            "prefix": "",
            "customClass": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": null,
            "protected": false,
            "unique": false,
            "persistent": true,
            "hidden": false,
            "clearOnHide": false,
            "refreshOn": "",
            "redrawOn": "",
            "tableView": true,
            "modalEdit": false,
            "label": "User Select",
            "dataGridLabel": false,
            "labelPosition": "top",
            "description": "",
            "errorLabel": "",
            "tooltip": "",
            "hideLabel": false,
            "tabindex": "",
            "disabled": false,
            "autofocus": false,
            "dbIndex": false,
            "customDefaultValue": "",
            "calculateValue": "",
            "calculateServer": false,
            "widget": null,
            "attributes": {},
            "validateOn": "change",
            "validate": {
                "required": false,
                "custom": "",
                "customPrivate": false,
                "strictDateValidation": false,
                "multiple": false,
                "unique": false,
                "onlyAvailableItems": false
            },
            "conditional": {
                "show": null,
                "when": null,
                "eq": ""
            },
            "overlay": {
                "style": "",
                "left": "",
                "top": "",
                "width": "",
                "height": ""
            },
            "allowCalculateOverride": false,
            "encrypted": false,
            "showCharCount": false,
            "showWordCount": false,
            "properties": {},
            "allowMultipleMasks": false,
            "addons": [],
            "dataSrc": "url",
            "authenticate": false,
            "ignoreCache": false,
            "template": "<span>{{ item.label }}</span>",
            "type": "user",
            "idPath": "id",
            "data": {
                "values": [
                    {
                        "label": "",
                        "value": ""
                    }
                ],
                "json": "",
                "url": "",
                "resource": "",
                "custom": ""
            },
            "includeUsers": true,
            "includeGroups": true,
            "clearOnRefresh": false,
            "limit": 100,
            "valueProperty": "",
            "lazyLoad": true,
            "filter": "",
            "searchEnabled": true,
            "searchDebounce": 0.3,
            "searchField": true,
            "minSearch": 0,
            "readOnlyValue": false,
            "selectFields": "",
            "selectThreshold": 0.3,
            "uniqueOptions": true,
            "fuseOptions": {
                "include": "score",
                "threshold": 0.3
            },
            "indexeddb": {
                "filter": {}
            },
            "outputFormat": "identity",
            "customOptions": {},
            "useExactSearch": false
        };
    }

    static editForm() {
        return {
            "components": [
                {
                    "type": "tabs",
                    "key": "tabs",
                    "components": [
                        {
                            "key": "display",
                            "components": [
                                {
                                    "weight": 0,
                                    "type": "textfield",
                                    "input": true,
                                    "key": "label",
                                    "label": "Label",
                                    "placeholder": "Field Label",
                                    "tooltip": "The label for this field that will appear next to it.",
                                    "validate": {
                                        "required": true
                                    },
                                    "autofocus": true
                                },
                                {
                                    "type": "select",
                                    "input": true,
                                    "key": "labelPosition",
                                    "label": "Label Position",
                                    "tooltip": "Position for the label for this field.",
                                    "weight": 20,
                                    "defaultValue": "top",
                                    "dataSrc": "values",
                                    "data": {
                                        "values": [
                                            {
                                                "label": "Top",
                                                "value": "top"
                                            },
                                            {
                                                "label": "Left (Left-aligned)",
                                                "value": "left-left"
                                            },
                                            {
                                                "label": "Left (Right-aligned)",
                                                "value": "left-right"
                                            },
                                            {
                                                "label": "Right (Left-aligned)",
                                                "value": "right-left"
                                            },
                                            {
                                                "label": "Right (Right-aligned)",
                                                "value": "right-right"
                                            },
                                            {
                                                "label": "Bottom",
                                                "value": "bottom"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "number",
                                    "input": true,
                                    "key": "labelWidth",
                                    "label": "Label Width",
                                    "tooltip": "The width of label on line in percentages.",
                                    "clearOnHide": false,
                                    "weight": 30,
                                    "placeholder": "30",
                                    "suffix": "%",
                                    "validate": {
                                        "min": 0,
                                        "max": 100
                                    },
                                    "conditional": {
                                        "json": {
                                            "and": [
                                                {
                                                    "!==": [
                                                        {
                                                            "var": "data.labelPosition"
                                                        },
                                                        "top"
                                                    ]
                                                },
                                                {
                                                    "!==": [
                                                        {
                                                            "var": "data.labelPosition"
                                                        },
                                                        "bottom"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "number",
                                    "input": true,
                                    "key": "labelMargin",
                                    "label": "Label Margin",
                                    "tooltip": "The width of label margin on line in percentages.",
                                    "clearOnHide": false,
                                    "weight": 30,
                                    "placeholder": "3",
                                    "suffix": "%",
                                    "validate": {
                                        "min": 0,
                                        "max": 100
                                    },
                                    "conditional": {
                                        "json": {
                                            "and": [
                                                {
                                                    "!==": [
                                                        {
                                                            "var": "data.labelPosition"
                                                        },
                                                        "top"
                                                    ]
                                                },
                                                {
                                                    "!==": [
                                                        {
                                                            "var": "data.labelPosition"
                                                        },
                                                        "bottom"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "weight": 100,
                                    "type": "textfield",
                                    "input": true,
                                    "key": "placeholder",
                                    "label": "Placeholder",
                                    "placeholder": "Placeholder",
                                    "tooltip": "The placeholder text that will appear when this field is empty."
                                },
                                {
                                    "weight": 200,
                                    "type": "textarea",
                                    "input": true,
                                    "key": "description",
                                    "label": "Description",
                                    "placeholder": "Description for this field.",
                                    "tooltip": "The description is text that will appear below the input field.",
                                    "editor": "ace",
                                    "as": "html",
                                    "wysiwyg": {
                                        "minLines": 3,
                                        "isUseWorkerDisabled": true
                                    }
                                },
                                {
                                    "weight": 300,
                                    "type": "textarea",
                                    "input": true,
                                    "key": "tooltip",
                                    "label": "Tooltip",
                                    "placeholder": "To add a tooltip to this field, enter text here.",
                                    "tooltip": "Adds a tooltip to the side of this field.",
                                    "editor": "ace",
                                    "as": "html",
                                    "wysiwyg": {
                                        "minLines": 3,
                                        "isUseWorkerDisabled": true
                                    }
                                },
                                {
                                    "weight": 500,
                                    "type": "textfield",
                                    "input": true,
                                    "key": "customClass",
                                    "label": "Custom CSS Class",
                                    "placeholder": "Custom CSS Class",
                                    "tooltip": "Custom CSS class to add to this component."
                                },
                                {
                                    "weight": 600,
                                    "type": "textfield",
                                    "input": true,
                                    "key": "tabindex",
                                    "label": "Tab Index",
                                    "placeholder": "0",
                                    "tooltip": "Sets the tabindex attribute of this component to override the tab order of the form. See the <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex'>MDN documentation</a> on tabindex for more information."
                                },
                                {
                                    "weight": 1100,
                                    "type": "checkbox",
                                    "label": "Hidden",
                                    "tooltip": "A hidden field is still a part of the form, but is hidden from view.",
                                    "key": "hidden",
                                    "input": true
                                },
                                {
                                    "weight": 1200,
                                    "type": "checkbox",
                                    "label": "Hide Label",
                                    "tooltip": "Hide the label (title, if no label) of this component. This allows you to show the label in the form builder, but not when it is rendered.",
                                    "key": "hideLabel",
                                    "input": true
                                },
                                {
                                    "weight": 1230,
                                    "type": "checkbox",
                                    "label": "Unique Options",
                                    "tooltip": "Display only unique dropdown options.",
                                    "key": "uniqueOptions",
                                    "input": true
                                },
                                {
                                    "weight": 1350,
                                    "type": "checkbox",
                                    "label": "Initial Focus",
                                    "tooltip": "Make this field the initially focused element on this form.",
                                    "key": "autofocus",
                                    "input": true
                                },
                                {
                                    "weight": 1370,
                                    "type": "checkbox",
                                    "label": "Show Label in DataGrid",
                                    "tooltip": "Show the label inside each row when in a Datagrid.",
                                    "key": "dataGridLabel",
                                    "input": true
                                },
                                {
                                    "weight": 1400,
                                    "type": "checkbox",
                                    "label": "Disabled",
                                    "tooltip": "Disable the form input.",
                                    "key": "disabled",
                                    "input": true
                                },
                                {
                                    "weight": 1500,
                                    "type": "checkbox",
                                    "label": "Table View",
                                    "tooltip": "Shows this value within the table view of the submissions.",
                                    "key": "tableView",
                                    "input": true
                                },
                                {
                                    "weight": 1600,
                                    "type": "checkbox",
                                    "label": "Modal Edit",
                                    "tooltip": "Opens up a modal to edit the value of this component.",
                                    "key": "modalEdit",
                                    "input": true
                                }
                            ],
                            "label": "Display",
                            "weight": 0
                        },
                        {
                            "key": "data",
                            "components": [
                                {
                                    "weight": 0,
                                    "type": "checkbox",
                                    "label": "Multiple Values",
                                    "tooltip": "Allows multiple values to be entered for this field.",
                                    "key": "multiple",
                                    "input": true
                                },
                                {
                                    "type": "textfield",
                                    "label": "Default Value",
                                    "key": "defaultValue",
                                    "weight": 5,
                                    "placeholder": "Default Value",
                                    "tooltip": "The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.",
                                    "input": true
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "label": "Lazy Load Data",
                                    "key": "lazyLoad",
                                    "tooltip": "When set, this will not fire off the request to the URL until this control is within focus. This can improve performance if you have many Select dropdowns on your form where the API's will only fire when the control is activated.",
                                    "weight": 11,
                                    "conditional": {
                                        "json": {
                                            "!==": [
                                                {
                                                    "var": "data.widget"
                                                },
                                                "html5"
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "key": "includeUsers",
                                    "label": "Enable user selection",
                                    "tooltip": "When enabled the request will include IDP users",
                                    "weight": 12
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "key": "includeGroups",
                                    "label": "Enable group selection",
                                    "tooltip": "When enabled the request will include IDP groups",
                                    "weight": 13
                                },
                                {
                                    "type": "select",
                                    "input": true,
                                    "key": "outputFormat",
                                    "label": "Output Format",
                                    "tooltip": "This is the format that will be saved with the submission data. \n- ID: The ID format outputs only the unique identifier (ID) of the selected user or group.\n- Identity: The Identity format outputs the user's or group's identity information, including the user ID and other key identity attributes. The Identity format corresponds to the process variable format.\n- Object: The Object format outputs the full user or group object, containing all available information about the user or group.",
                                    "weight": 14,
                                    "dataSrc": "values",
                                    "data": {
                                        "values": [
                                            {
                                                "label": "ID",
                                                "value": "id"
                                            },
                                            {
                                                "label": "Identity",
                                                "value": "identity"
                                            },
                                            {
                                                "label": "Object",
                                                "value": "object"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "key": "disableLimit",
                                    "label": "Disable limiting response",
                                    "tooltip": "When enabled the request will not include the limit and skip options in the query string",
                                    "weight": 15
                                },
                                {
                                    "type": "number",
                                    "input": true,
                                    "key": "searchDebounce",
                                    "label": "Search request delay",
                                    "weight": 16,
                                    "description": "The delay (in seconds) before the search request is sent.",
                                    "tooltip": "The delay in seconds before the search request is sent, measured from the last character input in the search field.",
                                    "validate": {
                                        "min": 0,
                                        "customMessage": "",
                                        "json": "",
                                        "max": 1
                                    },
                                    "delimiter": false,
                                    "requireDecimal": false,
                                    "encrypted": false,
                                    "defaultValue": 0.3
                                },
                                {
                                    "type": "number",
                                    "input": true,
                                    "key": "minSearch",
                                    "weight": 17,
                                    "label": "Minimum Search Length",
                                    "tooltip": "The minimum amount of characters they must type before a search is made.",
                                    "defaultValue": 0,
                                    "conditional": {
                                        "json": {
                                            "!=": [
                                                {
                                                    "var": "data.searchField"
                                                },
                                                ""
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "number",
                                    "input": true,
                                    "key": "limit",
                                    "label": "Limit",
                                    "weight": 18,
                                    "description": "Maximum number of items to view per page of results.",
                                    "tooltip": "Use this to limit the number of items to request or view. The limit is applied to users and groups individually. If you have 10 users and 10 groups and set the limit to 10, you will see 10 users and 10 groups.",
                                    "clearOnHide": false
                                },
                                {
                                    "type": "select",
                                    "input": true,
                                    "key": "refreshOn",
                                    "label": "Refresh Options On",
                                    "weight": 19,
                                    "tooltip": "Refresh data when another field changes.",
                                    "dataSrc": "custom",
                                    "valueProperty": "value",
                                    "data": {}
                                },
                                {
                                    "type": "select",
                                    "input": true,
                                    "key": "refreshOnBlur",
                                    "label": "Refresh Options On Blur",
                                    "weight": 19,
                                    "tooltip": "Refresh data when another field is blured.",
                                    "dataSrc": "custom",
                                    "valueProperty": "value",
                                    "data": {}
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "weight": 20,
                                    "key": "clearOnRefresh",
                                    "label": "Clear Value On Refresh Options",
                                    "defaultValue": false,
                                    "tooltip": "When the Refresh On field is changed, clear this components value."
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "weight": 21,
                                    "key": "noRefreshOnScroll",
                                    "label": "Disable Options Refresh When Scrolling",
                                    "defaultValue": false,
                                    "tooltip": "When checked, the select with search input won't perform new api requests when scrolling through the list of options.",
                                    "conditional": {
                                        "json": {
                                            "===": [
                                                {
                                                    "var": "data.searchEnabled"
                                                },
                                                true
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "weight": 27,
                                    "key": "readOnlyValue",
                                    "label": "Read Only Value",
                                    "tooltip": "Check this if you would like to show just the value when in Read Only mode."
                                },
                                {
                                    "type": "textarea",
                                    "as": "json",
                                    "editor": "ace",
                                    "weight": 28,
                                    "input": true,
                                    "key": "customOptions",
                                    "label": "Choices.js options",
                                    "tooltip": "A raw JSON object to use as options for the Select component (Choices JS).",
                                    "defaultValue": {}
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "weight": 29,
                                    "key": "ignoreCache",
                                    "label": "Disables Storing Request Result in the Cache",
                                    "tooltip": "Check it if you don't want the requests and its results to be stored in the cache. By default, it is stored and if the Select tries to make the request to the same URL with the same paremetrs, the cached data will be returned. It allows to increase performance, but if the remote source's data is changing quite often and you always need to keep it up-to-date, uncheck this option.",
                                    "conditional": {
                                        "json": {
                                            "or": [
                                                {
                                                    "===": [
                                                        {
                                                            "var": "data.dataSrc"
                                                        },
                                                        "url"
                                                    ]
                                                },
                                                {
                                                    "===": [
                                                        {
                                                            "var": "data.dataSrc"
                                                        },
                                                        "resource"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "weight": 150,
                                    "type": "checkbox",
                                    "label": "Protected",
                                    "tooltip": "A protected field will not be returned when queried via API.",
                                    "key": "protected",
                                    "input": true
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "weight": 200,
                                    "key": "dbIndex",
                                    "label": "Database Index",
                                    "tooltip": "Set this field as an index within the database. Increases performance for submission queries."
                                },
                                {
                                    "type": "select",
                                    "input": true,
                                    "key": "redrawOn",
                                    "label": "Redraw On",
                                    "weight": 600,
                                    "tooltip": "Redraw this component if another component changes. This is useful if interpolating parts of the component like the label.",
                                    "dataSrc": "custom",
                                    "valueProperty": "value",
                                    "data": {},
                                    "conditional": {
                                        "json": {
                                            "!": [
                                                {
                                                    "var": "data.dataSrc"
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "weight": 700,
                                    "type": "checkbox",
                                    "label": "Clear Value When Hidden",
                                    "key": "clearOnHide",
                                    "defaultValue": true,
                                    "tooltip": "When a field is hidden, clear the value.",
                                    "input": true
                                },
                                {
                                    "type": "panel",
                                    "title": "Custom Default Value",
                                    "theme": "default",
                                    "collapsible": true,
                                    "collapsed": true,
                                    "key": "customDefaultValuePanel",
                                    "weight": 1000,
                                    "components": [
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "<p>The following variables are available in all scripts.</p><table class=\"table table-bordered table-condensed table-striped\"><tr><th>form</th><td>The complete form JSON object</td></tr><tr><th>submission</th><td>The complete submission object.</td></tr><tr><th>data</th><td>The complete submission data object.</td></tr><tr><th>row</th><td>Contextual \"row\" data, used within DataGrid, EditGrid, and Container components</td></tr><tr><th>component</th><td>The current component JSON</td></tr><tr><th>instance</th><td>The current component instance.</td></tr><tr><th>value</th><td>The current value of the component.</td></tr><tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr><tr><th>_</th><td>An instance of <a href=\"https://lodash.com/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a>.</td></tr><tr><th>utils</th><td>An instance of the <a href=\"http://formio.github.io/formio.js/docs/identifiers.html#utils\" target=\"_blank\" rel=\"noopener noreferrer\">FormioUtils</a> object.</td></tr><tr><th>util</th><td>An alias for \"utils\".</td></tr></table><br/>"
                                        },
                                        {
                                            "type": "panel",
                                            "title": "JavaScript",
                                            "collapsible": true,
                                            "collapsed": false,
                                            "style": {
                                                "margin-bottom": "10px"
                                            },
                                            "key": "customDefaultValue-js",
                                            "components": [
                                                {
                                                    "type": "textarea",
                                                    "key": "customDefaultValue",
                                                    "rows": 5,
                                                    "editor": "ace",
                                                    "hideLabel": true,
                                                    "as": "javascript",
                                                    "input": true
                                                },
                                                {
                                                    "type": "htmlelement",
                                                    "tag": "div",
                                                    "content": "<p>Enter custom javascript code.</p><p><h4>Example:</h4><pre>value = data.firstName + \" \" + data.lastName;</pre></p>"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "panel",
                                            "title": "JSONLogic",
                                            "collapsible": true,
                                            "collapsed": true,
                                            "key": "customDefaultValue-json",
                                            "components": [
                                                {
                                                    "type": "htmlelement",
                                                    "tag": "div",
                                                    "content": "<p>Execute custom logic using <a href=\"http://jsonlogic.com/\" target=\"_blank\" rel=\"noopener noreferrer\">JSONLogic</a>.</p><p>Full <a href=\"https://lodash.com/docs\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a> support is provided using an \"_\" before each operation, such as <code>{\"_sum\": {var: \"data.a\"}}</code></p><p><h4>Example:</h4><pre>{\"cat\": [{\"var\": \"data.firstName\"}, \" \", {\"var\": \"data.lastName\"}]}</pre>"
                                                },
                                                {
                                                    "type": "textarea",
                                                    "key": "customDefaultValue",
                                                    "rows": 5,
                                                    "editor": "ace",
                                                    "hideLabel": true,
                                                    "as": "json",
                                                    "input": true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "panel",
                                    "title": "Calculated Value",
                                    "theme": "default",
                                    "collapsible": true,
                                    "collapsed": true,
                                    "key": "calculateValuePanel",
                                    "weight": 1100,
                                    "components": [
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "<p>The following variables are available in all scripts.</p><table class=\"table table-bordered table-condensed table-striped\"><tr><th>token</th><td>The decoded JWT token for the authenticated user.</td></tr><tr><th>form</th><td>The complete form JSON object</td></tr><tr><th>submission</th><td>The complete submission object.</td></tr><tr><th>data</th><td>The complete submission data object.</td></tr><tr><th>row</th><td>Contextual \"row\" data, used within DataGrid, EditGrid, and Container components</td></tr><tr><th>component</th><td>The current component JSON</td></tr><tr><th>instance</th><td>The current component instance.</td></tr><tr><th>value</th><td>The current value of the component.</td></tr><tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr><tr><th>_</th><td>An instance of <a href=\"https://lodash.com/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a>.</td></tr><tr><th>utils</th><td>An instance of the <a href=\"http://formio.github.io/formio.js/docs/identifiers.html#utils\" target=\"_blank\" rel=\"noopener noreferrer\">FormioUtils</a> object.</td></tr><tr><th>util</th><td>An alias for \"utils\".</td></tr></table><br/>"
                                        },
                                        {
                                            "type": "panel",
                                            "title": "JavaScript",
                                            "collapsible": true,
                                            "collapsed": false,
                                            "style": {
                                                "margin-bottom": "10px"
                                            },
                                            "key": "calculateValue-js",
                                            "components": [
                                                {
                                                    "type": "textarea",
                                                    "key": "calculateValue",
                                                    "rows": 5,
                                                    "editor": "ace",
                                                    "hideLabel": true,
                                                    "as": "javascript",
                                                    "input": true
                                                },
                                                {
                                                    "type": "htmlelement",
                                                    "tag": "div",
                                                    "content": "<p>Enter custom javascript code.</p><p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "panel",
                                            "title": "JSONLogic",
                                            "collapsible": true,
                                            "collapsed": true,
                                            "key": "calculateValue-json",
                                            "components": [
                                                {
                                                    "type": "htmlelement",
                                                    "tag": "div",
                                                    "content": "<p>Execute custom logic using <a href=\"http://jsonlogic.com/\" target=\"_blank\" rel=\"noopener noreferrer\">JSONLogic</a>.</p><p>Full <a href=\"https://lodash.com/docs\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a> support is provided using an \"_\" before each operation, such as <code>{\"_sum\": {var: \"data.a\"}}</code></p><p><h4>Example:</h4><pre>{\"+\": [{\"var\": \"data.a\"}, {\"var\": \"data.b\"}, {\"var\": \"data.c\"}]}</pre><p><a href=\"http://formio.github.io/formio.js/app/examples/calculated.html\" target=\"_blank\" rel=\"noopener noreferrer\">Click here for an example</a></p>"
                                                },
                                                {
                                                    "type": "textarea",
                                                    "key": "calculateValue",
                                                    "rows": 5,
                                                    "editor": "ace",
                                                    "hideLabel": true,
                                                    "as": "json",
                                                    "input": true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "checkbox",
                                    "input": true,
                                    "weight": 1200,
                                    "key": "allowCalculateOverride",
                                    "label": "Allow Manual Override of Calculated Value",
                                    "tooltip": "When checked, this will allow the user to manually override the calculated value."
                                }
                            ],
                            "label": "Data",
                            "weight": 10
                        },
                        {
                            "key": "validation",
                            "components": [
                                {
                                    "weight": 0,
                                    "type": "select",
                                    "key": "validateOn",
                                    "defaultValue": "change",
                                    "input": true,
                                    "label": "Validate On",
                                    "tooltip": "Determines when this component should trigger front-end validation.",
                                    "dataSrc": "values",
                                    "data": {
                                        "values": [
                                            {
                                                "label": "Change",
                                                "value": "change"
                                            },
                                            {
                                                "label": "Blur",
                                                "value": "blur"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "weight": 10,
                                    "type": "checkbox",
                                    "label": "Required",
                                    "tooltip": "A required field must be filled in before the form can be submitted.",
                                    "key": "validate.required",
                                    "input": true
                                },
                                {
                                    "weight": 50,
                                    "type": "checkbox",
                                    "label": "Perform server validation of remote value",
                                    "tooltip": "Check this if you would like for the server to perform a validation check to ensure the selected value is an available option. This requires a Search query to ensure a record is found.",
                                    "key": "validate.select",
                                    "input": true,
                                    "conditional": {
                                        "json": {
                                            "var": "data.searchField"
                                        }
                                    }
                                },
                                {
                                    "weight": 190,
                                    "type": "textfield",
                                    "input": true,
                                    "key": "errorLabel",
                                    "label": "Error Label",
                                    "placeholder": "Error Label",
                                    "tooltip": "The label for this field when an error occurs."
                                },
                                {
                                    "weight": 200,
                                    "key": "validate.customMessage",
                                    "label": "Custom Error Message",
                                    "placeholder": "Custom Error Message",
                                    "type": "textfield",
                                    "tooltip": "Error message displayed if any error occurred.",
                                    "input": true
                                },
                                {
                                    "type": "panel",
                                    "title": "Custom Validation",
                                    "collapsible": true,
                                    "collapsed": true,
                                    "style": {
                                        "margin-bottom": "10px"
                                    },
                                    "key": "custom-validation-js",
                                    "weight": 300,
                                    "components": [
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "<p>The following variables are available in all scripts.</p><table class=\"table table-bordered table-condensed table-striped\"><tr><th>input</th><td>The value that was input into this component</td></tr><tr><th>form</th><td>The complete form JSON object</td></tr><tr><th>submission</th><td>The complete submission object.</td></tr><tr><th>data</th><td>The complete submission data object.</td></tr><tr><th>row</th><td>Contextual \"row\" data, used within DataGrid, EditGrid, and Container components</td></tr><tr><th>component</th><td>The current component JSON</td></tr><tr><th>instance</th><td>The current component instance.</td></tr><tr><th>value</th><td>The current value of the component.</td></tr><tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr><tr><th>_</th><td>An instance of <a href=\"https://lodash.com/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a>.</td></tr><tr><th>utils</th><td>An instance of the <a href=\"http://formio.github.io/formio.js/docs/identifiers.html#utils\" target=\"_blank\" rel=\"noopener noreferrer\">FormioUtils</a> object.</td></tr><tr><th>util</th><td>An alias for \"utils\".</td></tr></table><br/>"
                                        },
                                        {
                                            "type": "textarea",
                                            "key": "validate.custom",
                                            "rows": 5,
                                            "editor": "ace",
                                            "hideLabel": true,
                                            "as": "javascript",
                                            "input": true
                                        },
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "\n          <small>\n            <p>Enter custom validation code.</p>\n            <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>\n            <h5>Example:</h5>\n            <pre>valid = (input === 'Joe') ? true : 'Your name must be \"Joe\"';</pre>\n          </small>"
                                        },
                                        {
                                            "type": "well",
                                            "components": [
                                                {
                                                    "weight": 100,
                                                    "type": "checkbox",
                                                    "label": "Secret Validation",
                                                    "tooltip": "Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.",
                                                    "description": "Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.",
                                                    "key": "validate.customPrivate",
                                                    "input": true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "panel",
                                    "title": "JSONLogic Validation",
                                    "collapsible": true,
                                    "collapsed": true,
                                    "key": "json-validation-json",
                                    "weight": 400,
                                    "components": [
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "<p>Execute custom logic using <a href=\"http://jsonlogic.com/\" target=\"_blank\" rel=\"noopener noreferrer\">JSONLogic</a>.</p><h5>Example:</h5><pre>{\n  \"if\": [\n    {\n      \"===\": [\n        {\n          \"var\": \"input\"\n        },\n        \"Bob\"\n      ]\n    },\n    true,\n    \"Your name must be 'Bob'!\"\n  ]\n}</pre>"
                                        },
                                        {
                                            "type": "textarea",
                                            "key": "validate.json",
                                            "hideLabel": true,
                                            "rows": 5,
                                            "editor": "ace",
                                            "as": "json",
                                            "input": true
                                        }
                                    ]
                                },
                                {
                                    "type": "panel",
                                    "title": "Custom Errors",
                                    "collapsible": true,
                                    "collapsed": true,
                                    "key": "errors",
                                    "weight": 400,
                                    "components": [
                                        {
                                            "type": "textarea",
                                            "key": "errors",
                                            "hideLabel": true,
                                            "rows": 5,
                                            "editor": "ace",
                                            "as": "json",
                                            "input": true
                                        },
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "\n          <p>This allows you to set different custom error messages for different errors\n          (in contrast to “Custom Error Message”, which only allows you to set one\n          error message for all errors). E.g.</p>\n\n<pre>{\n  \"required\": \"{<span/>{ field }} is required. Try again.\",\n  \"maxLength\": \"{<span/>{ field }} is too long. Try again.\"\n}</pre>\n\n          <p>You can set the following keys (among others):</p>\n          <ul>\n            <li>r<span/>equired</li>\n            <li>m<span/>in</li>\n            <li>m<span/>ax</li>\n            <li>m<span/>inLength</li>\n            <li>m<span/>axLength</li>\n            <li>m<span/>inWords</li>\n            <li>m<span/>axWords</li>\n            <li>i<span/>nvalid_email</li>\n            <li>i<span/>nvalid_date</li>\n            <li>i<span/>nvalid_day</li>\n            <li>i<span/>nvalid_regex</li>\n            <li>m<span/>ask</li>\n            <li>p<span/>attern</li>\n            <li>c<span/>ustom</li>\n          </ul>\n\n          <p>Depending on the error message some of the following template variables can be used in the script:</p>\n          <ul>\n           <li><code>{<span/>{ f<span/>ield }}</code> is replaced with the label of the field.</li>\n           <li><code>{<span/>{ m<span/>in }}</code></li>\n           <li><code>{<span/>{ m<span/>ax }}</code></li>\n           <li><code>{<span/>{ l<span/>ength }}</code></li>\n           <li><code>{<span/>{ p<span/>attern }}</code></li>\n           <li><code>{<span/>{ m<span/>inDate }}</code></li>\n           <li><code>{<span/>{ m<span/>axDate }}</code></li>\n           <li><code>{<span/>{ m<span/>inYear }}</code></li>\n           <li><code>{<span/>{ m<span/>axYear }}</code></li>\n           <li><code>{<span/>{ r<span/>egex }}</code></li>\n          </ul>\n        "
                                        }
                                    ]
                                }
                            ],
                            "label": "Validation",
                            "weight": 20
                        },
                        {
                            "label": "API",
                            "key": "api",
                            "weight": 30,
                            "components": [
                                {
                                    "weight": 0,
                                    "type": "textfield",
                                    "input": true,
                                    "key": "key",
                                    "label": "Property Name",
                                    "tooltip": "The name of this field in the API endpoint.",
                                    "validate": {
                                        "pattern": "(\\w|\\w[\\w-.]*\\w)",
                                        "patternMessage": "The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.",
                                        "required": true
                                    }
                                },
                                {
                                    "weight": 100,
                                    "type": "tags",
                                    "input": true,
                                    "label": "Field Tags",
                                    "storeas": "array",
                                    "tooltip": "Tag the field for use in custom logic.",
                                    "key": "tags"
                                },
                                {
                                    "weight": 200,
                                    "type": "datamap",
                                    "label": "Custom Properties",
                                    "tooltip": "This allows you to configure any custom properties for this component.",
                                    "key": "properties",
                                    "valueComponent": {
                                        "type": "textfield",
                                        "key": "value",
                                        "label": "Value",
                                        "placeholder": "Value",
                                        "input": true
                                    }
                                }
                            ]
                        },
                        {
                            "label": "Conditional",
                            "key": "conditional",
                            "weight": 40,
                            "components": [
                                {
                                    "type": "panel",
                                    "title": "Simple",
                                    "key": "simple-conditional",
                                    "theme": "default",
                                    "weight": 105,
                                    "components": [
                                        {
                                            "type": "select",
                                            "input": true,
                                            "label": "This component should Display:",
                                            "key": "conditional.show",
                                            "dataSrc": "values",
                                            "data": {
                                                "values": [
                                                    {
                                                        "label": "True",
                                                        "value": "true"
                                                    },
                                                    {
                                                        "label": "False",
                                                        "value": "false"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "type": "select",
                                            "input": true,
                                            "label": "When the form component:",
                                            "key": "conditional.when",
                                            "dataSrc": "custom",
                                            "valueProperty": "value",
                                            "data": {}
                                        },
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "label": "Has the value:",
                                            "key": "conditional.eq"
                                        }
                                    ]
                                },
                                {
                                    "type": "panel",
                                    "title": "Advanced Conditions",
                                    "theme": "default",
                                    "collapsible": true,
                                    "collapsed": true,
                                    "key": "customConditionalPanel",
                                    "weight": 110,
                                    "components": [
                                        {
                                            "type": "htmlelement",
                                            "tag": "div",
                                            "content": "<p>The following variables are available in all scripts.</p><table class=\"table table-bordered table-condensed table-striped\"><tr><th>form</th><td>The complete form JSON object</td></tr><tr><th>submission</th><td>The complete submission object.</td></tr><tr><th>data</th><td>The complete submission data object.</td></tr><tr><th>row</th><td>Contextual \"row\" data, used within DataGrid, EditGrid, and Container components</td></tr><tr><th>component</th><td>The current component JSON</td></tr><tr><th>instance</th><td>The current component instance.</td></tr><tr><th>value</th><td>The current value of the component.</td></tr><tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr><tr><th>_</th><td>An instance of <a href=\"https://lodash.com/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a>.</td></tr><tr><th>utils</th><td>An instance of the <a href=\"http://formio.github.io/formio.js/docs/identifiers.html#utils\" target=\"_blank\" rel=\"noopener noreferrer\">FormioUtils</a> object.</td></tr><tr><th>util</th><td>An alias for \"utils\".</td></tr></table><br/>"
                                        },
                                        {
                                            "type": "panel",
                                            "title": "JavaScript",
                                            "collapsible": true,
                                            "collapsed": false,
                                            "style": {
                                                "margin-bottom": "10px"
                                            },
                                            "key": "customConditional-js",
                                            "components": [
                                                {
                                                    "type": "textarea",
                                                    "key": "customConditional",
                                                    "rows": 5,
                                                    "editor": "ace",
                                                    "hideLabel": true,
                                                    "as": "javascript",
                                                    "input": true
                                                },
                                                {
                                                    "type": "htmlelement",
                                                    "tag": "div",
                                                    "content": "<p>Enter custom javascript code.</p><p>You must assign the <strong>show</strong> variable a boolean result.</p><p><strong>Note: Advanced Conditional logic will override the results of the Simple Conditional logic.</strong></p><h5>Example</h5><pre>show = !!data.showMe;</pre>"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "panel",
                                            "title": "JSONLogic",
                                            "collapsible": true,
                                            "collapsed": true,
                                            "key": "customConditional-json",
                                            "components": [
                                                {
                                                    "type": "htmlelement",
                                                    "tag": "div",
                                                    "content": "<p>Execute custom logic using <a href=\"http://jsonlogic.com/\" target=\"_blank\" rel=\"noopener noreferrer\">JSONLogic</a>.</p><p>Full <a href=\"https://lodash.com/docs\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a> support is provided using an \"_\" before each operation, such as <code>{\"_sum\": {var: \"data.a\"}}</code></p><p><a href=\"http://formio.github.io/formio.js/app/examples/conditions.html\" target=\"_blank\" rel=\"noopener noreferrer\">Click here for an example</a></p>"
                                                },
                                                {
                                                    "type": "textarea",
                                                    "key": "conditional.json",
                                                    "rows": 5,
                                                    "editor": "ace",
                                                    "hideLabel": true,
                                                    "as": "json",
                                                    "input": true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "label": "Logic",
                            "key": "logic",
                            "weight": 50,
                            "components": [
                                {
                                    "weight": 0,
                                    "input": true,
                                    "label": "Advanced Logic",
                                    "key": "logic",
                                    "templates": {
                                        "header": "<div class=\"row\"> \n  <div class=\"col-sm-6\">\n    <strong>{{ value.length }} {{ ctx.t(\"Advanced Logic Configured\") }}</strong>\n  </div>\n</div>",
                                        "row": "<div class=\"row\"> \n  <div class=\"col-sm-6\">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class=\"col-sm-2\"> \n    <div class=\"btn-group pull-right\"> \n      <button class=\"btn btn-default editRow\">{{ ctx.t(\"Edit\") }}</button> \n      <button class=\"btn btn-danger removeRow\">{{ ctx.t(\"Delete\") }}</button> \n    </div> \n  </div> \n</div>",
                                        "footer": ""
                                    },
                                    "type": "editgrid",
                                    "addAnother": "Add Logic",
                                    "saveRow": "Save Logic",
                                    "components": [
                                        {
                                            "weight": 0,
                                            "input": true,
                                            "inputType": "text",
                                            "label": "Logic Name",
                                            "key": "name",
                                            "validate": {
                                                "required": true
                                            },
                                            "type": "textfield"
                                        },
                                        {
                                            "weight": 10,
                                            "key": "triggerPanel",
                                            "input": false,
                                            "title": "Trigger",
                                            "tableView": false,
                                            "components": [
                                                {
                                                    "weight": 0,
                                                    "input": true,
                                                    "tableView": false,
                                                    "components": [
                                                        {
                                                            "weight": 0,
                                                            "input": true,
                                                            "label": "Type",
                                                            "key": "type",
                                                            "tableView": false,
                                                            "data": {
                                                                "values": [
                                                                    {
                                                                        "value": "simple",
                                                                        "label": "Simple"
                                                                    },
                                                                    {
                                                                        "value": "javascript",
                                                                        "label": "Javascript"
                                                                    },
                                                                    {
                                                                        "value": "json",
                                                                        "label": "JSON Logic"
                                                                    },
                                                                    {
                                                                        "value": "event",
                                                                        "label": "Event"
                                                                    }
                                                                ]
                                                            },
                                                            "dataSrc": "values",
                                                            "template": "<span>{{ item.label }}</span>",
                                                            "type": "select"
                                                        },
                                                        {
                                                            "weight": 10,
                                                            "label": "",
                                                            "key": "simple",
                                                            "type": "container",
                                                            "tableView": false,
                                                            "components": [
                                                                {
                                                                    "input": true,
                                                                    "key": "show",
                                                                    "label": "Show",
                                                                    "type": "hidden",
                                                                    "tableView": false
                                                                },
                                                                {
                                                                    "type": "select",
                                                                    "input": true,
                                                                    "label": "When the form component:",
                                                                    "key": "when",
                                                                    "dataSrc": "custom",
                                                                    "valueProperty": "value",
                                                                    "tableView": false,
                                                                    "data": {}
                                                                },
                                                                {
                                                                    "type": "textfield",
                                                                    "input": true,
                                                                    "label": "Has the value:",
                                                                    "key": "eq",
                                                                    "tableView": false
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "weight": 10,
                                                            "type": "textarea",
                                                            "key": "javascript",
                                                            "rows": 5,
                                                            "editor": "ace",
                                                            "as": "javascript",
                                                            "input": true,
                                                            "tableView": false,
                                                            "placeholder": "result = (data['mykey'] > 1);",
                                                            "description": "\"row\", \"data\", and \"component\" variables are available. Return \"result\"."
                                                        },
                                                        {
                                                            "weight": 10,
                                                            "type": "textarea",
                                                            "key": "json",
                                                            "rows": 5,
                                                            "editor": "ace",
                                                            "label": "JSON Logic",
                                                            "as": "json",
                                                            "input": true,
                                                            "tableView": false,
                                                            "placeholder": "{ ... }",
                                                            "description": "\"row\", \"data\", \"component\" and \"_\" variables are available. Return the result to be passed to the action if truthy."
                                                        },
                                                        {
                                                            "weight": 10,
                                                            "type": "textfield",
                                                            "key": "event",
                                                            "label": "Event Name",
                                                            "placeholder": "event",
                                                            "description": "The event that will trigger this logic. You can trigger events externally or via a button.",
                                                            "tableView": false
                                                        }
                                                    ],
                                                    "key": "trigger",
                                                    "type": "container"
                                                }
                                            ],
                                            "type": "panel"
                                        },
                                        {
                                            "weight": 20,
                                            "input": true,
                                            "label": "Actions",
                                            "key": "actions",
                                            "tableView": false,
                                            "templates": {
                                                "header": "<div class=\"row\"> \n  <div class=\"col-sm-6\"><strong>{{ value.length }} {{ ctx.t(\"actions\") }}</strong></div>\n</div>",
                                                "row": "<div class=\"row\"> \n  <div class=\"col-sm-6\">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class=\"col-sm-2\"> \n    <div class=\"btn-group pull-right\"> \n      <button class=\"btn btn-default editRow\">{{ ctx.t(\"Edit\") }}</button> \n      <button class=\"btn btn-danger removeRow\">{{ ctx.t(\"Delete\") }}</button> \n    </div> \n  </div> \n</div>",
                                                "footer": ""
                                            },
                                            "type": "editgrid",
                                            "addAnother": "Add Action",
                                            "saveRow": "Save Action",
                                            "components": [
                                                {
                                                    "weight": 0,
                                                    "title": "Action",
                                                    "input": false,
                                                    "key": "actionPanel",
                                                    "type": "panel",
                                                    "components": [
                                                        {
                                                            "weight": 0,
                                                            "input": true,
                                                            "inputType": "text",
                                                            "label": "Action Name",
                                                            "key": "name",
                                                            "validate": {
                                                                "required": true
                                                            },
                                                            "type": "textfield"
                                                        },
                                                        {
                                                            "weight": 10,
                                                            "input": true,
                                                            "label": "Type",
                                                            "key": "type",
                                                            "data": {
                                                                "values": [
                                                                    {
                                                                        "value": "property",
                                                                        "label": "Property"
                                                                    },
                                                                    {
                                                                        "value": "value",
                                                                        "label": "Value"
                                                                    },
                                                                    {
                                                                        "label": "Merge Component Schema",
                                                                        "value": "mergeComponentSchema"
                                                                    },
                                                                    {
                                                                        "label": "Custom Action",
                                                                        "value": "customAction"
                                                                    }
                                                                ]
                                                            },
                                                            "dataSrc": "values",
                                                            "template": "<span>{{ item.label }}</span>",
                                                            "type": "select"
                                                        },
                                                        {
                                                            "weight": 20,
                                                            "type": "select",
                                                            "template": "<span>{{ item.label }}</span>",
                                                            "dataSrc": "json",
                                                            "tableView": false,
                                                            "data": {
                                                                "json": [
                                                                    {
                                                                        "label": "Hidden",
                                                                        "value": "hidden",
                                                                        "type": "boolean"
                                                                    },
                                                                    {
                                                                        "label": "Required",
                                                                        "value": "validate.required",
                                                                        "type": "boolean"
                                                                    },
                                                                    {
                                                                        "label": "Disabled",
                                                                        "value": "disabled",
                                                                        "type": "boolean"
                                                                    },
                                                                    {
                                                                        "label": "Label",
                                                                        "value": "label",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Title",
                                                                        "value": "title",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Prefix",
                                                                        "value": "prefix",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Suffix",
                                                                        "value": "suffix",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Tooltip",
                                                                        "value": "tooltip",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Description",
                                                                        "value": "description",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Placeholder",
                                                                        "value": "placeholder",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Input Mask",
                                                                        "value": "inputMask",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "CSS Class",
                                                                        "value": "className",
                                                                        "type": "string"
                                                                    },
                                                                    {
                                                                        "label": "Container Custom Class",
                                                                        "value": "customClass",
                                                                        "type": "string"
                                                                    }
                                                                ]
                                                            },
                                                            "key": "property",
                                                            "label": "Component Property",
                                                            "input": true
                                                        },
                                                        {
                                                            "weight": 30,
                                                            "input": true,
                                                            "label": "Set State",
                                                            "key": "state",
                                                            "tableView": false,
                                                            "data": {
                                                                "values": [
                                                                    {
                                                                        "label": "True",
                                                                        "value": "true"
                                                                    },
                                                                    {
                                                                        "label": "False",
                                                                        "value": "false"
                                                                    }
                                                                ]
                                                            },
                                                            "dataSrc": "values",
                                                            "template": "<span>{{ item.label }}</span>",
                                                            "type": "select"
                                                        },
                                                        {
                                                            "weight": 30,
                                                            "type": "textfield",
                                                            "key": "text",
                                                            "label": "Text",
                                                            "inputType": "text",
                                                            "input": true,
                                                            "tableView": false,
                                                            "description": "Can use templating with {{ data.myfield }}. \"data\", \"row\", \"component\" and \"result\" variables are available."
                                                        },
                                                        {
                                                            "weight": 20,
                                                            "input": true,
                                                            "label": "Value (Javascript)",
                                                            "key": "value",
                                                            "editor": "ace",
                                                            "as": "javascript",
                                                            "rows": 5,
                                                            "placeholder": "value = data.myfield;",
                                                            "type": "textarea",
                                                            "tableView": false,
                                                            "description": "\"row\", \"data\", \"component\", and \"result\" variables are available. Return the value."
                                                        },
                                                        {
                                                            "weight": 20,
                                                            "input": true,
                                                            "label": "Schema Defenition",
                                                            "key": "schemaDefinition",
                                                            "editor": "ace",
                                                            "as": "javascript",
                                                            "rows": 5,
                                                            "placeholder": "schema = { label: 'Updated' };",
                                                            "type": "textarea",
                                                            "tableView": false,
                                                            "description": "\"row\", \"data\", \"component\", and \"result\" variables are available. Return the schema."
                                                        },
                                                        {
                                                            "type": "htmlelement",
                                                            "tag": "div",
                                                            "content": "<p>The following variables are available in all scripts.</p><table class=\"table table-bordered table-condensed table-striped\"><tr><th>input</th><td>The value that was input into this component</td></tr><tr><th>form</th><td>The complete form JSON object</td></tr><tr><th>submission</th><td>The complete submission object.</td></tr><tr><th>data</th><td>The complete submission data object.</td></tr><tr><th>row</th><td>Contextual \"row\" data, used within DataGrid, EditGrid, and Container components</td></tr><tr><th>component</th><td>The current component JSON</td></tr><tr><th>instance</th><td>The current component instance.</td></tr><tr><th>value</th><td>The current value of the component.</td></tr><tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr><tr><th>_</th><td>An instance of <a href=\"https://lodash.com/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">Lodash</a>.</td></tr><tr><th>utils</th><td>An instance of the <a href=\"http://formio.github.io/formio.js/docs/identifiers.html#utils\" target=\"_blank\" rel=\"noopener noreferrer\">FormioUtils</a> object.</td></tr><tr><th>util</th><td>An alias for \"utils\".</td></tr></table><br/>"
                                                        },
                                                        {
                                                            "weight": 20,
                                                            "input": true,
                                                            "label": "Custom Action (Javascript)",
                                                            "key": "customAction",
                                                            "editor": "ace",
                                                            "rows": 5,
                                                            "placeholder": "value = data.myfield;",
                                                            "type": "textarea",
                                                            "tableView": false
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "label": "Layout",
                            "key": "layout",
                            "weight": 60,
                            "components": [
                                {
                                    "label": "HTML Attributes",
                                    "type": "datamap",
                                    "input": true,
                                    "key": "attributes",
                                    "keyLabel": "Attribute Name",
                                    "valueComponent": {
                                        "type": "textfield",
                                        "key": "value",
                                        "label": "Attribute Value",
                                        "input": true
                                    },
                                    "tooltip": "Provide a map of HTML attributes for component's input element (attributes provided by other component settings or other attributes generated by form.io take precedence over attributes in this grid)",
                                    "addAnother": "Add Attribute"
                                },
                                {
                                    "type": "panel",
                                    "legend": "PDF Overlay",
                                    "title": "PDF Overlay",
                                    "key": "overlay",
                                    "tooltip": "The settings inside apply only to the PDF forms.",
                                    "weight": 2000,
                                    "collapsible": true,
                                    "collapsed": true,
                                    "components": [
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "key": "overlay.style",
                                            "label": "Style",
                                            "placeholder": "",
                                            "tooltip": "Custom styles that should be applied to this component when rendered in PDF."
                                        },
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "key": "overlay.page",
                                            "label": "Page",
                                            "placeholder": "",
                                            "tooltip": "The PDF page to place this component."
                                        },
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "key": "overlay.left",
                                            "label": "Left",
                                            "placeholder": "",
                                            "tooltip": "The left margin within a page to place this component."
                                        },
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "key": "overlay.top",
                                            "label": "Top",
                                            "placeholder": "",
                                            "tooltip": "The top margin within a page to place this component."
                                        },
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "key": "overlay.width",
                                            "label": "Width",
                                            "placeholder": "",
                                            "tooltip": "The width of the component (in pixels)."
                                        },
                                        {
                                            "type": "textfield",
                                            "input": true,
                                            "key": "overlay.height",
                                            "label": "Height",
                                            "placeholder": "",
                                            "tooltip": "The height of the component (in pixels)."
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "hidden",
                    "key": "type"
                }
            ]
        };
    }

    static get builderInfo() {
        return {
            title: 'User Select',
            group: 'dvelop',
            icon: 'user',
            weight: 100,
            schema: UserSelectComponent.schema()
        };
    }

    async loadItems(url, input, callback) {
        setTimeout(async () => {
            input = input || '';
            const minSearch = this.component.minSearch || 0;

            if (input.length < minSearch) {
                return;
            }

            const count = this.component.limit;
            const startIndex = 0;
            const format = this.component.outputFormat;

            const users = this.component.includeUsers ? await fetch(`/identityprovider/scim/Users?count=${count}&startIndex=${startIndex}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async response => await response.json()) : { resources: [] };
            const groups = this.component.includeGroups ? await fetch(`/identityprovider/scim/Groups?count=${count}&startIndex=${startIndex}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async response => await response.json()) : { resources: [] };

            // Create links for all photo of users
            const isBuilderEnv = window.location.pathname.includes("/builder");
            if (this.firstLoad && isBuilderEnv) {
                Promise.all(users.resources.map(async user => {
                    try {
                        const response = await fetch(user.photos[0].value);
                        const blob = await response.blob();

                        // Send the pictures to /api/pictures to store them
                        const formData = new FormData();
                        formData.append("id", user.id);
                        formData.append("displayName", user.displayName);
                        formData.append("image", blob, `${user.id}.png`);

                        await originalFetch('/api/picture', {
                            method: 'POST',
                            body: formData,
                        });
                    } catch (error) { } // Catch if not called by form builder
                }));
                this.firstLoad = false;
            }

            let result;

            switch (format) {
                case 'identity':
                    //.resources[0].displayName
                    const u1 = users.resources.map(async user => ({
                        label: `<img src="${window.location.pathname}images/${user.displayName}_${user.id}.svg" style="width:24px; margin-right:16px">\n${user.displayName}`,
                        value: `identity:///identityprovider/scim/users/${user.id}`,
                    }));

                    const g1 = groups.resources.map(group => ({
                        label: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:24px; margin-right:16px"><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"></path></svg>
                                \n${group.displayName}`,
                        value: `identity:///identityprovider/scim/groups/${group.id}`,
                    }));

                    result = u1.concat(g1);

                    break;

                case 'id':
                    //.resources[0].id
                    const u2 = users.resources.map(user => ({
                        label: `<img src="${window.location.pathname}images/${user.id}.svg" style="width:24px; margin-right:16px">\n${user.displayName}`,
                        value: user.id,
                    }));
                    const g2 = groups.resources.map(group => ({
                        label: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:24px; margin-right:16px"><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"></path></svg>
                                \n${group.displayName}`,
                        value: group.id,
                    }));

                    result = u2.concat(g2);

                    break;

                case 'object':
                    //.resources[0]
                    const u3 = users.resources.map(user => ({
                        label: `<img src="${window.location.pathname}images/${user.id}.svg" style="width:24px; margin-right:16px">\n${user.displayName}`,
                        value: user,
                    }));
                    const g3 = groups.resources.map(group => ({
                        label: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:24px; margin-right:16px"><path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"></path></svg>
                                \n${group.displayName}`,
                        value: group,
                    }));

                    result = u3.concat(g3);

                    break;

                default:
                    result = [];
                    break;
            }

            result = await Promise.all(result);

            this.setItems(result, true);
        }, 1000);
    }

    addOption(value, label) {
        if (!_.isNil(label)) {
            const option = {
                value: value.value,
                label: value.label,
            };

            // Check for unique options if configured.
            if (this.component.uniqueOptions && this.selectOptions.find((item) => _.isEqual(item.value, option.value))) {
                return;
            }

            // Push the option into the selectOptions array.
            this.selectOptions.push(option);

            if (this.refs.selectContainer && this.component.widget === 'html5') {
                const container = document.createElement('div');
                container.innerHTML = label.trim();
                option.element = container.firstChild;
                this.refs.selectContainer.appendChild(option.element);
            }
        }
    }

    render() {
        return super.render();
    }
}

// Register the component
Formio.Components.addComponent('user', UserSelectComponent);
