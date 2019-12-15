!function(){"use strict";var l=(t.prototype.transform=function(){if("string"==typeof this.buttons)return this.parseString();if(this.buttons instanceof Array)return this.parseArray();throw new Error("Buttons must be a string or array")},t.prototype.parseArray=function(){if(0===this.buttons.length)throw new Error("You must define at least one button");return this.buttons.map(function(t){var e={text:"",latex:"",cmd:!1};if("object"!=typeof t)throw new Error("Button must be an object");if(void 0===t.text)throw new Error("You must define text property of button");if("string"!=typeof t.text)throw new Error("text property of button must be a string");if(e.text=t.text,void 0===t.latex)e.latex=t.text;else{if("string"!=typeof t.latex)throw new Error("latex property of button must be a string");e.latex=t.latex}if(void 0===t.cmd)e.cmd=!1;else{if("boolean"!=typeof t.cmd)throw new Error("cmd property must be boolean");e.cmd=t.cmd}return e})},t.prototype.parseString=function(){if(0===this.buttons.length)throw new Error("You must define at least 1 button");return this.buttons.split(this.SEPARATOR).map(function(t){return{text:t,latex:t,cmd:!1}})},t);function t(t){this.SEPARATOR=" ",this.buttons=t}function e(o,t){var n=o.settings.mathquill_editor_config;if(void 0===n)n={};else if("object"!=typeof n)throw new Error("'mathquill_editor_config' property must be an object");if(void 0===n.url)n.url="editor/equation_editor.html";else if(void 0===n.url)throw new Error("'url' property must be a string in mathquill_editor_config");if(void 0===n.origin)n.origin=document.location.origin;else if(void 0===n.origin)throw new Error("'origin' property must be a string in mathquill_editor_config");if(void 0===n.title)n.title="Equation Editor";else if(void 0===n.title)throw new Error("'title' property must be a string in mathquill_editor_config");if(void 0===n.space_after_content)n.space_after_content="&nbsp;";else if(void 0===n.space_after_content)throw new Error("'space_after_content' property must be a string in mathquill_editor_config");if(void 0===n.btn_cancel_text)n.btn_cancel_text="Cancel";else if(void 0===n.btn_cancel_text)throw new Error("'btn_cancel_text' property must be a string in mathquill_editor_config");if(void 0===n.btn_ok_text)n.btn_ok_text="Insert";else if(void 0===n.btn_ok_text)throw new Error("'btn_ok_text' property must be a string in mathquill_editor_config");var i=o.settings.mathquill_editor_button_groups,a=o.settings.mathquill_editor_button_bar,c=o.settings.mathquill_editor_group,m="";if(void 0===c)c="basic";else if("string"!=typeof c)throw new Error("'mathquill_editor_group' property must be a string");void 0===i&&(i={basic:[{name:"Numbers",buttons:[{cmd:!1,text:"0"},{cmd:!1,text:"1"},{cmd:!1,text:"2"},{cmd:!1,text:"3"},{cmd:!1,text:"4"},{cmd:!1,text:"5"},{cmd:!1,text:"6"},{cmd:!1,text:"7"},{cmd:!1,text:"8"},{cmd:!1,text:"9"},{cmd:!1,text:","},{cmd:!1,text:"."},{cmd:!1,text:"\\pi"},{cmd:!1,text:"i"},{cmd:!1,text:"e"},{cmd:!1,text:"\\infty"}]},{name:"Arithmetic and Units",buttons:[{cmd:!1,text:"+"},{cmd:!1,text:"-"},{cmd:!1,text:"\\times"},{cmd:!1,text:"\\div"},{cmd:!1,text:"\\pm"},{cmd:!0,latex:"\\overline",text:"\\overline{x}"},{cmd:!1,text:"\\cdot"},{cmd:!0,latex:"/",text:"/"},{cmd:!1,text:"$"},{cmd:!1,text:"\\degree"},{cmd:!1,text:"%"}]}],intermediate:[{name:"Exponents, Roots, Logs",buttons:[{cmd:!0,latex:"^",text:"y^x"},{cmd:!0,latex:"\\sqrt",text:"\\sqrt{x}"},{cmd:!0,latex:"\\sqrt[\\placeholder{3}]{\\placeholder{}}",text:"\\sqrt[\\placeholder{3}]{\\placeholder{x}}"},{cmd:!0,latex:"\\sqrt[\\placeholder{}]{\\placeholder{}}",text:"\\sqrt[\\placeholder{n}]{\\placeholder{x}}"},{cmd:!1,text:"e^x"},{cmd:!1,text:"\\ln"},{cmd:!1,text:"\\log"},{cmd:!1,text:"\\log_b"}]},{name:"Relations",buttons:[{cmd:!1,text:"="},{cmd:!1,text:"\\neq"},{cmd:!1,text:"\\sim"},{cmd:!1,text:"\\not\\sim"},{cmd:!1,text:"\\lt"},{cmd:!1,text:"\\gt"},{cmd:!1,text:"\\approx"},{cmd:!1,text:"\\not\\approx"},{cmd:!1,text:"\\le"},{cmd:!1,text:"\\ge"},{cmd:!1,text:"\\simeq"},{cmd:!1,text:"\\not\\simeq"},{cmd:!1,text:"\\therefore"}]},{name:"Geometry",buttons:[{cmd:!1,text:"\\rightarrow"},{cmd:!1,text:"\\leftrightarrow"},{cmd:!0,latex:"\\overline",text:"\\overline{AB}"},{cmd:!0,latex:"\\overarc",text:"\\overarc{AB}"},{cmd:!1,text:"\\parallel"},{cmd:!1,text:"\\perp"},{cmd:!1,text:"\\angle"},{cmd:!1,text:"m\\angle"},{cmd:!1,text:"\\bigtriangleup"},{cmd:!1,text:"▱"},{cmd:!1,text:"\\bigodot"}]},{name:"Groups",buttons:[{cmd:!0,latex:"(",text:"(\\cdot)"},{cmd:!0,latex:"[",text:"[\\cdot]"},{cmd:!0,latex:"|",text:"|\\cdot|"},{cmd:!1,text:"(x,y)"},{cmd:!1,text:"[x,y]"},{cmd:!1,text:"(x,y]"},{cmd:!1,text:"[x,y)"}]}],advanced:[{name:"Trigonometry",buttons:[{cmd:!1,text:"\\sin"},{cmd:!1,text:"\\sec"},{cmd:!1,text:"\\sin^{-1}"},{cmd:!1,text:"\\sec^{-1}"},{cmd:!1,text:"\\cos"},{cmd:!1,text:"\\csc"},{cmd:!1,text:"\\cos^{-1}"},{cmd:!1,text:"\\csc^{-1}"},{cmd:!1,text:"\\tan"},{cmd:!1,text:"\\cot"},{cmd:!1,text:"\\tan^{-1}"},{cmd:!1,text:"\\cot^{-1}"}]},{name:"Statistics",buttons:[{cmd:!1,text:"\\mu"},{cmd:!1,text:"\\sigma"},{cmd:!1,text:"\\overline{x}"},{cmd:!1,text:"\\overline{y}"},{cmd:!1,text:"x^i"},{cmd:!1,text:"x_i"},{cmd:!1,text:"x!"},{cmd:!1,text:"\\Sigma"}]},{name:"Greek",buttons:[{cmd:!1,text:"\\alpha"},{cmd:!1,text:"\\beta"},{cmd:!1,text:"\\gamma"},{cmd:!1,text:"\\delta"},{cmd:!1,text:"\\theta"},{cmd:!1,text:"\\pi"}]},{name:"Calculus",buttons:[{cmd:!1,text:"\\int"},{cmd:!1,text:"\\int_{a}^{b}"},{cmd:!1,text:"dx"},{cmd:!1,text:"\\frac{d}{dx}"},{cmd:!1,latex:"\\lim_{x \\to \\infty}",text:"\\lim"},{cmd:!1,latex:"\\sum_{i=1}^{n}",text:"\\sum"},{cmd:!1,text:"\\infty"}]},{name:"Matrix",buttons:[{cmd:!0,latex:"\\begin{bmatrix} \\placeholder{} & \\placeholder{} \\\\ \\placeholder{} & \\placeholder{} \\end{bmatrix}",text:"\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}"},{cmd:!0,latex:"\\begin{bmatrix} \\placeholder{} & \\placeholder{} & c \\\\ \\placeholder{} & \\placeholder{} & f \\\\ \\placeholder{} & \\placeholder{} & \\placeholder{} \\end{bmatrix}",text:"\\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}"}]},{name:"Equation System",buttons:[{cmd:!0,text:"\\begin{cases} x + y \\\\ x – y \\end{cases}"},{cmd:!0,text:"\\begin{cases} x + y + z \\\\ x – y + z \\\\ x + y + z \\end{cases}"}]}]}),void 0===a&&(a=[{text:"+"},{text:"-"},{text:"\\times"},{text:"\\div"},{text:"y^x",latex:"^",cmd:!0},{text:"\\sqrt{x}",latex:"\\sqrt",cmd:!0},{latex:"\\sqrt[\\placeholder{}]{\\placeholder{}}",text:"\\sqrt[\\placeholder{n}]{\\placeholder{x}}",cmd:!0},{latex:"\\log_b",text:"\\log_b",cmd:!1},{text:"e^x"}]),o.on("init",function(){r(o)}),o.addCommand("mathquill-window",function(r){void 0===r&&(r={}),o.windowManager.openUrl({url:n.url,title:n.title,width:820,height:400,buttons:[{type:"cancel",text:n.btn_cancel_text},{type:"custom",text:n.btn_ok_text,primary:!0}],onAction:function(){o.execCommand("mathquill-insert",{html:m,latex:r.latex,currentTarget:r.currentTarget}),o.windowManager.close()},onMessage:function(t,e){switch(e.mceAction){case"mathquill-update":m=e.html,r.latex=e.latex;break;case"mathquill-mounted":!function(t,e,r,o,n){var i=document.querySelector("iframe[src='"+t.url+"']"),a=new l(e).transform();for(var c in r)if(r.hasOwnProperty(c)){var m=r[c];if(!(m instanceof Array))throw new Error("Groups must be an array ");var d=m.map(function(t){if(void 0===t.name)throw new Error("You must define group name property");if("string"!=typeof t.name)throw new Error("Group name must be a string");if(void 0===t.buttons)throw new Error("You must define buttons property");var e=new l(t.buttons).transform();return{name:t.name,buttons:e}});r[c]=d}i.contentWindow.postMessage({mathquill_editor_group:o,mathquill_editor_button_bar:a,mathquill_editor_button_groups:r,latex:n},t.origin)}(n,a,i,c,r.latex)}}})}),o.addCommand("mathquill-insert",function(t){if(t){var e="\n            <span class='mq-math-mode' data-latex='"+t.latex+"'>\n                "+t.html+"\n            </span>"+n.space_after_content;""===o.getContent()&&(e="<p>"+e+"</p>"),t.currentTarget&&o.selection.select(t.currentTarget),o.selection.setContent(e),r(o)}}),o.ui.registry.addButton("mathquill-editor",{title:"Editor de ecuaciones",text:"f(x)",onAction:function(){o.execCommand("mathquill-window")}})}function r(e){for(var t=0,r=e.getDoc().getElementsByClassName("mq-math-mode");t<r.length;t++){var o=r[t];o.contentEditable="false",o.onclick||(o.onclick=function(t){t.stopPropagation(),e.execCommand("mathquill-window",{latex:t.currentTarget.dataset.latex,currentTarget:t.currentTarget})})}}tinymce.PluginManager.add("mathquill-editor",e)}();