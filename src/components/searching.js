import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // 1. Убедитесь, что второй аргумент — это МАССИВ ['date', 'customer', 'seller']
    const searchRule = rules.searchMultipleFields(searchField, ['date', 'customer', 'seller', 'total_amount'], false);


    const compare = createComparison({ skipEmptyTargetValues: true }, searchRule);

    return (data, state) => {
        // Если в state[searchField] пусто, пропускаем фильтрацию
        if (!state[searchField]) return data;

        return data.filter(item => compare(item, state));
    };
}