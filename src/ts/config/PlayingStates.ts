
/** プレイ画面の状態識別文字列 */
export const PlayingStates = {
    /** 順番決め画面 */
    DecideOrder: 'decideOrder',
    /** 待機画面 */
    Standby: 'standby',
    /** サイコロ画面 */
    Dice: 'dice',
    /** サイコロ終了画面 */
    DiceFinish: 'diceFinish',
    /** マスイベント画面 */
    SquareEvent: 'squareEvent',
    /** 最終結果発表画面 */
    Ending: 'ending',
    /** ミニゲーム開始前画面 */
    MinigameReady: 'minigameReady',
    /** ミニゲーム終了後結果画面 */
    MinigameResult: 'minigameResult',
} as const;

/** プレイ画面の状態識別文字列のみを許容する型 */
export type PlayingStatesMember = typeof PlayingStates[keyof typeof PlayingStates];
