import PageScript from '../interface/PageScript';

export class TopPageScript implements PageScript {
    private readonly NON_VISIBLE_CLASS_NAME: string = 'is-nonvisible';
    private readonly HIDE_CLASS_NAME: string = 'is-hide';
    private readonly NON_VISIBLE_MSEC: number = 1000;
    private readonly HIDE_MSEC: number = 500;
    private readonly SPLASH_CLASS: string = '.js-splash-screen-container';
    
    execScript() {
        setTimeout(() => {
            this.addClassToSplashElem(this.NON_VISIBLE_CLASS_NAME);
            setTimeout(() => {
                this.addClassToSplashElem(this.HIDE_CLASS_NAME);
            }, this.HIDE_MSEC);
        }, this.NON_VISIBLE_MSEC);
    }
    
    private addClassToSplashElem(className: string) {
        const splashElem = document.querySelector(this.SPLASH_CLASS);
        if (splashElem === null) {
            console.error('[SGPJ] splashElem is null');
            return;
        }
        splashElem.classList.add(className);
    }
}
