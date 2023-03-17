
/** ローカルストレージに保存されているキーの情報一覧 */
export const StorageKeys = {
    /** セットアップ時の選択されたボード名 */
    setupBoard: 'sgpj_setup_board',
    /** セットアップ時の選択されたボードのID */
    setupBoardID: 'sgpj_setup_boardid',
    /** セットアップ時の入力されたプレイヤー情報 */
    setupPlayer: 'sgpj_setup_player',
    /** プレイ画面の状態識別文字列 */
    playingState: 'sgpj_playing_state',
    /** 参加プレイヤー数 */
    playingNumPlayers: 'sgpj_playing_num_players',
    /** プレイ中のボード名 */
    playingBoard: 'sgpj_playing_board',
    /** プレイ中のボードのID */
    playingBoardID: 'sgpj_playing_boardid',
    /** プレイヤー情報 */
    playingPlayers: 'sgpj_playing_players',
    /** 現在の順番番号 */
    playingCurrentOrderNum: 'sgpj_playing_current_order_num',
    /** 最後に振ったさいころの出目の数字 */
    playingLastDiceNum: 'sgpj_playing_last_dice_num',
    /** プレイ中のボードのデータ */
    playingBoardData: 'sgpj_playing_board_data',
    /** ゲーム終了フラグ */
    playingIsEnd: 'sgpj_playing_is_end',
    /** ゴールとなる場所のマス番号 */
    playingGoalIndex: 'sgpj_playing_goal_index',
    /** 最後に行ったミニゲームのランク文字列 */
    playingLastMinigameRank: 'sgpj_playing_last_minigame_rank',
    /** 最後に発行されたミニゲームの結果を保存するためのキー */
    playingLastMinigameKey: 'sgpj_playing_last_minigame_key',
}
