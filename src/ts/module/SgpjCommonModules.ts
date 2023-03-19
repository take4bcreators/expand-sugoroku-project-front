


/** 
 * ランキング配列生成汎用関数
 * [参考] https://quickref.me/get-the-rank-of-an-array-of-numbers
 */
export function generateRankingArr(arr: number[]): number[] {
    return arr.map((x, _y, z) => z.filter(w => w > x).length + 1);
}

/**
 * 配列内で値が重複してないか調べる 
 * https://pisuke-code.com/js-check-duplicated-array-values/
 */
export function existsSameValue<T>(arr: Array<T>): boolean {
    const set = new Set(arr);
    return set.size != arr.length;
}
