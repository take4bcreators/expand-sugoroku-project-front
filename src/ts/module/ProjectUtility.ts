
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
     * ランダムな文字列を生成する汎用関数
     * https://webfrontend.ninja/js-random-string/
     */
    export function createRandomString(length: number) {
        const S = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const L = length;
        let rnd = '';
        for (var i = 0; i < L; i++) {
            rnd += S.charAt(Math.floor(Math.random() * S.length));
        }
        return rnd;
    }
}
