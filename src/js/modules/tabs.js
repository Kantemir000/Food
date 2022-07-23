function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, activeSelector) {
    //не всегда используют inline style, используют class
    const tabsParent = document.querySelector(tabsParentSelector),
          tabs = tabsParent.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);

    function haidTabsContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade'); //fade - чтобы при переключениях анимация вновь воспроизводилась
        });

        tabs.forEach(item => {
            item.classList.remove(activeSelector);
        });
    }

    function showTabsContent(i = 0) { //параметры по умолчанию es6 
        //tabsContent[i].style.display = "block";
        tabsContent[i].classList.add('show', 'fade'); 
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeSelector); 
    }
    haidTabsContent();
    showTabsContent(); 

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item){ //тот элемент на который только что кликнули == тот элемент, который мы перебираем в цикле
                    haidTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}
export default tabs;


