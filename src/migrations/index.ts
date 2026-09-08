import * as migration_20260824_131429_add_localization from "./20260824_131429_add_localization";
import * as migration_20260902_141737_homepage_content_model from "./20260902_141737_homepage_content_model";
import * as migration_20260902_153634_homepage_content_model_alignment from "./20260902_153634_homepage_content_model_alignment";
import * as migration_20260903_092246_header_footer_content_model from "./20260903_092246_header_footer_content_model";
import * as migration_20260904_124442_about_page_template from "./20260904_124442_about_page_template";
import * as migration_20260907_163636_homepage_hero_block from "./20260907_163636_homepage_hero_block";
import * as migration_20260908_191202_service_page_blocks from "./20260908_191202_service_page_blocks";
import * as migration_20260908_200329_multiple_highlighted_fragments from "./20260908_200329_multiple_highlighted_fragments";
import * as migration_20260908_204406 from "./20260908_204406";
import * as migration_20260908_213232_remove_legacy_page_hero from "./20260908_213232_remove_legacy_page_hero";
import * as migration_20260908_215142_add_about_hero_block from "./20260908_215142_add_about_hero_block";

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
    {
        up: migration_20260903_092246_header_footer_content_model.up,
        down: migration_20260903_092246_header_footer_content_model.down,
        name: "20260903_092246_header_footer_content_model",
    },
    {
        up: migration_20260904_124442_about_page_template.up,
        down: migration_20260904_124442_about_page_template.down,
        name: "20260904_124442_about_page_template",
    },
    {
        up: migration_20260907_163636_homepage_hero_block.up,
        down: migration_20260907_163636_homepage_hero_block.down,
        name: "20260907_163636_homepage_hero_block",
    },
    {
        up: migration_20260908_191202_service_page_blocks.up,
        down: migration_20260908_191202_service_page_blocks.down,
        name: "20260908_191202_service_page_blocks",
    },
    {
        up: migration_20260908_200329_multiple_highlighted_fragments.up,
        down: migration_20260908_200329_multiple_highlighted_fragments.down,
        name: "20260908_200329_multiple_highlighted_fragments",
    },
    {
        up: migration_20260908_204406.up,
        down: migration_20260908_204406.down,
        name: "20260908_204406",
    },
    {
        up: migration_20260908_213232_remove_legacy_page_hero.up,
        down: migration_20260908_213232_remove_legacy_page_hero.down,
        name: "20260908_213232_remove_legacy_page_hero",
    },
    {
        up: migration_20260908_215142_add_about_hero_block.up,
        down: migration_20260908_215142_add_about_hero_block.down,
        name: "20260908_215142_add_about_hero_block",
    },
];
