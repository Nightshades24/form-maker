class ProcessStartComponent extends Formio.Components.components.button {
    static schema() {
        return {
            "input": true,
            "key": "procStartBtn",
            "placeholder": "",
            "prefix": "",
            "customClass": "",
            "suffix": "",
            "multiple": false,
            "defaultValue": null,
            "protected": false,
            "unique": false,
            "persistent": false,
            "hidden": false,
            "clearOnHide": false,
            "refreshOn": "",
            "redrawOn": "",
            "tableView": false,
            "modalEdit": false,
            "label": "Start process",
            "dataGridLabel": true,
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
            "widget": {
              "type": "input"
            },
            "attributes": {},
            "validateOn": "change",
            "validate": {
              "required": false,
              "custom": "",
              "customPrivate": false,
              "strictDateValidation": false,
              "multiple": false,
              "unique": false
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
            "businessKey": "",
            "type": "procStartBtn",
            "size": "md",
            "leftIcon": "",
            "rightIcon": "",
            "block": false,
            "action": "custom",
            "disableOnInvalid": false,
            "theme": "primary"
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
                        "key": "processId",
                        "label": "Process",
                        "input": true,
                        "tooltip": "The process that this button will start.",
                        "weight": 1,
                        "dataSrc": "custom",
                        "valueProperty": "id",
                        "data": {
                            "custom": "values = Promise.resolve(getValues());",
                        },
                        "validate": {
                          "required": true
                        },
                        "dataType": "object",
                        "idPath": "id",
                        "template": "<span>{{ item.displayName }}</span>",
                        "selectValues": "processes"
                      },
                      {
                        "type": "textfield",
                        "key": "businessKey",
                        "label": "Business Key",
                        "input": true,
                        "tooltip": "When the process is started, this will be the business key of the process instance. If you are in need of dynamic business keys, you can use a templated string like this: {ㅤ{ data.textFieldKey }}.",
                        "weight": 2,
                        "validate": {
                          "maxLength": 255
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
                        "type": "select",
                        "key": "theme",
                        "label": "Theme",
                        "input": true,
                        "tooltip": "The color theme of this button.",
                        "dataSrc": "values",
                        "weight": 140,
                        "data": {
                          "values": [
                            {
                              "label": "Primary",
                              "value": "primary"
                            },
                            {
                              "label": "Secondary",
                              "value": "secondary"
                            },
                            {
                              "label": "Info",
                              "value": "info"
                            },
                            {
                              "label": "Success",
                              "value": "success"
                            },
                            {
                              "label": "Danger",
                              "value": "danger"
                            },
                            {
                              "label": "Warning",
                              "value": "warning"
                            }
                          ]
                        }
                      },
                      {
                        "type": "select",
                        "key": "size",
                        "label": "Size",
                        "input": true,
                        "tooltip": "The size of this button.",
                        "dataSrc": "values",
                        "weight": 150,
                        "data": {
                          "values": [
                            {
                              "label": "Small",
                              "value": "sm"
                            },
                            {
                              "label": "Medium",
                              "value": "md"
                            },
                            {
                              "label": "Large",
                              "value": "lg"
                            }
                          ]
                        }
                      },
                      {
                        "type": "checkbox",
                        "key": "block",
                        "label": "Block Button",
                        "input": true,
                        "weight": 155,
                        "tooltip": "This control should span the full width of the bounding container."
                      },
                      {
                        "type": "textfield",
                        "key": "leftIcon",
                        "label": "Left Icon",
                        "input": true,
                        "placeholder": "Enter icon classes",
                        "tooltip": "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
                        "weight": 160
                      },
                      {
                        "type": "textfield",
                        "key": "rightIcon",
                        "label": "Right Icon",
                        "input": true,
                        "placeholder": "Enter icon classes",
                        "tooltip": "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
                        "weight": 170
                      },
                      {
                        "type": "select",
                        "input": true,
                        "weight": 180,
                        "label": "Shortcut",
                        "key": "shortcut",
                        "tooltip": "Shortcut for this component.",
                        "dataSrc": "custom",
                        "valueProperty": "value",
                        "template": "{{ item.label }}",
                        "data": {}
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
                        "type": "checkbox",
                        "key": "disableOnInvalid",
                        "label": "Disable on Form Invalid",
                        "tooltip": "This will disable this field if the form is invalid.",
                        "input": true,
                        "weight": 620
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
                        "weight": 1350,
                        "type": "checkbox",
                        "label": "Initial Focus",
                        "tooltip": "Make this field the initially focused element on this form.",
                        "key": "autofocus",
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
            title: 'Process Start',
            group: 'dvelop',
            icon: 'play',
            weight: 110,
            schema: ProcessStartComponent.schema()
        };
    }

    render() {
        return super.render(`
            <button class="btn btn-primary">Start process</button>
        `);
    }

    async onClick() {
        const id = this.component.processId;
        const businessKey = this.component.businessKey || "";
        console.log(this)
        await fetch(`/process/processes/test/instances`, {///${id}/instances`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "{}",
            body: JSON.stringify({
                businessKey: businessKey,
                variables: {}
            })
        }).then(async res => {
            if (res.ok) {
                console.log("startProcess event received", {
                    "processId": id,
                    "businessKey": businessKey
                })
            }
            else {
                const data = await res.text();

                console.error(data);
            }
        })
    }
}

// Register the component
Formio.Components.addComponent('procStartBtn', ProcessStartComponent);

// Define getValues function to get the list of processes
async function getValues() {
    const processes = await fetch('/process/api/processes/editable').then(async res => (await res.json()).processes);

    return processes.map(process => ({
        id: process.id,
        displayName: `${process.name} (${process.deployed ? "" : "not "}deployed)`
    }));
}

window.getValues = getValues;