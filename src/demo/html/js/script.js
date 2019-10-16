var app = new Vue({
    el: "#app",
    data: {
        message: "Hello Vue!",
        defaultGroup: "",
        buttonBar: [],
        buttonGroups: {},
        currentGroup: []
    },
    created() {
        if (window.addEventListener) {
            // For standards-compliant web browsers
            window.addEventListener("message", this.getParams, false);
        } else {
            window.attachEvent("onmessage", this.getParams);
        }
    },
    methods: {
        getParams(evt) {
            let data = evt.data;
            console.log("received", data);
            this.defaultGroup = data.mathquill_editor_group;
            this.buttonBar = data.mathquill_editor_button_bar;
            this.buttonGroups = data.mathquill_editor_button_groups;
            this.currentGroup = this.buttonGroups[this.defaultGroup];
        }
    }
});

var mathFieldSpan = document.getElementById("math-field");
var latexSpan = document.getElementById("latex");

var MQ = MathQuill.getInterface(2); // for backcompat
var mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true, // configurable
    handlers: {
        edit: function() {
            // useful event handlers
            latexSpan.textContent = mathField.latex(); // simple API
        }
    }
});
