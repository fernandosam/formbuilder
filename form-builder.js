var setup = function() {
    //Alpaca.logLevel = Alpaca.DEBUG;

    //var MODAL_VIEW = "bootstrap-edit-horizontal";
    var MODAL_VIEW = "bootstrap-edit";

    var MODAL_TEMPLATE = ' \
        <div class="modal fade"> \
            <div class="modal-dialog"> \
                <div class="modal-content"> \
                    <div class="modal-header"> \
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> \
                        <h4 class="modal-title"></h4> \
                    </div> \
                    <div class="modal-body"> \
                    </div> \
                    <div class="modal-footer"> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ';

    var schema = {
        "title": "Formulário",
        "type": "object"
    };
    var options = {
        "label": "Dados do Formulário"
    };
    var data = {};

    var view = {
        "parent": "bootstrap-create",
        "locale": "pt_BR"
    };

    var scripts = {};

    var removeEmpty = function(key, val) {
        if (!isEmpty(val)) {
            return val; // implicitly `toString` it			
        }
    };
	
	 var formatYAML = function(key) {
		return key;
    };
	
	var stringifyYAML = function (data) {
        var text = "";
		if (!isEmpty(data)) {
			text = JSON.stringify(data, removeEmpty, 2);
			text = JSON.parse(text);
			text = YAML.stringify(text, formatYAML, 2);
        }
		return text;
	};

    var setupEditor = function(id, data, yaml) {
        var text = "";
        if (yaml) {
			text= stringifyYAML(data);
        }

        var editor = ace.edit(id);
        editor.setTheme("ace/theme/textmate");
        if (yaml) {
            editor.getSession().setMode("ace/mode/yaml");
        } else {
            editor.getSession().setMode("ace/mode/javascript");
        }
        editor.renderer.setHScrollBarAlwaysVisible(false);
        editor.setShowPrintMargin(false);
        editor.setValue(text);

        setTimeout(function() {
            editor.clearSelection();
            editor.gotoLine(0, 0);
        }, 100);

        return editor;
    };

    var editor1 = setupEditor("schema", schema, true);
    var editor2 = setupEditor("options", options, true);
    var editor3 = setupEditor("data", data, true);
    var editor5 = setupEditor("scripts", scripts, false);
    var editor4 = setupEditor("codeDiv", false, false);

    var mainViewField = null;
    var mainPreviewField = null;
    var mainDesignerField = null;

    var doRefresh = function(el, buildInteractionLayers, disableErrorHandling, cb) {
        try {
            schema = YAML.parse(editor1.getValue());
        } catch (e) {}

        try {
            options = YAML.parse(editor2.getValue());
        } catch (e) {}

        try {
            data = YAML.parse(editor3.getValue());
        } catch (e) {}
		
		try {
            scripts = editor5.getValue();
        } catch (e) {}

        if (schema) {
            var config = {
                "schema": schema
            };
            if (options) {
                config.options = options;
            }
            if (data) {
                config.data = data;
            }
            if (!config.options) {
                config.options = {};
            }
            config.options.focus = false;
            config.postRender = function(form) {
                if (buildInteractionLayers) {
                    var iCount = 0;

                    // cover every control with an interaction layer
                    form.getFieldEl().find(".alpaca-container-item").each(function() {

                        var alpacaFieldId = $(this).children().first().attr("data-alpaca-field-id");

                        //iCount++;
                        $(this).attr("icount", iCount);

                        var width = $(this).outerWidth() - 22;
                        var height = $(this).outerHeight() + 25;

                        // cover div
                        var cover = $("<div></div>");
                        $(cover).addClass("cover");
                        $(cover).attr("alpaca-ref-id", alpacaFieldId);
                        $(cover).css({
                            "position": "absolute",
                            "margin-top": "-" + height + "px",
                            "margin-left": "-10px",
                            "width": width,
                            "height": height + 10,
                            "opacity": 0,
                            "background-color": "white",
                            "z-index": 900
                        });
                        $(cover).attr("icount-ref", iCount);
                        $(this).append(cover);

                        // interaction div
                        var interaction = $("<div class='interaction'></div>");
                        var buttonGroup = $("<div class='btn-group pull-right'></div>");
                        //var schemaButton = $("<button class='btn button-schema' alpaca-ref-id='" + alpacaFieldId + "'>Schema</button>");
                        var schemaButton = $('<button class="btn btn-default btn-xs button-schema" alpaca-ref-id="' + alpacaFieldId + '"><i class="glyphicon glyphicon-list"></i></button>');
                        buttonGroup.append(schemaButton);
                        //var optionsButton = $("<button class='btn button-options' alpaca-ref-id='" + alpacaFieldId + "'>Options</button>");
                        var optionsButton = $('<button class="btn btn-default btn-xs button-options" alpaca-ref-id="' + alpacaFieldId + '"><i class="glyphicon glyphicon-wrench"></i></button>');
                        buttonGroup.append(optionsButton);
                        //var removeButton = $("<button class='btn btn-danger button-remove' alpaca-ref-id='" + alpacaFieldId + "'>Delete</button>");
                        var removeButton = $('<button class="btn btn-danger btn-xs button-remove" alpaca-ref-id="' + alpacaFieldId + '"><i class="glyphicon glyphicon-remove"></i></button>');
                        buttonGroup.append(removeButton);
                        interaction.append(buttonGroup);
                        interaction.append("<div style='clear:both'></div>");
                        $(interaction).addClass("interaction");
                        $(interaction).attr("alpaca-ref-id", alpacaFieldId);
                        $(interaction).css({
                            "position": "absolute",
                            "margin-top": "-" + height + "px",
                            "margin-left": "-10px",
                            "width": width,
                            "height": height + 10,
                            "opacity": 1,
                            "z-index": 901
                        });
                        $(interaction).attr("icount-ref", iCount);
                        $(this).append(interaction);
                        $(buttonGroup).css({
                            "margin-top": 5 + (($(interaction).height() / 2) - ($(buttonGroup).height() / 2)),
                            "margin-right": "16px"
                        });
                        $(schemaButton).off().click(function(e) {

                            e.preventDefault();
                            e.stopPropagation();

                            var alpacaId = $(this).attr("alpaca-ref-id");

                            editSchema(alpacaId);
                        });
                        $(optionsButton).off().click(function(e) {

                            e.preventDefault();
                            e.stopPropagation();

                            var alpacaId = $(this).attr("alpaca-ref-id");

                            editOptions(alpacaId);
                        });
                        $(removeButton).off().click(function(e) {

                            e.preventDefault();
                            e.stopPropagation();

                            var alpacaId = $(this).attr("alpaca-ref-id");
                            removeField(alpacaId);
                        });

                        // when hover, highlight
                        $(interaction).hover(function(e) {
                            var iCount = $(interaction).attr("icount-ref");
                            $(".cover[icount-ref='" + iCount + "']").addClass("ui-hover-state");
                        }, function(e) {
                            var iCount = $(interaction).attr("icount-ref");
                            $(".cover[icount-ref='" + iCount + "']").removeClass("ui-hover-state");
                        });

                        iCount++;
                    });

                    // add dashed
                    form.getFieldEl().find(".alpaca-container").addClass("dashed");
                    form.getFieldEl().find(".alpaca-container-item").addClass("dashed");

                    // for every container, add a "first" drop zone element
                    // this covers empty containers as well as 0th index insertions
                    form.getFieldEl().find(".alpaca-container").each(function() {
                        var containerEl = this;

                        // first insertion point
                        $(this).prepend("<div class='dropzone'></div>");

                        // all others
                        $(containerEl).children(".alpaca-container-item").each(function() {
                            $(this).after("<div class='dropzone'></div>");
                        });

                    });

                    form.getFieldEl().find(".dropzone").droppable({
                        "tolerance": "touch",
                        "drop": function(event, ui) {

                            var draggable = $(ui.draggable);

                            if (draggable.hasClass("form-element")) {
                                var dataType = draggable.attr("data-type");
                                var fieldType = draggable.attr("data-field-type");

                                // based on where the drop occurred, figure out the previous and next Alpaca fields surrounding
                                // the drop target

                                // previous
                                var previousField = null;
                                var previousFieldKey = null;
                                var previousItemContainer = $(event.target).prev();
                                if (previousItemContainer) {
                                    var previousAlpacaId = $(previousItemContainer).children().first().attr("data-alpaca-field-id");
                                    previousField = Alpaca.fieldInstances[previousAlpacaId];

                                    previousFieldKey = $(previousItemContainer).attr("data-alpaca-container-item-name");
                                }

                                // next
                                var nextField = null;
                                var nextFieldKey = null;
                                var nextItemContainer = $(event.target).next();
                                if (nextItemContainer) {
                                    var nextAlpacaId = $(nextItemContainer).children().first().attr("data-alpaca-field-id");
                                    nextField = Alpaca.fieldInstances[nextAlpacaId];

                                    nextFieldKey = $(nextItemContainer).attr("data-alpaca-container-item-name");
                                }

                                // parent field
                                var parentFieldAlpacaId = $(event.target).parent().parent().attr("data-alpaca-field-id");
                                var parentField = Alpaca.fieldInstances[parentFieldAlpacaId];

                                // now do the insertion
                                insertField(schema, options, data, dataType, fieldType, parentField, previousField, previousFieldKey, nextField, nextFieldKey);
                            } else if (draggable.hasClass("interaction")) {
                                var draggedIndex = $(draggable).attr("icount-ref");

                                // next
                                var nextItemContainer = $(event.target).next();
                                var nextItemContainerIndex = $(nextItemContainer).attr("data-alpaca-container-item-index");
                                var nextItemAlpacaId = $(nextItemContainer).children().first().attr("data-alpaca-field-id");
                                var nextField = Alpaca.fieldInstances[nextItemAlpacaId];

                                form.moveItem(draggedIndex, nextItemContainerIndex, false, function() {

                                    var top = findTop(nextField);

                                    regenerate(top);
                                });
                            }

                        },
                        "over": function(event, ui) {
                            $(event.target).addClass("dropzone-hover");
                        },
                        "out": function(event, ui) {
                            $(event.target).removeClass("dropzone-hover");
                        }
                    });

                    // init any in-place draggables
                    form.getFieldEl().find(".interaction").draggable({
                        "appendTo": "body",
                        "helper": function() {
                            var iCount = $(this).attr("icount-ref");
                            var clone = $(".alpaca-container-item[icount='" + iCount + "']").clone();
                            return clone;
                        },
                        "cursorAt": {
                            "top": 100
                        },
                        "zIndex": 300,
                        "refreshPositions": true,
                        "start": function(event, ui) {
                            $(".dropzone").addClass("dropzone-highlight");
                        },
                        "stop": function(event, ui) {
                            $(".dropzone").removeClass("dropzone-highlight");
                        }
                    });
                }

                cb(null, form);
            };
            config.error = function(err) {
                Alpaca.defaultErrorCallback(err);

                cb(err);
            };

            if (disableErrorHandling) {
                Alpaca.defaultErrorCallback = function(error) {
                    console.log("Alpaca encountered an error while previewing form -> " + error.message);
                };
            } else {
                Alpaca.defaultErrorCallback = Alpaca.DEFAULT_ERROR_CALLBACK;
            }

            $(el).alpaca(config);
        }
    };

    var removeFunctionFields = function(schema, options) {
        if (schema) {
            if (schema.properties) {
                var badKeys = [];

                for (var k in schema.properties) {
                    if (schema.properties[k].type === "function") {
                        badKeys.push(k);
                    } else {
                        removeFunctionFields(schema.properties[k], (options && options.fields ? options.fields[k] : null));
                    }
                }

                for (var i = 0; i < badKeys.length; i++) {
                    delete schema.properties[badKeys[i]];

                    if (options && options.fields) {
                        delete options.fields[badKeys[i]];
                    }
                }
            }
        }
    };

    var editSchema = function(alpacaFieldId, callback) {
        var field = Alpaca.fieldInstances[alpacaFieldId];

        var fieldSchemaSchema = field.getSchemaOfSchema();
        var fieldSchemaOptions = field.getOptionsForSchema();
        removeFunctionFields(fieldSchemaSchema, fieldSchemaOptions);
        var fieldData = field.schema;

        delete fieldSchemaSchema.title;
        delete fieldSchemaSchema.description;
        if (fieldSchemaSchema.properties) {
            delete fieldSchemaSchema.properties.title;
            delete fieldSchemaSchema.properties.description;
            delete fieldSchemaSchema.properties.dependencies;
        }
        var fieldConfig = {
            schema: fieldSchemaSchema
        };
        if (fieldSchemaOptions) {
            fieldConfig.options = fieldSchemaOptions;
        }
        if (fieldData) {
            fieldConfig.data = fieldData;
        }
        fieldConfig.view = {
            "parent": MODAL_VIEW,
            "displayReadonly": false
        };
        fieldConfig.postRender = function(control) {
            var modal = $(MODAL_TEMPLATE.trim());
            modal.find(".modal-title").append(field.getTitle());
            modal.find(".modal-body").append(control.getFieldEl());

            modal.find('.modal-footer').append("<button class='btn btn-primary pull-right okay' data-dismiss='modal' aria-hidden='true'>Okay</button>");
            modal.find('.modal-footer').append("<button class='btn btn-default pull-left' data-dismiss='modal' aria-hidden='true'>Cancel</button>");

            $(modal).modal({
                "keyboard": true
            });

            $(modal).find(".okay").click(function() {

                field.schema = control.getValue();

                var top = findTop(field);
                regenerate(top);

                if (callback) {
                    callback();
                }
            });

            control.getFieldEl().find("p.help-block").css({
                "display": "none"
            });
        };

        var x = $("<div><div class='fieldForm'></div></div>");
        $(x).find(".fieldForm").alpaca(fieldConfig);
    };

    var editOptions = function(alpacaFieldId, callback) {
        var field = Alpaca.fieldInstances[alpacaFieldId];

        var fieldOptionsSchema = field.getSchemaOfOptions();
        var fieldOptionsOptions = field.getOptionsForOptions();
        removeFunctionFields(fieldOptionsSchema, fieldOptionsOptions);
        var fieldOptionsData = field.options;

        delete fieldOptionsSchema.title;
        delete fieldOptionsSchema.description;

        //console.log(fieldOptionsSchema.properties);
        if (fieldOptionsSchema.properties) {
            delete fieldOptionsSchema.properties.title;
            delete fieldOptionsSchema.properties.description;
            delete fieldOptionsSchema.properties.dependencies;
            //delete fieldOptionsSchema.properties.label;
            //delete fieldOptionsSchema.properties.name;
            delete fieldOptionsSchema.properties.readonly;
        }
        if (fieldOptionsOptions.fields) {
            delete fieldOptionsOptions.fields.title;
            delete fieldOptionsOptions.fields.description;
            delete fieldOptionsOptions.fields.dependencies;
            //delete fieldOptionsOptions.fields.label;
            //delete fieldOptionsOptions.fields.name;
            delete fieldOptionsOptions.fields.readonly;
        }

        var fieldConfig = {
            schema: fieldOptionsSchema
        };
        if (fieldOptionsOptions) {
            fieldConfig.options = fieldOptionsOptions;
        }
        if (fieldOptionsData) {
            fieldConfig.data = fieldOptionsData;
        }
        fieldConfig.view = {
            "parent": MODAL_VIEW,
            "displayReadonly": false
        };
        fieldConfig.postRender = function(control) {
            var modal = $(MODAL_TEMPLATE.trim());
            modal.find(".modal-title").append(field.getTitle());
            modal.find(".modal-body").append(control.getFieldEl());

            modal.find('.modal-footer').append("<button class='btn btn-primary pull-right okay' data-dismiss='modal' aria-hidden='true'>Okay</button>");
            modal.find('.modal-footer').append("<button class='btn btn-default pull-left' data-dismiss='modal' aria-hidden='true'>Cancel</button>");

            $(modal).modal({
                "keyboard": true
            });

            $(modal).find(".okay").click(function() {

                field.options = control.getValue();

                var top = findTop(field);
                regenerate(top);

                if (callback) {
                    callback();
                }
            });

            control.getFieldEl().find("p.help-block").css({
                "display": "none"
            });
        };

        var x = $("<div><div class='fieldForm'></div></div>");
        $(x).find(".fieldForm").alpaca(fieldConfig);
    };

    var refreshView = function(callback) {
        if (mainViewField) {
            mainViewField.getFieldEl().replaceWith("<div id='viewDiv'></div>");
            mainViewField.destroy();
            mainViewField = null;
        }

        doRefresh($("#viewDiv"), false, false, function(err, form) {

            if (!err) {
                mainViewField = form;
            }

            if (callback) {
                callback();
            }

        });
    };

    var refreshPreview = function(callback) {
        if (mainPreviewField) {
            mainPreviewField.getFieldEl().replaceWith("<div id='previewDiv'></div>");
            mainPreviewField.destroy();
            mainPreviewField = null;
        }

        doRefresh($("#previewDiv"), false, false, function(err, form) {

            if (!err) {
                mainPreviewField = form;
            }

            if (callback) {
                callback();
            }

        });
    };

    var refreshDesigner = function(callback) {
        $(".dropzone").remove();
        $(".interaction").remove();
        $(".cover").remove();

        if (mainDesignerField) {
            mainDesignerField.getFieldEl().replaceWith("<div id='designerDiv'></div>");
            mainDesignerField.destroy();
            mainDesignerField = null;
        }

        doRefresh($("#designerDiv"), true, false, function(err, form) {

            if (!err) {
                mainDesignerField = form;
            }

            if (callback) {
                callback();
            }

        });
    };

    var refreshCode = function(callback) {
        var json = {
            "schema": schema
        };
        if (options) {
            json.options = options;
        }
        if (data) {
            json.data = data;
        }
        if (view) {
            json.view = view;
        }
        var code = "$('#div').alpaca(" + JSON.stringify(json, removeEmpty, 2) + ");";

        editor4.setValue(code);
        editor4.clearSelection();
        editor4.gotoLine(0, 0);

        if (callback) {
            callback();
        }
    };

    var refresh = function(callback) {
        var current = $("UL.nav.nav-tabs LI.active A.tab-item");
        $(current).click();
    };

    var rtChange = false;
    editor1.on("blur", function() {
        rtChange = true;
    });
    editor2.on("blur", function() {
        rtChange = true;
    });
    editor3.on("blur", function() {
        rtChange = true;
    });
    editor5.on("blur", function() {
        rtChange = true;
    });

    // background "thread" to detect changes and update the preview div
    var rtProcessing = false;
    var rtFunction = function() {

        if (rtChange && !rtProcessing) {
            rtProcessing = true;
            if (mainPreviewField) {
                mainPreviewField.getFieldEl().replaceWith("<div id='previewDiv'></div>");
                mainPreviewField.destroy();
                mainPreviewField = null;
            }

            doRefresh($("#previewDiv"), false, true, function(err, form) {

                if (!err) {
                    mainPreviewField = form;
                }

                rtChange = false;
                rtProcessing = false;
            });
        }

        setTimeout(rtFunction, 50);

    };
    rtFunction();

    var isCoreField = function(type) {
        var cores = ["any", "array", "checkbox", "file", "hidden", "number", "object", "radio", "select", "text", "textarea"];

        var isCore = false;
        for (var i = 0; i < cores.length; i++) {
            if (cores[i] == type) {
                isCore = true;
            }
        }

        return isCore;
    };

    // types
    var types = [{
        "type": "string",
        "title": "String",
        "description": "A textual property"
    }, {
        "type": "number",
        "title": "Number",
        "description": "A numerical property"
    }, {
        "type": "boolean",
        "title": "Boolean",
        "description": "A true/false property"
    }, {
        "type": "object",
        "title": "Object",
        "description": "A collection of keyed sub-properties"
    }, {
        "type": "array",
        "title": "Array",
        "description": "An array of sub-properties"
    }];
    for (var i = 0; i < types.length; i++) {
        var title = types[i].title;
        var type = types[i].type;
        var description = types[i].description;

        var div = $("<div class='form-element draggable ui-widget-content' data-type='" + type + "'></div>");
        $(div).append("<div><span class='form-element-title'>" + title + "</span> (<span class='form-element-type'>" + type + "</span>)</div>");
        $(div).append("<div class='form-element-field-description'>" + description + "</div>");

        $("#types").append(div);
    }

    var afterAlpacaInit = function() {
        // show all fields
        for (var type in Alpaca.fieldClassRegistry) {
            var instance = new Alpaca.fieldClassRegistry[type]();

            var schemaSchema = instance.getSchemaOfSchema();
            var schemaOptions = instance.getOptionsForSchema();
            var optionsSchema = instance.getSchemaOfOptions();
            var optionsOptions = instance.getOptionsForOptions();
            var title = instance.getTitle();
            var description = instance.getDescription();
            var type = instance.getType();
            var fieldType = instance.getFieldType();

            var div = $("<div class='form-element draggable ui-widget-content' data-type='" + type + "' data-field-type='" + fieldType + "'></div>");
            $(div).append("<div><span class='form-element-title'>" + title + "</span> (<span class='form-element-type'>" + fieldType + "</span>)</div>");
            $(div).append("<div class='form-element-field-description'>" + description + "</div>");

            var isCore = isCoreField(fieldType);
            if (isCore) {
                $("#basic").append(div);
            } else {
                $("#advanced").append(div);
            }

            // init all of the draggable form elements
            $(".form-element").draggable({
                "appendTo": "body",
                "helper": "clone",
                "zIndex": 300,
                "refreshPositions": true,
                "start": function(event, ui) {
                    $(".dropzone").addClass("dropzone-highlight");
                },
                "stop": function(event, ui) {
                    $(".dropzone").removeClass("dropzone-highlight");
                }
            });
        }
    };

    // lil hack to force compile
    $("<div></div>").alpaca({
        "data": "test",
        "postRender": function(control) {
            afterAlpacaInit();
        }
    });


    $(".tab-item-source").click(function() {

        // we have to monkey around a bit with ACE Editor to get it to refresh
        editor1.setValue(editor1.getValue());
        editor1.clearSelection();
        editor2.setValue(editor2.getValue());
        editor2.clearSelection();
        editor3.setValue(editor3.getValue());
        editor3.clearSelection();
        editor5.setValue(editor5.getValue());
        editor5.clearSelection();

        setTimeout(function() {
            refreshPreview();
        }, 50);
    });
    $(".tab-item-view").click(function() {
        setTimeout(function() {
            refreshView();
        }, 50);
    });
    $(".tab-item-designer").click(function() {
        setTimeout(function() {
            refreshDesigner();
        }, 50);
    });
    $(".tab-item-code").click(function() {
        setTimeout(function() {
            refreshCode();
        }, 50);
    });

    $(".tab-source-schema").click(function() {
        // we have to monkey around a bit with ACE Editor to get it to refresh
        editor1.setValue(editor1.getValue());
        editor1.clearSelection();
    });

    $(".tab-source-options").click(function() {
        // we have to monkey around a bit with ACE Editor to get it to refresh
        editor2.setValue(editor2.getValue());
        editor2.clearSelection();
    });

    $(".tab-source-data").click(function() {
        // we have to monkey around a bit with ACE Editor to get it to refresh
        editor3.setValue(editor3.getValue());
        editor3.clearSelection();
    });

    $(".tab-source-scripts").click(function() {
        // we have to monkey around a bit with ACE Editor to get it to refresh
        editor5.setValue(editor5.getValue());
        editor5.clearSelection();
    });

    // STM 04/04/2016
    // Função alterada para possibilitar a inclusão do nome do campo
    var insertField = function(schema, options, data, dataType, fieldType, parentField, previousField, previousFieldKey, nextField, nextFieldKey) {
        var nameProp = "";

        while (nameProp === "") {
            nameProp = prompt("Informe o rótulo do componente:", nameProp);

            if (!nameProp) {
                refreshDesigner();
                return;
            }
        }

        var itemSchema = {
            "type": dataType
        };
        var itemOptions = {};
        if (fieldType) {
            itemOptions.type = fieldType;
        }
        //itemOptions.label = "New ";
        if (fieldType) {
            itemOptions.label = capitalizeFirstLetter(nameProp);
        } else if (dataType) {
            itemOptions.label = capitalizeFirstLetter(nameProp);
        }
        var itemData = null;

        var itemKey = null;
        if (parentField.getType() === "array") {
            itemKey = 0;
            if (previousFieldKey) {
                itemKey = previousFieldKey + 1;
            }
        } else if (parentField.getType() === "object") {
            // Alterado para possibilitar a inclusão do nome do campo
            if (nameProp != "") {
                itemKey = foldToASCII(nameProp).toLocaleLowerCase().replace(/[ `~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
                itemOptions.name = itemKey;
            } else {
                itemKey = "new" + new Date().getTime();
            }
        }

        var insertAfterId = null;
        if (previousField) {
            insertAfterId = previousField.id;
        }

        parentField.addItem(itemKey, itemSchema, itemOptions, itemData, insertAfterId, function() {

            var top = findTop(parentField);

            regenerate(top);
        });

    };

    var assembleSchema = function(field, schema) {
        // copy any properties from this field's schema into our schema object
        for (var k in field.schema) {
            if (field.schema.hasOwnProperty(k) && typeof(field.schema[k]) !== "function") {
                schema[k] = field.schema[k];
            }
        }
        // a few that we handle by hand
        schema.type = field.getType();
        // reset properties, we handle that one at a time
        delete schema.properties;
        schema.properties = {};
        if (field.children) {
            for (var i = 0; i < field.children.length; i++) {
                var childField = field.children[i];
                var propertyId = childField.propertyId;

                schema.properties[propertyId] = {};
                assembleSchema(childField, schema.properties[propertyId]);
            }
        }
    };

    var assembleOptions = function(field, options) {
        // copy any properties from this field's options into our options object
        for (var k in field.options) {
            if (field.options.hasOwnProperty(k) && typeof(field.options[k]) !== "function") {
                options[k] = field.options[k];
            }
        }
        // a few that we handle by hand
        options.type = field.getFieldType();
        // reset fields, we handle that one at a time
        delete options.fields;
        options.fields = {};
        if (field.children) {
            for (var i = 0; i < field.children.length; i++) {
                var childField = field.children[i];
                var propertyId = childField.propertyId;

                options.fields[propertyId] = {};
                assembleOptions(childField, options.fields[propertyId]);
            }
        }
    };

    var findTop = function(field) {
        // now get the top control
        var top = field;
        while (top.parent) {
            top = top.parent;
        }

        return top;
    };

    var regenerate = function(top) {
        // walk the control tree and re-assemble the schema, options + data
        var _schema = {};
        assembleSchema(top, _schema);
        var _options = {};
        assembleOptions(top, _options);
        // data is easy
        var _data = top.getValue();
        if (!_data) {
            _data = {};
        }

		var newSchema = stringifyYAML(_schema);
		var newOptions = stringifyYAML(_options);
		var newData = stringifyYAML(_data);
		
        editor1.setValue(newSchema);
        editor2.setValue(newOptions);
        editor3.setValue(newData);
        editor5.setValue(scripts);

        setTimeout(function() {
            refresh();
        }, 100);
    };

    var removeField = function(alpacaId) {
        var field = Alpaca.fieldInstances[alpacaId];

        var parentField = field.parent;
        parentField.removeItem(field.propertyId, function() {
            var top = findTop(field);
            regenerate(top);
        });
    };

    $(".tab-item-source").click();


    // STM 04/04/2016
    // Função alterada para possibilitar a carga de protótipo em arquivo .zip
    $(".load-button").off().change(function() {

        if (!localStorage) {
            alert("Your browser must support HTML5 local storage in order to use this feature");
            return;
        }

        var inputFile = document.getElementById("inputFile");
        var zipFileToLoad = inputFile.files[0];

        var fileReader = new FileReader();
        var configString = {};

        fileReader.onload = function(fileLoadedEvent) {
            var zipFileLoaded = new JSZip(fileLoadedEvent.target.result, {
                "blob": true
            });

            var ulFilesContained = document.getElementById("ulFilesContained");
            ulFilesContained.innerHTML = "";

            var success = 0;
            for (var nameOfFileContainedInZipFile in zipFileLoaded.files) {
                var fileContainedInZipFile = zipFileLoaded.files[nameOfFileContainedInZipFile];

                var linkFileContained = document.createElement("span");
                linkFileContained.innerHTML = nameOfFileContainedInZipFile;
                //linkFileContained.href = "#";

                if (nameOfFileContainedInZipFile.indexOf("schema.json") > -1) {
                    configString.schema = fileContainedInZipFile.asText();
                    success++;
                }
                if (nameOfFileContainedInZipFile.indexOf("options.json") > -1) {
                    configString.options = fileContainedInZipFile.asText();
                    success++;
                }
                if (nameOfFileContainedInZipFile.indexOf("data.json") > -1) {
                    configString.data = fileContainedInZipFile.asText();
                    success++;
                }
                if (nameOfFileContainedInZipFile.indexOf("custom.js") > -1) {
                    configString.scripts = fileContainedInZipFile.asText();
                    success++;
                }

                linkFileContained.file = fileContainedInZipFile;
                //linkFileContained.onclick = displayFileAsText;
                var liFileContained = document.createElement("li");
                liFileContained.appendChild(linkFileContained);
                ulFilesContained.appendChild(liFileContained);
            }

            if (!configString) {
                return;
            }

            try {
                //var config = YAML.parse(configString);
                var config = configString;
               
                if (configString.schema) configString.schema = stringifyYAML(JSON.parse(configString.schema));
                if (configString.options) configString.options = stringifyYAML(JSON.parse(configString.options));
				if (configString.data) configString.data = stringifyYAML(JSON.parse(configString.data));

                editor1.setValue(configString.schema);
                editor2.setValue(configString.options);
                editor3.setValue(configString.data);
                editor5.setValue(configString.scripts);

                //alert("Your form was loaded from HTML5 local storage");
                if (success == 4) {
                    alert("Protótipo Carregado com Sucesso");
                } else {
                    alert("Erro ao Carregar Protótipo");
                }

                rtChange = true;

                setTimeout(function() {
                    refresh();
                }, 100);
            } catch (e) {
                alert(e);
                // bad value
            }
        };

        fileReader.readAsArrayBuffer(zipFileToLoad);
    });

    // STM 04/04/2016
    // Função alterada para possibilitar a persistência de protótipo em arquivo .zip
    $(".save-button").off().click(function() {

        if (!localStorage) {
            alert("Your browser must support HTML5 local storage in order to use this feature");
            return;
        }

        var config = {};
        if (schema) {
            config.schema = schema;
        }
        if (options) {
            config.options = options;
        }
        if (data) {
            config.data = data;
        }

        var zip = new JSZip();

        var dataVar = JSON.stringify(config.data, removeEmpty, 2);
        var schemaVar = JSON.stringify(config.schema, removeEmpty, 2);
        var optionsVar = JSON.stringify(config.options, removeEmpty, 2);
		var scriptsVar = scripts;

        //var camundaChecked = $(".camunda").is(':checked');
        // Templates

		var formidVar = foldToASCII(config.schema.title).toLocaleLowerCase().replace(/[ `~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
		
		var context = {
            formid: formidVar,
        };
        var template = Handlebars.templates["index.hbs"];
        var BUILDER_INDEX = template(context);

        var template = Handlebars.templates['config.hbs'];
        var context = {
			formid: formidVar,
            data: dataVar,
            schema: schemaVar,
            options: optionsVar,
            scripts: scriptsVar
        };
        var BUILDER_CONF1 = template(context);

        var context = {
            camunda: "true",
			formid: formidVar,
            data: dataVar,
            schema: schemaVar,
            options: optionsVar,
            scripts: scriptsVar
        };
        var BUILDER_CONF2 = template(context);
        var partial = Handlebars.registerPartial('config', BUILDER_CONF2);

        var template = Handlebars.templates["camunda.hbs"];
        var BUILDER_CAMUNDA = template(context, partial);

        var template = Handlebars.templates['locate.hbs'];
        var BUILDER_LOCATE = template();

        var template = Handlebars.templates['alpaca-camunda.hbs'];
        var BUILDER_INTEGR = template();

        // Pasta Raiz
        zip.file("camunda.html", BUILDER_CAMUNDA);
        zip.file("index.html", BUILDER_INDEX);

        // Pasta json
        var jsonDir = zip.folder("json");
        jsonDir.file("schema.json", schemaVar);
        jsonDir.file("options.json", optionsVar);
        jsonDir.file("data.json", dataVar);

        // Pasta scripts
        var scriptsDir = zip.folder("scripts");
        scriptsDir.file("alpaca-camunda.js", BUILDER_INTEGR);
        scriptsDir.file("config.js", BUILDER_CONF1);
        scriptsDir.file("locate.js", BUILDER_LOCATE);
		scriptsDir.file("custom.js", scriptsVar);

        var content = zip.generate({
            type: "blob"
        });

        var nameFile;
        if (document.getElementById("inputFile").files[0]) {
            nameFile = document.getElementById("inputFile").files[0].name;
        } else {
            nameFile = "prototipo.zip";
        }

        // see FileSaver.js
        saveAs(content, nameFile);

        //var configString = YAML.stringify(config);		
        //localStorage.setItem("alpacaDesignerConfig", configString);
        //alert("Your form was saved in HTML5 local storage");
    });

    // STM 07/04/2016
    $(".camunda").off().click(function() {

        var camundaChecked = $(".camunda").is(':checked');

        if (options) {
            for (key in options.fields) {
                if (camundaChecked) {
                    options.fields[key].attributes = attributeName(key, schema.properties[key].type);
                } else {
                    options.fields[key].attributes = {};
                }
            }
        }

        editor2.setValue(YAML.stringify(options, formatYAML, 2));
        editor2.clearSelection();

        rtChange = true;
    });

    var attributeName = function(attrName, attrType) {
        if (typeof attrType == 'undefined' || attrType == "array") attrType = "string";
        var newAttribute = {
            "cam-variable-name": attrName,
            "cam-variable-type": capitalizeFirstLetter(attrType)
        };

        return newAttribute;
    }
	
};

$(document).ready(function() {

    // wait a bit to allow ACE to load
    setTimeout(function() {
        setup();
    }, 200);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    if (typeof obj === 'object' && obj instanceof Array && !obj.length) {
        return true;
    }

	return true && JSON.stringify(obj) === JSON.stringify({});
}