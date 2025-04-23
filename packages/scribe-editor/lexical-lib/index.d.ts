import { ForwardRefExoticComponent } from 'react';
import { immutableNoteCallerNodeName } from 'shared-react/nodes/scripture/usj/ImmutableNoteCallerNode';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { RefAttributes } from 'react';
import { ScriptureReference } from 'shared/utils/get-marker-action.model';
import { Usj } from '@biblionexus-foundation/scripture-utilities';
import { UsjNodeOptions } from 'shared-react/nodes/scripture/usj/usj-node-options.model';

export declare const DEFAULT_VIEW_MODE = "formatted";

export declare const Editor: ForwardRefExoticComponent<EditorProps & RefAttributes<EditorRef>>;

/** Options to configure the editor. */
export declare type EditorOptions = {
    /** Is the editor readonly or editable. */
    isReadonly?: boolean;
    /** Is the editor enabled for spell checking. */
    hasSpellCheck?: boolean;
    /** View options. */
    view?: ViewOptions;
    /** Options for each editor node:
     * @param nodes[].noteCallers - Possible note callers to use when caller is '+' for
     *   ImmutableNoteCallerNode.
     * @param nodes[].onClick - Click handler method for ImmutableNoteCallerNode.
     */
    nodes?: UsjNodeOptions;
};

declare type EditorProps = {
    /** Scripture data in USJ form */
    usjInput?: Usj;
    onChange?: (usj: Usj) => void;
    viewOptions?: ViewOptions;
    nodeOptions?: UsjNodeOptions;
    scrRef: ScriptureReference;
    setScrRef: React.Dispatch<React.SetStateAction<ScriptureReference>>;
    scope?: Scope;
};

/** Forward reference for the editor. */
export declare type EditorRef = {
    /** Method to focus the editor. */
    focus(): void;
    /** Method to set the USJ Scripture data. */
    setUsj(usj: Usj): void;
};

/**
 * Get view option properties based on the view mode.
 * @param viewMode - View mode of the editor.
 * @returns the view options if the view exists, the default options if the viewMode is undefined,
 *   `undefined` otherwise.
 */
export declare function getViewOptions(viewMode?: string | undefined): ViewOptions | undefined;

export { immutableNoteCallerNodeName }

export declare function ReadOnlyEditor({ usjInput, viewOptions, }: {
    usjInput?: Usj;
    viewOptions?: ViewOptions;
}): JSX_2.Element;

/** Forward reference for the editor. */
export declare type ReadOnlyEditorRef = {
    /** Method to set the USJ Scripture data. */
    setUsj(usj: Usj): void;
};

declare interface Scope {
    availableBooks: Set<string>;
}

export { UsjNodeOptions }

export declare type ViewMode = ViewNameKey;

declare const viewModeToViewNames: {
    formatted: string;
    unformatted: string;
};

declare type ViewNameKey = keyof typeof viewModeToViewNames;

export declare type ViewOptions = {
    /** USFM markers are visible, editable or hidden */
    markerMode: "visible" | "editable" | "hidden";
    /** does the text have spacing including indenting */
    hasSpacing: boolean;
    /** is the text in a formatted font */
    isFormattedFont: boolean;
};

/**
 * Convert view options to view mode if the view exists.
 * @param viewOptions - View options of the editor.
 * @returns the view mode if the view is defined, `undefined` otherwise.
 */
export declare function viewOptionsToMode(viewOptions: ViewOptions | undefined): ViewMode | undefined;

export { }
