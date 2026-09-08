import * as migration_20260908_222040_initial from "./20260908_222040_initial";

export const migrations = [
    {
        up: migration_20260908_222040_initial.up,
        down: migration_20260908_222040_initial.down,
        name: "20260908_222040_initial",
    },
];
