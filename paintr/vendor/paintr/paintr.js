(function(){

    var DEFAULTS = {
        width: 400,
        height: 200,
        strokeColor: '#42d9f7',
        strokeWidth: 5,
        bgColor: '#ffffff'
    };


    /**
     * @param params
     *    - element (Node): containing DOM element
     *    - width: (Number) width
     *    - height: (Number) height
     *    - callbacks: (Object)
     *          - onExport: - returns a data URI
     */
    function Paintr(params) {
        this._element = params.element || null;
        this.width = params.width || DEFAULTS.width;
        this.height = params.height || DEFAULTS.height;
        this.callbacks = params.callbacks || {};
        this.callbacks.onExport = this.callbacks.onExport || (function(){});
        this.callbacks.onChange = this.callbacks.onChange || (function(){});

        this._init();
    }

    Paintr.prototype = {
        _init: function() {
            this._initElement();
            this._initSurface();
            //this._initTools();
        },

        _initElement: function() {
            this._element.classList.add('paintr');
        },

        _initSurface: function() {
            var element = document.createElement('div'),
                self = this;
            this.surface = new Paintr.Surface({
                width: this.width,
                height: this.height,
                element: element,
                strokeColor: DEFAULTS.strokeColor,
                strokeWidth: DEFAULTS.strokeWidth,
                onchange: function(e) {
                    self._handleSurfaceChange(e);
                }
            });
            this._element.appendChild(element);
        },

        _handleSurfaceChange: function(e) {
            this.callbacks.onChange(e);
            /*
            if (this.surface.canUndo()) {
                this.tools.enableUndo();
            } else {
                this.tools.disableUndo();
            }

            if (this.surface.canRedo()) {
                this.tools.enableRedo();
            } else {
                this.tools.disableRedo();
            }*/
        },

        _handleToolsChange: function(key, value) {
            if (key === 'backgroundColor') {
                this.surface.updateBackgroundColor(value);
            } else {
                this.surface.set(key, value);
            }
        },

        _handleUndo: function() {
            this.surface.undo();
        },

        _handleRedo: function() {
            this.surface.redo();
        },

        _handleExport: function() {
            this.callbacks.onExport(this.exportDataURI());
        },

        _initTools: function() {
            var element = document.createElement('div'),
                self = this;
            this.tools = new Paintr.Tools({
                element: element,
                surfaceHeight: this.height,
                strokeColor: DEFAULTS.strokeColor,
                strokeWidth: DEFAULTS.strokeWidth,
                bgColor: DEFAULTS.bgColor,
                onchange: function(key, value) {
                    self._handleToolsChange(key, value);
                },
                onundo: function() {
                    self._handleUndo();
                },
                onredo: function() {
                    self._handleRedo();
                },
                onexport: function() {
                    self._handleExport();
                }
            });
            this._element.appendChild(element);
            this.tools.disableUndo();
            this.tools.disableRedo();
        },

        exportDataURI: function() {
            return this.surface.exportDataURI();
        },

        updateBackgroundColor: function(color) {
            this.surface.updateBackgroundColor(color);
        },
        updateStrokeColor: function(color) {
            this.surface.set('strokeColor', color);
        },
        updateStrokeWidth: function(width) {
            this.surface.set('strokeWidth', width);
        },
        canUndo: function() {
            return this.surface.canUndo();
        },
        canRedo: function() {
            return this.surface.canRedo();
        },
        undo: function() {
            this.surface.undo();
        },
        redo: function() {
            this.surface.redo();
        }
    };

    if (!window.Paintr) {
        window.Paintr = Paintr;
    }
})();

(function(){

    var utils = {

        canvasIEFallback: function(canvas) {
            if(typeof window.G_vmlCanvasManager != 'undefined') {
                canvas = window.G_vmlCanvasManager.initElement(canvas);
            }
            return canvas;
        },

        isTouchDevice: function() {
            var el = document.createElement('div');
            el.setAttribute('ontouchstart', 'return;');
            return typeof el.ontouchstart === "function";
        }
    };

    if (!window.Paintr.utils) {
        window.Paintr.utils = utils;
    }

})();

