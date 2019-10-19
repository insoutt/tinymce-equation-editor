var MQ = MathQuill.getInterface(2);
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
        collapse(event) {
            event.target.classList.toggle("active");
            var content = event.target.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        },
        getParams(evt) {
            let data = evt.data;
            console.log("received", data);
            this.defaultGroup = data.mathquill_editor_group;
            this.buttonBar = data.mathquill_editor_button_bar;
            this.buttonGroups = data.mathquill_editor_button_groups;
            this.currentGroup = this.buttonGroups[this.defaultGroup];
            this.latex = data.latex;
            this.initMathquill();
        },

        initMathquill() {
            var mathFieldSpan = document.getElementById("math-field");
            this.mathField = MQ.MathField(mathFieldSpan, {
                spaceBehavesLikeTab: true, // configurable
                handlers: {
                    edit: () => {
                        this.latex = this.mathField.latex();
                        this.sendLatex();
                    }
                }
            });

            if (this.latex) {
                this.mathField.latex(this.latex);
            }
        },
        insert(button) {
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
                    html: this.mathField.html(),
                    latex: this.latex
                },
                "*"
            );
        }
    },

    updated() {
        let btns = document.getElementsByClassName("btn");
        for (let i = 0; i < btns.length; i++) {
            MQ.MathField(btns[i]);
        }
    }
});
