


/** 
 * ランキング配列生成汎用関数
 * [参考] https://quickref.me/get-the-rank-of-an-array-of-numbers
 */
export function generateRankingArr(arr: number[]): number[] {
    return arr.map((x, _y, z) => z.filter(w => w > x).length + 1);
}

