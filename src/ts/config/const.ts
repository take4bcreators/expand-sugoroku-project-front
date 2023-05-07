
export namespace AppConst {
    
    /** ミニゲームフォルダのパス（playingページからの相対パス）（末尾の / は不要） */
    export const MINIGAME_DIR: string = '../minigame';
    
    /** ミニゲームのランクに応じたポイント */
    export const RANK_POINTS: Map<string, number> = new Map([
        ['s', 50],
        ['a', 30],
        ['b', 10],
        ['c', 0]
    ]);
    
    /** ゴールした時のポイント */
    export const GOAL_POINTS: Map<number, number> = new Map([
        [1, 100],
        [2, 50],
        [3, 30],
    ]);
    
    /** セットアップ時に表示するプレイヤー入力欄の数 */
    export const DEFAULT_SETUP_PLAYER_COUNT: number = 5;
    
    /** 画像ファイルのあるディレクトリ（末尾の / は不要） */
    export const STATIC_IMAGE_DIR: string = '/images';
    
    /** プレイヤーアイコン用画像ファイルのあるディレクトリ（末尾の / は不要） */
    export const PLAYER_ICON_DIR: string = STATIC_IMAGE_DIR + '/playericon';
    
    /** プレイヤーアイコンに使用する画像ファイル名のリスト（拡張子を含む） */
    // note:
    //   アイコン画像の追加があった場合はこのリストを更新する
    //   GraphQLでの実装による自動更新も可能だが、表示順を制御したいためここで定義する形にする
    export const PLAYER_ICON_FILES: string[] = [
        'iconbu_sinpuru_na_inu_san.png',
        'iconbu_sinpuru_na_kuma_san.png',
        'iconbu_sinpuru_na_mikeneko_san_3.png',
        'iconbu_sinpuru_na_usagi_san.png',
        'iconbu_kitune_san.png',
        'iconbu_ahiru_san.png',
        'iconbu_kaeru_san.png',
        'iconbu_osakana_san.png',
        'iconbu_ekurea_no_irasuto.png',
    ];
    
    /** デフォルトで使用するプレイヤーアイコンのファイル名（拡張子を含む） */
    export const DEFAULT_PLAYER_ICON_FILE: string = 'iconbu_ekurea_no_irasuto.png';
    
    /** 未選択プレイヤーアイコンのファイル名（拡張子を含む） */
    export const UNSELECTED_PLAYER_ICON_FILE: string = 'figama_select_image_button.png';
    
}
