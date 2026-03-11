import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы
        // @todo: #1.2 — вывести дополнительные шаблоны до и после таблицы
    before.reverse().forEach(subName => {
        // subName — это строка "header" из вашего массива в main.js
        const cloned = cloneTemplate(subName);
        
        if (cloned) {
            root[subName] = cloned; // Сохраняем в root под ключом "header"
            root.container.prepend(cloned.container);
        }
    });

    after.forEach(subName => {
        const cloned = cloneTemplate(subName);
        
        if (cloned) {
            root[subName] = cloned;
            root.container.append(cloned.container);
        }
    });


    // @todo: #1.3 —  обработать события и вызвать onAction()
    root.container.addEventListener('change', ()=> {
        onAction();
    });

    root.container.addEventListener('reset', () => {

        setTimeout(onAction); 
    });

    root.container.addEventListener('submit', (e)=> {
        e.preventDefault();
        onAction(e.submitter)
    })

    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            console.log('Ключи объекта row:', Object.keys(row)); 
            Object.keys(item).forEach(key => { 
                if(key in row.elements) {
                    row.elements[key].textContent = item[key];
                }
            }); 
            return row.container
        });
        //выполняю первое задание, убираю строку const nextRows = []; Добавляю из 
        root.elements.rows.replaceChildren(...nextRows);
    }
    
    return {...root, render};
}