(function() {

    function Recordr() {}

    Recordr.prototype = {
        _clicks: [],
        _undos: [],
        _bgs: [],

        canUndo: function() {
            return this._clicks.length > 0;
        },

        canRedo: function() {
            return this._undos.length > 0;
        },

        undo: function() {
            var end = (this._clicks.length - 1),
                start = end,
                stroke, i;

            for (i = end; i >= 0; i--) {
                if (this._clicks[i] && !this._clicks[i].dragging) {
                    start = i;
                    break;
                }
            }

            stroke = this._clicks.splice(start, (end - start) + 1);
            if (stroke.length) {
                this._undos.push(stroke);
            }
        },

        redo: function() {
            var stroke = this._undos.pop();
            if (stroke && stroke.length) {
                this._clicks = this._clicks.concat(stroke);
            }
        },

        numClicks: function() {
            return this._clicks.length;
        },

        getClick: function(idx) {
            return this._clicks[idx];
        },

        addClick: function(params) {
            this._clicks.push({
                x: params.x,
                y: params.y,
                dragging: params.dragging,
                color: params.color,
                weight: params.weight
            });
        },

        /**
         * addBackground
         * @param params (Object)
         *     - type (String) 'color' or 'image'
         *     - color (String) only if type is color
         *     - image (Image) only if type is image
         */
        addBackground: function(params) {
            var i,
                obj;

            // Make all other backgrounds inactive...
            for (i = 0; i < this._bgs.length; i++) {
                if (this._bgs[i]) {
                    this._bgs[i].active = false;
                }
            }

            if (params.type === 'color') {
                obj = {
                    type: 'color',
                    color: params.color,
                    active: true
                };
            }

            if (params.type === 'image') {
                obj = {
                    type: 'image',
                    image: params.image,
                    active: true
                };
            }

            this._bgs.push(obj);
        },

        getBackground: function() {
            return this._bgs[this._bgs.length - 1];
        }

    };

    if (!window.Paintr.Recordr) {
        window.Paintr.Recordr = Recordr;
    }

})();

(function(){

    var utils = Paintr.utils;

    function Surface(config){
        config = config || {};

        this._element = config.element || null;
        this._callbacks = {
            onchange: config.onchange || function(){}
        };
        this._settings = {
            width: config.width,
            height: config.height,
            strokeColor: config.strokeColor,
            strokeWidth: config.strokeWidth
        };

        this._init();
    }

    Surface.prototype = {

        set: function(key, value) {
            this._settings[key] = value;
        },

        undo: function() {
            this._recordr.undo();
            this._redraw();
            this._callbacks.onchange();
        },

        redo: function() {
            this._recordr.redo();
            this._redraw();
            this._callbacks.onchange();
        },

        canUndo: function() {
            return this._recordr.canUndo();
        },

        canRedo: function() {
            return this._recordr.canRedo();
        },

        exportDataURI: function() {
            return this._canvas.toDataURL();
        },

        updateBackgroundColor: function(color) {
            this._recordr.addBackground({
                type: 'color',
                color: color
            });
            this._redraw();
        },

        loadBackgroundImage: function(url) {
            var img;
            if (url) {
                img = new Image();
                img.onload = this._handleBGImageLoaded.bind(this, img);
                img.src = url;
            }
        },

        _handleBGImageLoaded: function(img) {
            this._recordr.addBackground({
                type: 'image',
                image: img
            });
            this._redraw();
        },

        _canvas: null,
        _context: null,
        _recordr: null,
        _getCanvasData: function() {
            return this._canvas.toDataURL();
        },

        _redraw: function() {
            var ctx = this._context,
                recordr = this._recordr,
                bg = recordr.getBackground() || {},
                i, click, prevClick;

            // clear canvas...
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // draw background...
            if (bg.type === 'image' && bg.image) {
                ctx.drawImage(bg.image, 0, 0);
            } else if (bg.type === 'color' && bg.color) {
                ctx.fillStyle = bg.color;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }

            // draw strokes...
            ctx.lineJoin = "round";
            for(i = 0; i < recordr.numClicks(); i++) {
                click = recordr.getClick(i);
                prevClick = recordr.getClick(i - 1);
                ctx.beginPath();

                if(click.dragging && i){
                    ctx.moveTo(prevClick.x, prevClick.y);
                }else{
                    ctx.moveTo(click.x - 1, click.y);
                }
                ctx.lineTo(click.x, click.y);
                ctx.closePath();
                ctx.strokeStyle = click.color;
                ctx.lineWidth = click.weight;
                ctx.stroke();
            }
        },

        _init: function() {
            this._recordr = new Paintr.Recordr();
            this._initElement();
            this._initCanvas();
            this._attachCanvasEvents();
        },

        _initElement: function() {
            this._element.className = [this._element.className, 'paintr-surface'].join(' ');
        },

        _initCanvas: function() {
            this._canvas = document.createElement('canvas');
            this._canvas.className = [this._canvas.className, 'paintr-surface-canvas'].join(' ');
            this._canvas = utils.canvasIEFallback(this._canvas);
            this._canvas.setAttribute('width', this._settings.width);
            this._canvas.setAttribute('height', this._settings.height);
            this._element.appendChild(this._canvas);
            this._context = this._canvas.getContext('2d');
        },

        _attachCanvasEvents: function() {
            if (!utils.isTouchDevice()) {
                this._canvas.addEventListener('mousedown', this._handleCanvasMousedown.bind(this));
                this._canvas.addEventListener('mousemove', this._handleCanvasMousemove.bind(this));
                this._canvas.addEventListener('mouseup', this._handleCanvasMouseup.bind(this));
                this._canvas.addEventListener('mouseleave', this._handleCanvasMouseleave.bind(this));
            } else {
                this._canvas.addEventListener('touchstart', this._handleCanvasMousedown.bind(this));
                this._canvas.addEventListener('touchmove', this._handleCanvasMousemove.bind(this));
                this._canvas.addEventListener('touchstop', this._handleCanvasMouseup.bind(this));
                this._canvas.addEventListener('touchcancel', this._handleCanvasMouseleave.bind(this));
            }
        },

        _handleCanvasMousedown: function(e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            this._painting = true;
            this._recordr.addClick({
                x: e.pageX - this._element.offsetLeft,
                y: e.pageY - this._element.offsetTop,
                color: this._settings.strokeColor,
                weight: this._settings.strokeWidth,
                dragging: false
            });
            this._redraw();
            this._callbacks.onchange();
        },

        _handleCanvasMousemove: function(e) {
            if (this._painting) {
                this._recordr.addClick({
                    x: e.pageX - this._element.offsetLeft,
                    y: e.pageY - this._element.offsetTop,
                    color: this._settings.strokeColor,
                    weight: this._settings.strokeWidth,
                    dragging: true
                });
                this._redraw();
                this._callbacks.onchange();
            }
        },

        _handleCanvasMouseup: function() {
            this._painting = false;
        },

        _handleCanvasMouseleave: function(e) {
            this._handleCanvasMouseup(e);
        }
    };

    if (!window.Paintr.Surface) {
        window.Paintr.Surface = Surface;
    }
})();

