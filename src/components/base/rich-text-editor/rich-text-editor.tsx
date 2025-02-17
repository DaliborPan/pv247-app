/* eslint-disable import/no-named-as-default */
import './rich-text-editor.css';

import { Portal } from '@radix-ui/react-portal';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/cn';

import { PageBreakExtension } from './extensions/page-break/extension';
import { RichTextEditorToolbar } from './rich-text-editor-toolbar';

export type RichTextEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
};

const useRichTextEditor = ({
  value,
  onChange,
  disabled
}: Omit<RichTextEditorProps, 'className' | 'wrapperClassName'>) =>
  useEditor(
    {
      editable: !disabled,
      extensions: [
        PageBreakExtension,
        StarterKit,
        Underline,
        Placeholder.configure({
          placeholder: disabled ? '' : 'Začněte psát...'
        }),
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({
          types: ['heading', 'paragraph']
        })
      ],
      editorProps: {
        attributes: {
          class: 'focus:outline-none prose max-w-none'
        }
      },
      onUpdate: ({ editor }) => {
        onChange?.(editor.getText() ? editor.getHTML() : '');
      },
      content: value
      // injectCSS: false,
    },
    [disabled]
  );

const RichTextEditorComponent = (
  props: RichTextEditorProps & {
    editor: Editor | null;
    fullscreen: boolean;
    setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  }
) => {
  const {
    editor,
    fullscreen,
    setFullscreen,
    disabled,
    className,
    wrapperClassName
  } = props;

  return (
    <div className="prose relative max-w-none">
      {editor && (
        <div
          className={cn(
            'w-full rounded-[3px] bg-primary-100 px-4 pb-4 pt-2',
            disabled && 'py-4',
            wrapperClassName,
            {
              'fixed left-0 top-0 z-[9999] h-full': fullscreen
            }
          )}
        >
          {!disabled && (
            <RichTextEditorToolbar
              editor={editor}
              fullscreen={fullscreen}
              setFullscreen={setFullscreen}
            />
          )}

          <div
            className={cn(
              'max-h-96 min-h-24 overflow-y-scroll',
              disabled && 'no-scrollbar',
              className,
              {
                '!max-h-[calc(100%_-_44px)]': fullscreen
              }
            )}
          >
            <EditorContent editor={editor} disabled />
          </div>
        </div>
      )}
    </div>
  );
};

export const RichTextEditor = (props: RichTextEditorProps) => {
  const [fullscreen, setFullscreen] = useState(false);

  const editor = useRichTextEditor(props);

  const editorComponent = useMemo(
    () => (
      <RichTextEditorComponent
        {...props}
        editor={editor}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
    ),
    [props, editor, fullscreen, setFullscreen]
  );

  return (
    <div className="prose relative max-w-none">
      {fullscreen && <Portal>{editorComponent}</Portal>}
      {!fullscreen && editorComponent}
    </div>
  );
};
