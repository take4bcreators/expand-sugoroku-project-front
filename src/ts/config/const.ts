
export namespace AppConst {
    
    /** ミニゲームフォルダのパス（playingページからの相対パス） */
    export const MINIGAME_DIR: string = '../minigame';
    
    /** ミニゲームのランクに応じたポイント */
    export const RANK_POINTS = new Map([
        ['s', 50],
        ['a', 30],
        ['b', 10],
        ['c', 0]
    ]);
    
    /** ゴールした時のポイント */
    export const GOAL_POINTS = new Map([
        [1, 100],
        [2, 50],
        [3, 30],
    ]);
    
}
