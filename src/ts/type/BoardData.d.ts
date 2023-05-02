
// @note 【JSON取得項目定義箇所】 取得項目に変更がある場合は、ここの指定を変更する
export type BoardData = {
  /** ボード情報郡 */
  board: {
    /** ボードID */
    id: string,
    /** ボード名 */
    name: string,
    /** ベースとなるボード */
    base: string,
  },
  /** マス情報郡 */
  square: {
    /** マスID */
    id: number,
    /** ゴールフラグ（true：このマスはゴール） */
    goalflag: boolean,
    /** マスの店情報郡 */
    store: {
      /** 店舗名 */
      name: string,
      /** 店舗名（かな） */
      name_kana: string,
      /** 店舗のID */
      id: string,
      /** 店舗のキャッチコピー */
      catch: string,
      /** 店舗のジャンル用キャッチコピー */
      genre_catch: string,
      /** 店舗のオープン時間 */
      open: string,
      /** 店舗の住所 */
      address: string,
      /** 店舗へのアクセス */
      access: string,
      /** 店舗の写真URL */
      photo: string,
    },
    /** マスのイベント情報郡 */
    event: {
      /** イベントフラグ */
      flag: boolean,
      /** イベント名 */
      name: string,
      /** イベント詳細 */
      detail: string,
      /** イベントによる変化ポイント */
      point: number,
      /** イベントにより付与されるスキップターン数 */
      skip: number,
      /** イベントにより発生するマスの移動先 */
      move: number,
      /** イベントによりミニゲームがあるか */
      minigame: boolean,
    },
    /** ミニゲーム情報郡 */
    minigame: {
      /** ミニゲームID */
      id: string,
      /** ミニゲーム名 */
      name: string,
      /** ミニゲーム詳細 */
      detail: string,
    },
  }[],
};
