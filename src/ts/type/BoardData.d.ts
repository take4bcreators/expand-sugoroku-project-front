
export type BoardData = {
  /** ボード情報郡 */
  board: {
    /** ボードID */
    id: string,
    /** ボード名 */
    name: string,
    /** ゴール地点の番号 */
    goal: number,
  },
  /** マス情報郡 */
  square: {
    /** マスID */
    id: number,
    /** ゴールフラグ（true：このマスはゴール） */
    goalFlag: boolean,
    /** マスの店情報郡 */
    store: {
      /** 店舗名 */
      name: string,
      /** 店舗の詳細 */
      desc: string,
    },
    /** マスのイベント情報郡 */
    event: {
      /** イベントフラグ */
      flag: boolean,
      /** イベント名 */
      name: string,
      /** イベント詳細 */
      desc: string,
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
      desc: string,
    },
  }[],
};