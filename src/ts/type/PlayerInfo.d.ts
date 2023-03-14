
export type PlayerInfo = {
    /**
     * プレイヤーID
     *     000 から連番で付与する
     *     例：001
     */
    id: string,
    /** プレイヤー名 */
    name: string,
    /** プレイヤーアイコン番号（現在不使用） */
    icon: string,
    /** 
     * プレイヤーの順番番号
     *     0 から連番で付与する
     *     順番決めが未実施の場合は null
     */
    order: number | null,
    /** プレイヤーの現在のポイント */
    point: number,
    /** プレイヤーの現在のマス番号 */
    location: number,
    /** プレイヤーの現在のスキップターン数 */
    skipcnt: number,
    /** プレイヤーが既に終了しているかどうか */
    isfinish: boolean,
};
