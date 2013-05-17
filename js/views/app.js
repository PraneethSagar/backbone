var app = app || {};

// App view responsible for rendering app
app.AppView = Backbone.View.extend({

    el: $('#calculator'),

    template: _.template($('#app-template').html()),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        this.bindEvents();
        this.renderDisplay();
        this.renderButtons();
        return this;
    },

    bindEvents: function () {
        this.listenTo(this.model, 'change', this.onCalculatorChange, this);
    },

    onCalculatorChange: function () {
        this.displayView.setValue(this.model.get('result'));
    },

    renderDisplay: function () {
        this.displayView = new app.DisplayView({
            model: this.model
        });
        this.$('.display').append(this.displayView.el);
    },

    renderButtons: function () {
        var i = 10;
        this.buttons = {};
        while (i--) {
            this.renderButton(i);
        }
        this.renderButton('/', 'Divide');
        this.renderButton('+', 'Plus');
        this.renderButton('-', 'Minus');
        this.renderButton('.', 'Dot');
        this.renderButton('*', 'Multiply');
        this.renderButton('=', 'Return');
        this.renderButton('C', 'Clear');
    },

    renderButton: function (value, className) {
        var className = className || value;
        this.buttons[value] = new app.ButtonView({
            model: new app.Button({
                value: value
            })
        });
        this.$('.button' + className).append(this.buttons[value].el);
    },

    events: {
        'click .btn': 'onButtonClick'
    },

    onButtonClick: function (e) {
        var value = $(e.currentTarget).data('value');
        this.model.command(value);
    }

});
