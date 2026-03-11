import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор (строка по условию)
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        if (elements[elementName]) {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name; // ИСПРАВЛЕНО: убрали кавычки
                    return option;
                })
            );
        }
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            // ИСПРАВЛЕНО: добавили поиск select для фильтра продавца
            const input = parent.querySelector('input, select');

            if (input) {
                input.value = ''; 
            }

            const fieldName = action.dataset.field;
            if (fieldName) {
                state[fieldName] = ''; 
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    };
}
