

export class IzakayaPageScript {
    constructor() {}
    
    execScript() {
        const obiClassList = [
            'js-iz-obi--orange',
            'js-iz-obi--yellow',
            'js-iz-obi--green',
            'js-iz-obi--blue'
        ];
        const masuElems = document.querySelectorAll('.js-iz-masu');
        
        function changeObiColor() {
            const topSet = new Set();
            masuElems.forEach((masuElem) => {
                const masuTop = window.pageYOffset + (masuElem.getBoundingClientRect().top);
                topSet.add(masuTop);
            })
            const masuRowCount = topSet.size;
            const obiElem = document.querySelector('.js-iz-obi');
            if (obiElem === null) {
                console.error('obiElem is undefined');
                return;
            }
            const obiElemClone = obiElem.cloneNode() as HTMLElement;
            obiElemClone.classList.remove(...obiClassList);
            
            const obiWrapperElem = document.querySelector('.js-iz-obi-wrapper');
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
            window.removeEventListener('resize', changeObiColor);
            const masuCount = masuElems.length;
            const masuRowCount = Math.floor((masuCount - 1) / 10) + 1;
            const obiElem = document.querySelector('.js-iz-obi');
            if (obiElem === null) {
                console.error('obiElem is undefined');
                return;
            }
            const obiElemClone = obiElem.cloneNode() as HTMLElement;
            obiElemClone.classList.remove(...obiClassList);
            const obiWrapperElem = document.querySelector('.js-iz-obi-wrapper');
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
