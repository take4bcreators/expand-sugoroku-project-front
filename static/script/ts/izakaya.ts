

export class IzakayaPageScript {
    constructor() {}
    
    execScript() {
        const obiClassList = [
            'js-obi--orange',
            'js-obi--yellow',
            'js-obi--green',
            'js-obi--blue'
        ];
        const masuElems = document.querySelectorAll('.js-masu');
        
        function changeObiColor() {
            const topSet = new Set();
            masuElems.forEach((masuElem) => {
                const masuTop = window.pageYOffset + (masuElem.getBoundingClientRect().top);
                topSet.add(masuTop);
            })
            const masuRowCount = topSet.size;
            const obiElem = document.querySelector('.js-obi');
            if (obiElem === null) {
                console.error('obiElem is undefined');
                return;
            }
            const obiElemClone = obiElem.cloneNode() as HTMLElement;
            obiElemClone.classList.remove(...obiClassList);
            
            const obiWrapperElem = document.querySelector('.js-obi-wrapper');
            if (obiWrapperElem === null) {
                console.error('obiWrapperElem is undefined');
                return;
            }
            obiWrapperElem.innerHTML = '';
            let obiCount = 0;
            for (let index = 0; index < masuRowCount; index++) {
                const obiElemCloneClone = obiElemClone.cloneNode() as HTMLElement;
                obiElemCloneClone.classList.add(obiClassList[obiCount]);
                obiWrapperElem.appendChild(obiElemCloneClone);
                obiCount++;
                if (obiCount >= obiClassList.length) {
                    obiCount = 0;
                }
            }
        }
        
        function beforePrint() {
            const MASU_ROW_COUNT = 4;
            window.removeEventListener('resize', changeObiColor);
            const obiElem = document.querySelector('.js-obi');
            if (obiElem === null) {
                console.error('obiElem is undefined');
                return;
            }
            const obiElemClone = obiElem.cloneNode() as HTMLElement;
            obiElemClone.classList.remove(...obiClassList);
            const obiWrapperElem = document.querySelector('.js-obi-wrapper');
            if (obiWrapperElem === null) {
                console.error('obiWrapperElem is undefined');
                return;
            }
            obiWrapperElem.innerHTML = '';
            let obiCount = 0;
            for (let index = 0; index < MASU_ROW_COUNT; index++) {
                const obiElemCloneClone = obiElemClone.cloneNode() as HTMLElement;
                obiElemCloneClone.classList.add(obiClassList[obiCount]);
                obiWrapperElem.appendChild(obiElemCloneClone);
                obiCount++;
                if (obiCount >= obiClassList.length) {
                    obiCount = 0;
                }
            }
        }
        
        function afterPrint() {
            window.addEventListener('resize', changeObiColor);
            changeObiColor();
        }
        
        changeObiColor();
        window.addEventListener('resize', changeObiColor);
        window.addEventListener('beforeprint', beforePrint);
        window.addEventListener('afterprint', afterPrint);
    }
}
