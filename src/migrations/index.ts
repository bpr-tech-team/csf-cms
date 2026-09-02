import * as migration_20260824_131429_add_localization from "./20260824_131429_add_localization";
import * as migration_20260902_141737_homepage_content_model from "./20260902_141737_homepage_content_model";
import * as migration_20260902_153634_homepage_content_model_alignment from "./20260902_153634_homepage_content_model_alignment";

export const migrations = [
    {
        up: migration_20260824_131429_add_localization.up,
        down: migration_20260824_131429_add_localization.down,
        name: "20260824_131429_add_localization",
    },
    {
        up: migration_20260902_141737_homepage_content_model.up,
        down: migration_20260902_141737_homepage_content_model.down,
        name: "20260902_141737_homepage_content_model",
    },
    {
        up: migration_20260902_153634_homepage_content_model_alignment.up,
        down: migration_20260902_153634_homepage_content_model_alignment.down,
        name: "20260902_153634_homepage_content_model_alignment",
    },
];
