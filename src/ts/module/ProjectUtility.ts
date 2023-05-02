
export namespace ProjectUtility {
    /** 
     * ランキング配列生成汎用関数
     * https://quickref.me/get-the-rank-of-an-array-of-numbers
     */
    export function generateRankingArr(arr: number[]): number[] {
        return arr.map((x, _y, z) => z.filter(w => w > x).length + 1);
    }
    
    /**
     * 配列内で値が重複してないか調べる汎用関数
     * https://pisuke-code.com/js-check-duplicated-array-values/
     */
    export function existsSameValue<T>(arr: Array<T>): boolean {
        const set = new Set(arr);
        return set.size != arr.length;
    }
    
    /**
     * 配列の要素から 空文字、undefined、null を除外した要素を返す汎用関数。
     * スペース、0、false は除外されません。元の配列には影響ありません。
     * https://ryjkmr.com/javascript-array-remove-leave-zero-element/
     * @param arr 処理対象の配列
     * @returns 空文字、undefined、nullを除外した配列
     */
    export function generateCleanArr<T>(arr: Array<T>): Array<T> {
        return arr.filter(v => v !== '' && typeof v !== 'undefined' && v !== null);
    }
    
    /** 
     * ランダムな文字列を生成する汎用関数
     * https://webfrontend.ninja/js-random-string/
     */
    export function createRandomString(length: number): string {
        const S = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const L = length;
        let rnd = '';
        for (var i = 0; i < L; i++) {
            rnd += S.charAt(Math.floor(Math.random() * S.length));
        }
        return rnd;
    }
    
    /** 
     * 数字を漢数字に変換する汎用関数
     * @param num 変換対象の数値 [0-9999]
     * @returns 漢数字に変換したあとの文字列
     */
    export function convertNumberToKansuji(num: number): string {
        const ONE_DIGITS: string[] = ['零', '壱', '弐', '参', '四', '五', '六', '七', '八', '九'];
        const DIGIT_LIST: number[] = [1000, 100, 10];
        const DIGIT_STR_LIST: string[] = ['千', '百', '十'];
        const intNum = Math.trunc(num);
        if (intNum < 0 || intNum >= 10000) {
            return '';
        }
        let convertedStr = '';
        if (intNum < 10) {
            convertedStr = ONE_DIGITS[intNum];
        } else {
            for (let index = 0; index < DIGIT_LIST.length; index++) {
                const digitNum = Math.floor(intNum / DIGIT_LIST[index]) % 10;
                if (digitNum === 1) {
                    convertedStr += DIGIT_STR_LIST[index];
                } else if (digitNum !== 0) {
                    convertedStr += ONE_DIGITS[digitNum] + DIGIT_STR_LIST[index];
                }
            }
            const digitNum = intNum % 10;
            if (digitNum !== 0) {
                convertedStr += ONE_DIGITS[digitNum];
            }
        }
        return convertedStr;
    }
    
    /** 
     * 指定文字数以上の場合は ... をつけて省略した文字列を返す汎用関数
     * @param str 対象の文字列
     * @param limit 制限文字数 [初期値:10]
     * @returns 変換後の文字列
     */
    export function omittedContent(str: string, limit: number = 10) {
        if (limit <= 0) {
            return str;
        }
        if (str.length > limit) {
            return str.substring(0, limit) + '...';
        }
        return str;
    }
}
