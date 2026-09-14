import * as migration_20260908_222040_initial from "./20260908_222040_initial";
import * as migration_20260914_094542_hero_background from "./20260914_094542_hero_background";

export const migrations = [
    {
        up: migration_20260908_222040_initial.up,
        down: migration_20260908_222040_initial.down,
        name: "20260908_222040_initial",
    },
    {
        up: migration_20260914_094542_hero_background.up,
        down: migration_20260914_094542_hero_background.down,
        name: "20260914_094542_hero_background",
    },
];
