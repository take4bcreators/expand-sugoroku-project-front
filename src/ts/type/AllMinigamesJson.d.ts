
export type AllMinigamesJson = {
  allMinigamesJson: {
    edges: {
      node: {
        /** ミニゲームID */
        jsonId: string,
        /** ミニゲーム名 */
        name: string,
        /** ミニゲーム詳細 */
        detail: string,
      },
    }[],
  },
};
