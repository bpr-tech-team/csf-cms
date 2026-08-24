import * as migration_20260824_131429_add_localization from "./20260824_131429_add_localization";

export const migrations = [
    {
        up: migration_20260824_131429_add_localization.up,
        down: migration_20260824_131429_add_localization.down,
        name: "20260824_131429_add_localization",
    },
];
