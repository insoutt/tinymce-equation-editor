var app = new Vue({
    el: "#app",
    data: {
        defaultGroup: "",
        buttonBar: [],
        buttonGroups: {},
        currentGroup: [],
        mathField: "",
        latex: ""
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
            this.initMathquill();
        },

        initMathquill() {
            var mathFieldSpan = document.getElementById("math-field");
            var latexSpan = document.getElementById("latex");

            window.MQ = MathQuill.getInterface(2); // for backcompat
            this.mathField = MQ.MathField(mathFieldSpan, {
                spaceBehavesLikeTab: true, // configurable
                handlers: {
                    edit: () => {
                        latexSpan.textContent = this.mathField.latex(); // simple API
                        this.latex = this.mathField.latex();
                        this.sendLatex();
                    }
                }
            });
        },
        insert(button) {
            console.log("button", button);
            if (button.cmd) {
                this.mathField.cmd(button.latex);
            } else {
                this.mathField.write(button.latex);
            }
            this.mathField.focus();
        },

        sendLatex() {
            window.parent.postMessage(
                {
                    mceAction: "mathquill-update",
                    latex: this.latex
                },
                "*"
            );
        }
    }
});
