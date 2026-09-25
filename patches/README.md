# Payload UI locale-copy patch

`@payloadcms__ui@3.90.2.patch` retains the locale-copy fix originally applied
to 3.88.0. The upstream utility is unchanged in 3.90.2, so the same patch still
applies. It resolves global configs correctly, excludes document IDs from update
data, and regenerates row IDs inside localized arrays and blocks without
removing IDs from unrelated data.

On each Payload upgrade, compare `dist/utilities/copyDataFromLocale.js` before
retargeting or removing this patch. Verify both merge and overwrite modes for a
page with nested localized blocks and for the Header global. Also verify that
the source locale and document identity remain intact.
