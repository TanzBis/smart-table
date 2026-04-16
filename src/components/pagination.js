import {getPages} from "../lib/utils.js";

export const initPagination = (elements, createPage) => {
    // Подготовка шаблона (остается из шага #2.3)
    const { pages, fromRow, toRow, totalRows, firstPage, lastPage, previousPage, nextPage } = elements;
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.innerHTML = ''; 

    // --- КОД ИЗ ЗАДАНИЯ НАЧИНАЕТСЯ ТУТ ---
    let pageCount;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // ПЕРЕНЕСЕННЫЙ КОД ИЗ @todo: #2.6
        if (action === firstPage) page = 1;
        if (action === lastPage) page = pageCount;
        if (action === previousPage) page = Math.max(1, page - 1);
        if (action === nextPage) page = Math.min(pageCount, page + 1);

        return Object.assign({}, query, { 
            limit,
            page
        });
    }

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        // ПЕРЕНЕСЕННЫЙ КОД ИЗ @todo: #2.4 (Отрисовка цифр)
        const visiblePages = getPages(page, pageCount, 5);
        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }));

        // ПЕРЕНЕСЕННЫЙ КОД ИЗ @todo: #2.5 (Счетчики)
        // Обрати внимание: rowsPerPage заменена на limit, а data.length на total
        fromRow.textContent = Math.min(total, (page - 1) * limit + 1);
        toRow.textContent = Math.min(total, page * limit);
        totalRows.textContent = total;

        // Дополнительно: блокировка кнопок
        const isFirst = page <= 1;
        const isLast = page >= pageCount;
        if (firstPage) firstPage.disabled = isFirst;
        if (previousPage) previousPage.disabled = isFirst;
        if (nextPage) nextPage.disabled = isLast;
        if (lastPage) lastPage.disabled = isLast;
    }

    return {
        updatePagination,
        applyPagination
    };
    // --- КОД ИЗ ЗАДАНИЯ ЗАКОНЧИЛСЯ ТУТ ---
}
