import {
    $getSelection,
    $isRangeSelection,
    $setSelection,
    type LexicalEditor,
    type RangeSelection,
} from "@payloadcms/richtext-lexical/lexical";
import { $patchStyleText } from "@payloadcms/richtext-lexical/lexical/selection";

export function applyTextColor(
    editor: LexicalEditor,
    savedSelection: RangeSelection,
    color: string | null,
) {
    editor.update(
        () => {
            // Inputs in the popup take focus away from the editor.
            $setSelection(savedSelection.clone());
            const selection = $getSelection();
            if ($isRangeSelection(selection))
                $patchStyleText(selection, { color });
        },
        { tag: "history-push" },
    );
}
