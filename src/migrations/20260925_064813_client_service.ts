import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TABLE "pages_blocks_client_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Formulář',
  	"heading" varchar DEFAULT 'Přihlášení',
  	"description" varchar DEFAULT 'Zadejte přihlašovací údaje, které jste od nás obdrželi.',
  	"login_label" varchar DEFAULT 'Login',
  	"login_placeholder" varchar DEFAULT 'Vaše přihlašovací jméno',
  	"password_label" varchar DEFAULT 'Heslo',
  	"password_placeholder" varchar DEFAULT 'Vaše heslo',
  	"submit_button_label" varchar DEFAULT 'Přihlásit se',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_client_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Formulář',
  	"heading" varchar DEFAULT 'Přihlášení',
  	"description" varchar DEFAULT 'Zadejte přihlašovací údaje, které jste od nás obdrželi.',
  	"login_label" varchar DEFAULT 'Login',
  	"login_placeholder" varchar DEFAULT 'Vaše přihlašovací jméno',
  	"password_label" varchar DEFAULT 'Heslo',
  	"password_placeholder" varchar DEFAULT 'Vaše heslo',
  	"submit_button_label" varchar DEFAULT 'Přihlásit se',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_client_service" ADD CONSTRAINT "pages_blocks_client_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_service" ADD CONSTRAINT "_pages_v_blocks_client_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_client_service_order_idx" ON "pages_blocks_client_service" USING btree ("_order");
  CREATE INDEX "pages_blocks_client_service_parent_id_idx" ON "pages_blocks_client_service" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_client_service_path_idx" ON "pages_blocks_client_service" USING btree ("_path");
  CREATE INDEX "pages_blocks_client_service_locale_idx" ON "pages_blocks_client_service" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_client_service_order_idx" ON "_pages_v_blocks_client_service" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_client_service_parent_id_idx" ON "_pages_v_blocks_client_service" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_client_service_path_idx" ON "_pages_v_blocks_client_service" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_client_service_locale_idx" ON "_pages_v_blocks_client_service" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_client_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_client_service" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_client_service" CASCADE;
  DROP TABLE "_pages_v_blocks_client_service" CASCADE;`);
}
