import * as migration_20260908_222040_initial from "./20260908_222040_initial";
import * as migration_20260914_094542_hero_background from "./20260914_094542_hero_background";
import * as migration_20260914_133628_form_employee from "./20260914_133628_form_employee";
import * as migration_20260920_135809_contact_and_branch_blocks from "./20260920_135809_contact_and_branch_blocks";
import * as migration_20260921_082638_unified_hero from "./20260921_082638_unified_hero";
import * as migration_20260922_103148_remove_legacy_cta from "./20260922_103148_remove_legacy_cta";
import * as migration_20260922_110836_remove_content_media_archive from "./20260922_110836_remove_content_media_archive";
import * as migration_20260922_144732_flexible_content from "./20260922_144732_flexible_content";
import * as migration_20260922_154825_flexible_content_theme from "./20260922_154825_flexible_content_theme";
import * as migration_20260922_160319_flexible_content_mobile from "./20260922_160319_flexible_content_mobile";
import * as migration_20260924_145734_vercel_blob from "./20260924_145734_vercel_blob";

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
    {
        up: migration_20260914_133628_form_employee.up,
        down: migration_20260914_133628_form_employee.down,
        name: "20260914_133628_form_employee",
    },
    {
        up: migration_20260920_135809_contact_and_branch_blocks.up,
        down: migration_20260920_135809_contact_and_branch_blocks.down,
        name: "20260920_135809_contact_and_branch_blocks",
    },
    {
        up: migration_20260921_082638_unified_hero.up,
        down: migration_20260921_082638_unified_hero.down,
        name: "20260921_082638_unified_hero",
    },
    {
        up: migration_20260922_103148_remove_legacy_cta.up,
        down: migration_20260922_103148_remove_legacy_cta.down,
        name: "20260922_103148_remove_legacy_cta",
    },
    {
        up: migration_20260922_110836_remove_content_media_archive.up,
        down: migration_20260922_110836_remove_content_media_archive.down,
        name: "20260922_110836_remove_content_media_archive",
    },
    {
        up: migration_20260922_144732_flexible_content.up,
        down: migration_20260922_144732_flexible_content.down,
        name: "20260922_144732_flexible_content",
    },
    {
        up: migration_20260922_154825_flexible_content_theme.up,
        down: migration_20260922_154825_flexible_content_theme.down,
        name: "20260922_154825_flexible_content_theme",
    },
    {
        up: migration_20260922_160319_flexible_content_mobile.up,
        down: migration_20260922_160319_flexible_content_mobile.down,
        name: "20260922_160319_flexible_content_mobile",
    },
    {
        up: migration_20260924_145734_vercel_blob.up,
        down: migration_20260924_145734_vercel_blob.down,
        name: "20260924_145734_vercel_blob",
    },
];
