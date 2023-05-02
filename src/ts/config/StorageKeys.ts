
/** ローカルストレージに保存されているキーの情報一覧 */
export const StorageKeys = {
    /** セットアップ時の選択されたボード名 */
    SetupBoard: 'sgpj_setup_board',
    /** セットアップ時の選択されたボードのID */
    SetupBoardID: 'sgpj_setup_boardid',
    /** セットアップ時の入力されたプレイヤー情報 */
    SetupPlayer: 'sgpj_setup_player',
    /** プレイ画面の状態識別文字列 */
    PlayingState: 'sgpj_playing_state',
    /** 参加プレイヤー数 */
    PlayingNumPlayers: 'sgpj_playing_num_players',
    /** プレイ中のボード名 */
    PlayingBoard: 'sgpj_playing_board',
    /** プレイ中のボードのID */
    PlayingBoardID: 'sgpj_playing_boardid',
    /** プレイヤー情報 */
    PlayingPlayers: 'sgpj_playing_players',
    /** 現在の順番番号 */
    PlayingCurrentOrderNum: 'sgpj_playing_current_order_num',
    /** 最後に振ったさいころの出目の数字 */
    PlayingLastDiceNum: 'sgpj_playing_last_dice_num',
    /** プレイ中のボードのデータ */
    PlayingBoardData: 'sgpj_playing_board_data',
    /** ゲーム終了フラグ */
    PlayingIsEnd: 'sgpj_playing_is_end',
    /** ゴールとなる場所のマス番号 */
    PlayingGoalIndex: 'sgpj_playing_goal_index',
    /** 最後に行ったミニゲームのランク文字列 */
    PlayingLastMinigameRank: 'sgpj_playing_last_minigame_rank',
    /** 最後に発行されたミニゲームの結果を保存するためのキー */
    PlayingLastMinigameKey: 'sgpj_playing_last_minigame_key',
} as const;

/** キーの情報一覧のみを許容する型 */
export type StorageKeysMember = typeof StorageKeys[keyof typeof StorageKeys];