(function() {

    var DEFAULTS = {
        strokeWidths: [
            {label: 'x-thin', value: 1},
            {label: 'thin', value: 3},
            {label: 'normal', value: 5},
            {label: 'thick', value: 10},
            {label: 'x-thick', value: 15}
        ]
    };

    /**
     * Tools - generates a toolset for Surface
     * @param params (Object)
     *     - element (HTML element) element for tools
     *     - strokeColor (String)
     */
    function Tools(params) {
        params = params || {};
        this._isOpen = true;
        this._element = params.element;
        this._settings = {
            surfaceHeight: params.surfaceHeight
        };
        this._callbacks = {
            onchange: params.onchange,
            onundo: params.onundo || function(){},
            onredo: params.onredo || function(){},
            onexport: params.onexport || function(){}
        };
        this._defaultStrokeColor = params.strokeColor || null;
        this._defaultStrokeWidth = params.strokeWidth || null;
        this._defaultBgColor = params.bgColor || null;
        this._init();
    }

    Tools.prototype = {
        _init: function() {
            this._initElement();
            this._render();
            this._attachEventListeners();
        },

        _initElement: function() {
            this._element.classList.add('paintr-tools');
            if (this._settings.surfaceHeight) {
                this._element.style.height = this._settings.surfaceHeight + 'px';
            }
        },

        _render: function() {
            this._element.innerHTML = this._getMarkup();
            this._toggleButton = this._element.querySelector('.paintr-tools-toggle');
            this._strokeColorInput = this._element.querySelector('.paintr-tools-strokecolor');
            this._strokeWidthInput = this._element.querySelector('.paintr-tools-strokewidth');
            this._bgColorInput = this._element.querySelector('.paintr-tools-bgcolor');
            this._undoButton = this._element.querySelector('.paintr-tools-undo');
            this._redoButton = this._element.querySelector('.paintr-tools-redo');
            this._exportButton = this._element.querySelector('.paintr-tools-export');
        },

        _attachEventListeners: function() {
            this._toggleButton.addEventListener('click', this._toggleTools.bind(this));
            this._strokeColorInput.addEventListener('change', this._handleToolChangeEvent.bind(this));
            this._strokeWidthInput.addEventListener('change', this._handleToolChangeEvent.bind(this));
            this._bgColorInput.addEventListener('change', this._handleToolChangeEvent.bind(this));
            this._undoButton.addEventListener('click', this._handleUndoEvent.bind(this));
            this._redoButton.addEventListener('click', this._handleRedoEvent.bind(this));
            this._exportButton.addEventListener('click', this._handleExportEvent.bind(this));
        },

        _toggleTools: function() {
            if (this._isOpen) {
                this._element.classList.add('closed');
                this._isOpen = false;
            } else {
                this._element.classList.remove('closed');
                this._isOpen = true;
            }
        },

        _handleUndoEvent: function(e) {
            this._callbacks.onundo(e);
        },

        _handleRedoEvent: function(e) {
            this._callbacks.onredo(e);
        },

        _handleToolChangeEvent: function(e) {
            var onchange = this._callbacks.onchange,
                target = e.target;
            if (target === this._strokeColorInput) {
                onchange('strokeColor', target.value);
            } else if (target === this._strokeWidthInput) {
                onchange('strokeWidth', target.value);
            } else if (target === this._bgColorInput) {
                onchange('backgroundColor', target.value);
            }
        },

        _handleExportEvent: function() {
            this._callbacks.onexport();
        },

        _getMarkup: function() {
            return [this._getToggleMarkup(), this._getToolsMarkup()].join('');
        },

        _getToolsMarkup: function() {
            var strokeColorControl = ['<li>', this._getStrokeColorControlMarkup(), '</li>'].join(''),
                strokeWidthControl = ['<li>', this._getStrokeWidthControlMarkup(), '</li>'].join(''),
                strokeControls = ['<ul class="list-unstyled list-inline stroke-controls">', strokeColorControl, strokeWidthControl, '</ul>'].join(''),
                bgColorControl = ['<li>', this._getBGColorControlMarkup(), '</li>'].join(''),
                divider = '<li class="paintr-tools-divider"></li>',
                undoButton = ['<li>', this._getUndoControlMarkup(), '</li>'].join(''),
                redoButton = ['<li>', this._getRedoControlMarkup(), '</li>'].join(''),
                undoRedoControls = ['<ul class="list-unstyled list-inline">', undoButton, redoButton ,'</ul>'].join(''),
                exportButton = ['<li>', this._getExportControlMarkup(), '</li>'].join('');

            return [
                '<div class="paintr-tools-container">',
                '<ul class="list-unstyled">',
                strokeControls,
                divider,
                bgColorControl,
                divider,
                undoRedoControls,
                divider,
                exportButton,
                '</ul>',
                '</div>'
            ].join('');
        },

        _getToggleMarkup: function() {
            return '<div class="paintr-tools-header"><button class="paintr-tools-toggle"><span class="fa fa-gear icon"></span></button></div>';
        },

        _getBGColorControlMarkup: function() {
            return ['<span class="label">Background:</span><br/><input type="color" class="paintr-tools-bgcolor" value="', (this._defaultBgColor || ''), '">'].join('');
        },

        _getStrokeColorControlMarkup: function() {
            return ['<span class="label">Stroke:</span><br/><input type="color" class="paintr-tools-strokecolor" value="', (this._defaultStrokeColor || ''), '">'].join('');
        },

        _getStrokeWidthControlMarkup: function() {
            var widths = DEFAULTS.strokeWidths,
                opts = '',
                sel = false,
                opt, i;
            for(i = 0; i < widths.length; i++) {
                sel = (widths[i].value === this._defaultStrokeWidth);
                opts += ['<option value="', widths[i].value, '" ', (sel ? 'selected="selected"' : ''), '>',  widths[i].label, '</option>'].join('');
            }
            return ['<select class="paintr-tools-strokewidth">', opts, '</select>'].join('');
        },

        _getUndoControlMarkup: function() {
            return '<button class="paintr-tools-undo btn-xs">undo</button>';
        },

        _getRedoControlMarkup: function() {
            return '<button class="paintr-tools-redo btn-xs">redo</button>';
        },

        _getExportControlMarkup: function() {
            return '<button class="paintr-tools-export btn-xs">save</button>';
        },

        enableUndo: function() {
            this._undoButton.classList.remove('disabled');
            this._undoButton.disabled = false;
        },

        disableUndo: function() {
            this._undoButton.classList.add('disabled');
            this._undoButton.disabled = true;
        },

        enableRedo: function() {
            this._redoButton.classList.remove('disabled');
            this._redoButton.disabled = false;
        },

        disableRedo: function() {
            this._redoButton.classList.add('disabled');
            this._redoButton.disabled = true;
        }
    };

    if (!window.Paintr.Tools) {
        window.Paintr.Tools = Tools;
    }

})();
