import type { AllBoardsJson } from './AllBoardsJson';

export type PlayingPageParentProps = {
    data: AllBoardsJson,
    location: Location,
}

export type PlayingPageChildProps = {
    data: AllBoardsJson,
    location: Location,
    playingState: string,
    setPlayingState: React.Dispatch<React.SetStateAction<string>>,
}
