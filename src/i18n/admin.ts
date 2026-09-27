export const adminTranslations = {
    cs: {
        // Payload inserts collection and field labels in their base form.
        // Keep them after a colon or in parentheses instead of inflecting them.
        authentication: {
            alreadyLoggedIn: "Přihlášení je již aktivní",
            authenticated: "Ověřeno",
            confirmGeneration: "Potvrdit vygenerování",
            emailNotValid: "Zadaná e-mailová adresa není platná.",
            emailOrUsername: "E-mail nebo uživatelské jméno",
            emailSent: "E-mail byl odeslán",
            forgotPasswordEmailInstructions:
                "Zadejte svou e-mailovou adresu. Zašleme vám pokyny k obnovení hesla.",
            forgotPasswordUsernameInstructions:
                "Zadejte své uživatelské jméno. Pokyny k obnovení hesla zašleme na e-mailovou adresu vašeho účtu.",
            stayLoggedIn: "Zachovat přihlášení",
            verifyYourEmail: "Ověřte svou e-mailovou adresu",
            youAreInactive:
                "Kvůli neaktivitě brzy dojde k automatickému odhlášení. Chcete zachovat přihlášení?",
            youAreReceivingResetPassword:
                "Tento e-mail jsme vám zaslali na základě žádosti o obnovení hesla k vašemu účtu.",
        },
        dashboard: {
            discardMessage:
                "Rozložení nástěnky obsahuje neuložené změny. Zahodit změny?",
            editDashboard: "Upravit nástěnku",
            editingDashboard: "Úprava nástěnky",
        },
        error: {
            deletingTitle:
                "Odstranění se nezdařilo: {{title}}. Zkontrolujte připojení a zkuste to znovu.",
            documentNotFound:
                "Dokument s ID {{id}} nebyl nalezen. Dokument neexistuje nebo k němu nemáte přístup.",
            emailOrPasswordIncorrect:
                "Zadaná e-mailová adresa nebo heslo nejsou správné.",
            localesNotSaved_one: "Nepodařilo se uložit tyto jazykové verze:",
            localesNotSaved_other: "Nepodařilo se uložit tyto jazykové verze:",
            missingEmail: "Chybí e-mailová adresa.",
            restoringTitle:
                "Obnovení se nezdařilo: {{title}}. Zkontrolujte připojení a zkuste to znovu.",
            unableToDeleteCount:
                "Odstranění se nezdařilo. {{label}}: {{count}} z {{total}}.",
            unableToReindexCollection:
                "Přeindexování se nezdařilo. Kolekce: {{collection}}. Operace byla přerušena.",
            unableToUpdateCount:
                "Aktualizace se nezdařila. {{label}}: {{count}} z {{total}}.",
        },
        fields: {
            addLabel: "Přidat: {{label}}",
            addNew: "Přidat",
            addNewLabel: "Přidat: {{label}}",
            addRelationship: "Přidat vazbu",
            addUpload: "Přidat soubor",
            chooseBetweenCustomTextOrDocument:
                "Zadejte vlastní URL nebo vyberte interní dokument.",
            chooseDocumentToLink: "Vyberte cílový dokument",
            chooseLabel: "Vybrat: {{label}}",
            editLabelData: "Upravit údaje: {{label}}",
            editRelationship: "Upravit vazbu",
            labelRelationship: "Vazba: {{label}}",
            linkedTo: "Cíl odkazu: <0>{{label}}</0>",
            newLabel: "Vytvořit: {{label}}",
            relationTo: "Cílová kolekce",
            removeRelationship: "Odebrat vazbu",
            removeUpload: "Odebrat soubor",
            searchForLanguage: "Hledat jazyk",
            selectExistingLabel: "Vybrat existující záznam: {{label}}",
            swapRelationship: "Změnit vazbu",
            swapUpload: "Vyměnit soubor",
            uploadNewLabel: "Nahrát: {{label}}",
        },
        folder: {
            folderTypeDescription:
                "Vyberte kolekce, jejichž dokumenty lze ukládat do této složky.",
            itemHasBeenMoved:
                "Přesun dokončen: {{title}}. Cílová složka: {{folderName}}.",
            itemHasBeenMovedToRoot:
                "Přesun do kořenové složky dokončen: {{title}}.",
            itemsMovedToFolder:
                "Přesun dokončen: {{title}}. Cílová složka: {{folderName}}.",
            itemsMovedToRoot: "Přesun do kořenové složky dokončen: {{title}}.",
            moveItemsToFolderConfirmation:
                "Přesunout vybrané záznamy? Výběr: <1>{{label}} ({{count}})</1>. Cílová složka: <2>{{toFolder}}</2>.",
            moveItemsToRootConfirmation:
                "Přesunout vybrané záznamy do kořenové složky? Výběr: <1>{{label}} ({{count}})</1>.",
            moveItemToFolderConfirmation:
                "Přesunout záznam <1>{{title}}</1>? Cílová složka: <2>{{toFolder}}</2>.",
            moveItemToRootConfirmation:
                "Přesunout záznam <1>{{title}}</1> do kořenové složky?",
            movingFromFolder:
                "Přesouvání: {{title}}. Zdrojová složka: {{fromFolder}}.",
            searchByNameInFolder: "Hledat podle názvu. Složka: {{folderName}}",
            selectFolderForItem: "Vybrat cílovou složku: {{title}}",
        },
        general: {
            name: "Název",
            aboutToDelete: "Odstranit záznam „<1>{{title}}</1>“ ({{label}})?",
            aboutToDeleteCount_many:
                "Odstranit vybrané záznamy? {{label}}: {{count}}.",
            aboutToDeleteCount_one:
                "Odstranit vybrané záznamy? {{label}}: {{count}}.",
            aboutToDeleteCount_other:
                "Odstranit vybrané záznamy? {{label}}: {{count}}.",
            aboutToPermanentlyDelete:
                "Trvale odstranit záznam „<1>{{title}}</1>“ ({{label}})?",
            aboutToPermanentlyDeleteTrash:
                "Trvale odstranit záznamy z koše? <1>{{label}}</1>: <0>{{count}}</0>.",
            aboutToRestore: "Obnovit záznam „<1>{{title}}</1>“ ({{label}})?",
            aboutToRestoreAsDraft:
                "Obnovit záznam „<1>{{title}}</1>“ ({{label}}) jako koncept?",
            aboutToRestoreAsDraftCount:
                "Obnovit vybrané záznamy jako koncept? {{label}}: {{count}}.",
            aboutToRestoreCount:
                "Obnovit vybrané záznamy? {{label}}: {{count}}.",
            aboutToTrash:
                "Přesunout záznam „<1>{{title}}</1>“ ({{label}}) do koše?",
            aboutToTrashCount:
                "Přesunout vybrané záznamy do koše? {{label}}: {{count}}.",
            // List tabs append the collection label outside the translation.
            all: "Vše:",
            allLocales: "Všechny jazykové verze",
            automatic: "Podle systému",
            clear: "Vymazat",
            confirmCopy: "Potvrdit kopírování",
            confirmReindex: "Přeindexovat kolekce: {{collections}}?",
            confirmReindexDescription:
                "Stávající indexy budou odstraněny a dokumenty znovu zaindexovány. Kolekce: {{collections}}.",
            copyWarning:
                "Přepsat cílovou jazykovou verzi? Zdroj: {{from}}. Cíl: {{to}}. {{label}}: {{title}}.",
            createdAt: "Vytvořeno",
            createNew: "Vytvořit",
            createNewLabel: "Vytvořit: {{label}}",
            creatingNewLabel: "Vytváření: {{label}}",
            deletedCountSuccessfully:
                "Odstranění dokončeno. {{label}}: {{count}}.",
            deleteLabel: "Odstranit: {{label}}",
            deletePermanently: "Přeskočit koš a trvale odstranit",
            deselectAllRows: "Zrušit výběr všech řádků",
            documentIsTrashed:
                "Záznam je v koši a lze jej pouze prohlížet. Typ: {{label}}.",
            documentOutOfDate:
                "Dokument mezitím změnil jiný uživatel. Obnovte zobrazení, aby se načetla aktuální data.",
            editingLabel_many: "Úprava: {{label}} ({{count}})",
            editingLabel_one: "Úprava: {{label}} ({{count}})",
            editingLabel_other: "Úprava: {{label}} ({{count}})",
            editLabel: "Upravit: {{label}}",
            emptyTrashLabel: "Vyprázdnit koš: {{label}}",
            export: "Export",
            fallbackToDefaultLocale:
                "Použít obsah výchozí jazykové verze, pokud překlad chybí",
            filterWhere: "Podmínky filtru: {{label}}",
            globals: "Globální obsah",
            groupByLabel: "Seskupit podle pole: {{label}}",
            light: "Světlý",
            locale: "Jazyková verze",
            locales: "Jazykové verze",
            lock: "Uzamknout",
            menu: "Nabídka",
            move: "Přesunout",
            moveConfirm:
                "Přesunout vybrané záznamy? {{label}}: {{count}}. Cíl: <1>{{destination}}</1>.",
            moveCount: "Přesunout: {{label}} ({{count}})",
            movingCount: "Přesouvání: {{label}} ({{count}})",
            newLabel: "Vytvořit: {{label}}",
            noLabel: "Bez hodnoty ({{label}})",
            none: "Bez výběru",
            noResults:
                "Žádné výsledky. Kolekce: {{label}}. Zatím neobsahuje žádné záznamy nebo žádný neodpovídá nastaveným filtrům.",
            noResultsDescription:
                "Zatím nejsou k dispozici žádné záznamy nebo žádný neodpovídá nastaveným filtrům.",
            noTrashResults: "Žádné výsledky v koši. Kolekce: {{label}}.",
            payloadSettings: "Nastavení Payload",
            permanentlyDeletedCountSuccessfully:
                "Trvalé odstranění dokončeno. {{label}}: {{count}}.",
            reindexingAll: "Přeindexování kolekcí: {{collections}}.",
            restoredCountSuccessfully:
                "Obnovení dokončeno. {{label}}: {{count}}.",
            restoring: "Obnovování…",
            schedulePublishFor: "Naplánovat publikaci: {{title}}",
            searchBy: "Hledat podle pole: {{label}}",
            select: "Vybrat",
            selectAll: "Vybrat vše: {{label}} ({{count}})",
            selectAllRows: "Vybrat všechny řádky",
            selectedCount: "Výběr: {{label}} ({{count}})",
            selectLabel: "Vybrat: {{label}}",
            selectValue: "Vybrat hodnotu",
            showAllLabel: "Zobrazit vše: {{label}}",
            sort: "Seřadit",
            sortByLabelDirection: "Řazení: {{label}} ({{direction}})",
            successfullyCreated: "Vytvoření dokončeno: {{label}}.",
            successfullyDuplicated: "Duplikace dokončena: {{label}}.",
            successfullyReindexed:
                "Přeindexování dokončeno. Kolekce: {{collections}}. Počet dokumentů: {{count}} z {{total}}. Přeskočené koncepty: {{skips}}.",
            titleDeleted: "Odstranění dokončeno: {{label}} — {{title}}.",
            titleRestored: "Obnovení dokončeno: {{label}} — {{title}}.",
            titleTrashed: "Přesun do koše dokončen: {{label}} — {{title}}.",
            trashedCountSuccessfully:
                "Přesun do koše dokončen. {{label}}: {{count}}.",
            unauthorized: "Přístup odepřen",
            updatedAt: "Aktualizováno",
            updatedCountSuccessfully:
                "Aktualizace dokončena. {{label}}: {{count}}.",
            updatedLabelSuccessfully: "Aktualizace dokončena: {{label}}.",
            updateForEveryone: "Aktualizovat pro všechny",
        },
        localization: {
            cannotCopySameLocale:
                "Zdrojová a cílová jazyková verze musí být odlišné.",
            copyFromTo: "Kopírování. Zdroj: {{from}}. Cíl: {{to}}.",
            copyToLocale: "Kopírovat do jazykové verze",
            localeToPublish: "Jazyková verze k publikaci",
            selectLocaleToCopy: "Vyberte jazykovou verzi ke kopírování",
            selectLocaleToDuplicate: "Vyberte jazykové verze k duplikaci",
        },
        upload: {
            focalPoint: "Bod zájmu",
            focalPointDescription:
                "Přesuňte bod zájmu v náhledu nebo upravte jeho souřadnice níže.",
            selectFile: "Vybrat soubor",
            setFocalPoint: "Nastavit bod zájmu",
            sizesFor: "Velikosti: {{label}}",
        },
        validation: {
            fieldHasNo: "V tomto poli chybí hodnota: {{label}}.",
            greaterThanMax:
                "Hodnota {{value}} překračuje maximum {{max}} ({{label}}).",
            lessThanMin:
                "Hodnota {{value}} je nižší než minimum {{min}} ({{label}}).",
            limitReached:
                "Byl dosažen limit. Maximální počet položek: {{max}}.",
            longerThanMin: "Minimální počet znaků: {{minLength}}.",
            requiresAtLeast: "Minimální počet: {{count}} ({{label}}).",
            requiresNoMoreThan: "Maximální počet: {{count}} ({{label}}).",
            shorterThanMax: "Maximální počet znaků: {{maxLength}}.",
            validUploadID: "Neplatné ID nahraného souboru.",
        },
        version: {
            aboutToPublishSelection:
                "Publikovat všechny vybrané záznamy? Kolekce: {{label}}.",
            aboutToRestore:
                "Obnovit předchozí stav? {{label}}. Datum verze: {{versionDate}}.",
            aboutToRestoreGlobal:
                "Obnovit předchozí stav globálního obsahu? {{label}}. Datum verze: {{versionDate}}.",
            aboutToUnpublishIn:
                "Zrušit publikaci dokumentu? Jazyková verze: {{locale}}.",
            aboutToUnpublishSelection:
                "Zrušit publikaci všech vybraných záznamů? Kolekce: {{label}}.",
            changedFieldsCount_one: "Změněná pole: {{count}}",
            changedFieldsCount_other: "Změněná pole: {{count}}",
            confirmPublish: "Potvrdit publikaci",
            confirmRevertToSaved: "Potvrdit návrat k uložené verzi",
            currentDocumentStatus: "Aktuální stav dokumentu: {{docStatus}}",
            currentDraft: "Aktuální koncept",
            noRowsFound: "Žádné výsledky: {{label}}",
            noRowsSelected: "Výběr je prázdný: {{label}}",
            previouslyDraft: "Dříve koncept",
            publishAllLocales: "Publikovat všechny jazykové verze",
            publishIn: "Publikovat: {{locale}}",
            revertToPublished: "Vrátit se k publikované verzi",
            selectLocales: "Vyberte jazykové verze k zobrazení",
            showLocales: "Zobrazit jazykové verze:",
            specificVersion: "Konkrétní verze",
            unpublishedSuccessfully: "Publikace byla zrušena.",
            unpublishIn: "Zrušit publikaci: {{locale}}",
            unpublishing: "Rušení publikace…",
            versionCount_many: "Počet nalezených verzí: {{count}}",
            versionCount_none: "Žádné verze nebyly nalezeny",
            versionCount_one: "Počet nalezených verzí: {{count}}",
            versionCount_other: "Počet nalezených verzí: {{count}}",
            viewingVersion: "Verze: {{entityLabel}} — {{documentTitle}}",
            viewingVersionGlobal: "Verze globálního obsahu: {{entityLabel}}",
            viewingVersions: "Verze: {{entityLabel}} — {{documentTitle}}",
            viewingVersionsGlobal: "Verze globálního obsahu: {{entityLabel}}",
        },
        "plugin-redirects": {
            customUrl: "Vlastní URL",
            documentToRedirect: "Dokument, na který přesměrovat",
            fromUrl: "Zdrojová URL",
            internalLink: "Interní odkaz",
            redirectType: "Typ přesměrování",
            toUrlType: "Typ cílové URL",
        },
        "plugin-form-builder": {
            name: "Název pole (malá písmena, bez speciálních znaků)",
            bcc: "Skrytá kopie",
            cc: "Kopie",
            checkboxPlural: "Zaškrtávací políčka",
            countryPlural: "Pole pro výběr země",
            countrySingular: "Země",
            allowedFileTypesDescription:
                "Zadejte povolené typy MIME (např. image/* nebo application/pdf). Prázdné pole povoluje všechny typy souborů.",
            divide: "Dělit",
            emailFrom: "Odesílatel",
            emailSingular: "E-mail",
            emailTo: "Příjemce",
            field: "Pole",
            emailsDescription:
                "Nastavte e-maily odesílané po přijetí formuláře. Více příjemců oddělte čárkami. Hodnotu pole vložte pomocí jeho názvu ve dvojitých složených závorkách, například {{firstName}}. Pro všechna data použijte {{*}}, pro HTML tabulku {{*:table}}.",
            label: "Popisek",
            placeholder: "Zástupný text",
            multiply: "Násobit",
            numberPlural: "Číselná pole",
            radioOptions: "Možnosti přepínače",
            radioPlural: "Přepínače",
            radioSingular: "Přepínač",
            replyTo: "Adresa pro odpověď",
            selectOptions: "Možnosti výběru",
            selectPlural: "Výběrová pole",
            selectSingular: "Výběr",
            statePlural: "Pole pro výběr státu USA",
            stateSingular: "Stát USA",
            submitButton: "Text odesílacího tlačítka",
            textareaPlural: "Víceřádková textová pole",
            textareaSingular: "Víceřádkový text",
            token: "Token",
            uploadCollection: "Kolekce souborů",
            uploadCollectionDescription:
                "Vyberte kolekci, do které se budou ukládat nahrané soubory.",
            uploadFieldPlural: "Pole pro nahrání souborů",
            uploadFieldSingular: "Nahrání souboru",
        },
        "plugin-seo": {
            characterCount:
                "Počet znaků: {{current}}. Doporučený rozsah: {{minLength}}–{{maxLength}}. ",
            charactersLeftOver: "Zbývající počet znaků: {{characters}}",
            charactersToGo: "Chybějící počet znaků: {{characters}}",
            charactersTooMany: "Počet znaků nad limit: {{characters}}",
            checksPassing: "Splněné kontroly: {{current}}/{{max}}",
            good: "V pořádku",
            imageAutoGenerationTip:
                "Automatické generování použije vybraný úvodní obrázek.",
            lengthTipDescription:
                "Doporučený počet znaků: {{minLength}}–{{maxLength}}. Pro tvorbu kvalitního SEO popisu si přečtěte ",
            lengthTipTitle:
                "Doporučený počet znaků: {{minLength}}–{{maxLength}}. Pro tvorbu kvalitního SEO názvu si přečtěte ",
        },
    },
};
