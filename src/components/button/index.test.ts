import Sinon from "sinon";
import { Button } from ".";
import { expect } from "chai";

describe('Button', () => {

    const callback = Sinon.stub();

    const button = new Button({
        label: 'Кнопка',
        typeButton: 'primary-button',
        events: {
            click: callback
        }
    });

    describe('Element', () => {
        it('Должен быть элементом кнопки', () => {
            expect(button.element).to.be.instanceof(window.HTMLButtonElement);
        });

        it('Должен не иметь элемента input', () => {
            expect(button.element).to.not.instanceof(window.HTMLInputElement);
        });
    })



    it('Должен иметь событие клик', () => {
        button.element?.click();
        expect(callback.called).to.be.true;
    });
})
