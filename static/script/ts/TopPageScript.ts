import PageScript from "../interface/PageScript";

export class TopPageScript implements PageScript {
    private NON_VISIBLE_CLASS_NAME: string = 'is-nonvisible';
    private HIDE_CLASS_NAME: string = 'is-hide';
    private NON_VISIBLE_MSEC: number = 1000;
    private HIDE_MSEC: number = 500;
    
    execScript() {
        setTimeout(() => {
            const splashElem = document.querySelector('.js-splash-screen-container');
            if (splashElem === null) {
                console.error('[SGPJ] splashElem is null');
                return;
            }
            splashElem.classList.add(this.NON_VISIBLE_CLASS_NAME);
            setTimeout(() => {
                const splashElem = document.querySelector('.js-splash-screen-container');
                if (splashElem === null) {
                    console.error('[SGPJ] splashElem is null');
                    return;
                }
                splashElem.classList.add(this.HIDE_CLASS_NAME);
            }, this.HIDE_MSEC);
        }, this.NON_VISIBLE_MSEC);
    }
}
