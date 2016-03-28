/* global Paintr */
import Em from 'ember';

export default Em.Component.extend({
    paintrWidth: 500,
    paintrHeight: 300,
    paintrId: Em.computed('elementId', function() {
        return this.get('elementId') + '-paintr';
    }),
    paintrStrokeWidth: 5,
    paintrStrokeColor: '#42d9f7',
    paintrBackgroundColor: '#ffffff',
    paintrUndoDisabled: true,
    paintrRedoDisabled: true,
    paintrToolsClosedClass: '',

    didInsertElement: function () {
        var self = this,
            element = Em.$(this.get('element')).find('#' + this.get('paintrId')).get(0),
            tools = Em.$(this.get('element')).find('.paintr-tools'),
            paintr = new Paintr({
                width: this.get('paintrWidth'),
                height: this.get('paintrHeight'),
                element: element,
                callbacks: {
                    onExport: function(data) {
                        self.send('save', data);
                    },
                    onChange: function() {
                        self._toggleUndoRedo();
                    }
                }
            });
        this.set('_paintr', paintr);
        this.set('$tools', tools);
    },

    _toggleUndoRedo: function() {
        if (this.get('_paintr').canUndo()) {
            this.set('paintrUndoDisabled', false);
        } else {
            this.set('paintrUndoDisabled', true);
        }

        if (this.get('_paintr').canRedo()) {
            this.set('paintrRedoDisabled', false);
        } else {
            this.set('paintrRedoDisabled', true);
        }
    },

    backgroundColorChanged: function() {
        this.get('_paintr').updateBackgroundColor(this.get('paintrBackgroundColor'));
    }.observes('paintrBackgroundColor'),
    strokeColorChanged: function() {
        this.get('_paintr').updateStrokeColor(this.get('paintrStrokeColor'));
    }.observes('paintrStrokeColor'),
    strokeWidthChanged: function() {
        this.get('_paintr').updateStrokeWidth(this.get('paintrStrokeWidth'));
    }.observes('paintrStrokeWidth'),

    actions: {
        undo: function() {
            this.get('_paintr').undo();
        },
        redo: function() {
            this.get('_paintr').redo();
        },
        save: function() {
            this.sendAction('createImage', {
                user: this.get('paintrUser'),
                title: this.get('paintrTitle'),
                data_uri: this.get('_paintr').exportDataURI()
            });
        },
        toggleTools: function() {
            this.get('$tools').toggleClass('closed');
        }
    }
});
