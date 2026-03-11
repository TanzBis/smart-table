import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // 1. Правило для поиска по нескольким полям
    const searchRule = rules.searchMultipleFields(
        searchField, 
        ['date', 'customer', 'seller', 'total_amount'], 
        false
    );

    // 2. ИСПРАВЛЕНИЕ: Передаем настройки массивом, а правило — вторым массивом
    const compare = createComparison(
        ['skipEmptyTargetValues'], // Настройка в виде строки в массиве
        [searchRule]               // Правило в виде массива
    );

    return (data, state) => {
        // 3. Если поле поиска пустое — возвращаем всё
        if (!state || !state[searchField]) return data;

        // 4. Фильтруем данные
        return data.filter(item => compare(item, state));
    };
}
