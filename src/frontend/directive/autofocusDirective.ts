import { DirectiveOptions } from 'vue/types/options';

export const autofocusDirective: DirectiveOptions = {

    inserted(element: HTMLElement): void {
        element.focus();
    },
}
