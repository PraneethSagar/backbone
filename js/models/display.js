var app = app || {};

app.Display = Backbone.Model.extend({

    defaults: {
        stack: [0],
        displayValue: 0,
        operation: null,
        resetStack: true,
        valueStack: []
    },

    command: function (character) {
        var value = this.get('value'),
            memory1 = this.get('memory1'),
            memory2 = this.get('memory2'),
            operation = this.get('operation'),
            newValue = (memory1 || '') + '' + character;
        if (/[0-9\.]/.test(character)) {
            this.set({
                value: newValue,
                memory1: newValue
            });
        } else {
            switch (character) {
                case '/':
                case '*':
                case '-':
                case '+':
                    if (memory1 && memory2) {
                        this.calculateValue();
                        this.appendValue(character)
                    } else {
                        this.set({
                            operation: character,
                            memory1: 0,
                            memory2: memory1
                        });
                    }
                    break;
                case '=':
                    this.calculateValue();
                    break;
                case 'C':
                    this.set({
                        value: 0,
                        operation: null,
                        memory1: 0,
                        memory2: 0
                    });
                    break;
            }
        }
    },

    calculateValue: function () {
        var value = this.get('value'),
            operation = this.get('operation'),
            memory1 = this.get('memory1'),
            memory2 = this.get('memory2'),
            newValue;
        switch (operation) {
            case '/':
                newValue = +memory2 / +memory1;
                break;
            case '*':
                newValue = +memory2 * +memory1;
                break;
            case '-':
                newValue = +memory2 - +memory1;
                break;
            case '+':
                newValue = +memory2 + +memory1;
                break;
        }
        this.set({
            value: +newValue,
            operation: null,
            memory1: +newValue,
            memory2: 0
        });
    }

});
