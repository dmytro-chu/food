import {getResource} from '../services/services';

function cards() {
    let container = document.querySelector('.menu__field .container');
    console.log(container);

    container.innerHTML='';

    class MenuCard {
        constructor(menuItemTitle, menuItemImage, menuItemContent, menuItemPrice, menuItemImageAlt, parentSelector, ...classes) {
            this.menuItemTitle = menuItemTitle;
            this.menuItemImage = menuItemImage;
            this.menuItemContent = menuItemContent;
            this.menuItemPrice = menuItemPrice;
            this.classes = classes;
            this.menuItemImageAlt = menuItemImageAlt;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.menuItemPrice = this.menuItemPrice * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `   
                <img src="${this.menuItemImage}" alt="${this.menuItemImageAlt}">
                <h3 class="menu__item-subtitle">${this.menuItemTitle}</h3>
                <div class="menu__item-descr">${this.menuItemContent}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.menuItemPrice}</span> грн/день</div>
                </div>
                `;
                
            this.parent.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({menuItemTitle, menuItemImage, menuItemContent,  menuItemPrice, menuItemImageAlt}) => {
                new MenuCard(menuItemTitle, menuItemImage, menuItemContent,  menuItemPrice, menuItemImageAlt, '.menu .container').render();
            });
        });
}

export default cards;