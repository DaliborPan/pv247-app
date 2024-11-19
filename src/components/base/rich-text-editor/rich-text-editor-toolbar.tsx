import { type Editor } from '@tiptap/react';
import { forwardRef, useCallback } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  Strikethrough,
  Underline
} from 'lucide-react';

import { Button, type ButtonProps } from '../button';

type ToolbarButtonProps = ButtonProps & {
  active?: boolean;
};

const ToolbarButton = forwardRef(
  (
    { disabled, ...props }: ToolbarButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <Button
      ref={ref}
      type="button"
      tabIndex={-1}
      size="xs"
      variant="primary"
      disabled={disabled}
      {...props}
    />
  )
);

const ToolbarSeparator = () => (
  <span className="inline-block w-px mx-1.5 bg-gray-300 h-4" />
);

type ToolbarProps = {
  editor: Editor;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RichTextEditorToolbar = ({
  editor,
  fullscreen,
  setFullscreen
}: ToolbarProps) => {
  const undo = useCallback(() => {
    editor.chain().focus().undo().run();
  }, [editor]);

  const redo = useCallback(() => {
    editor.chain().focus().redo().run();
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  // const addHardBreak = useCallback(() => {
  //   editor.chain().focus().setHardBreak().run();
  // }, [editor]);

  // const addPageBreak = useCallback(() => {
  //   editor
  //     .chain()
  //     .focus()
  //     .insertContent({
  //       type: 'pageBreakExtension'
  //     })
  //     .run();
  // }, [editor]);

  // const toggleHeading = useCallback(
  //   (level: 1 | 2 | 3 | 4) => {
  //     editor.chain().focus().toggleHeading({ level }).run();
  //   },
  //   [editor]
  // );

  const setAlignment = useCallback(
    (textAlign: 'left' | 'center' | 'right' | 'justify') => {
      editor.chain().focus().setTextAlign(textAlign).run();
    },
    [editor]
  );

  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  // const liftListItem = useCallback(() => {
  //   editor.chain().focus().liftListItem('listItem').run();
  // }, [editor]);

  // const sinkListItem = useCallback(() => {
  //   editor.chain().focus().sinkListItem('listItem').run();
  // }, [editor]);

  // const colorizeItem = useCallback(
  //   (color: string) => {
  //     editor.chain().focus().toggleHighlight({ color }).run();
  //   },
  //   [editor]
  // );

  return (
    <div className="flex flex-wrap items-center w-full pb-3 gap-x-1">
      <ToolbarButton
        active={fullscreen}
        onClick={() => {
          setFullscreen(f => !f);
        }}
        iconLeft={{ icon: fullscreen ? <Minimize2 /> : <Maximize2 /> }}
      />

      <ToolbarSeparator />

      <ToolbarButton
        onClick={undo}
        disabled={!editor.can().undo()}
        iconLeft={{ icon: <RotateCcw /> }}
      />
      <ToolbarButton
        onClick={redo}
        disabled={!editor.can().redo()}
        iconLeft={{ icon: <RotateCw /> }}
      />

      <ToolbarSeparator />

      {/* <ToolbarButton
        onClick={addHardBreak}
        iconLeft={{
          icon: <WrapText />
        }}
      />

      <ToolbarButton
        onClick={addPageBreak}
        iconLeft={{
          icon: <BetweenHorizontalEnd />
        }}
      />

      <ToolbarSeparator /> */}

      {/* <ToolbarButton
        active={editor.isActive('heading', { level: 1 })}
        onClick={() => toggleHeading(1)}
        iconLeft={{ icon: <Heading1 /> }}
      />
      <ToolbarButton
        active={editor.isActive('heading', { level: 2 })}
        onClick={() => toggleHeading(2)}
        iconLeft={{ icon: <Heading2 /> }}
      />
      <ToolbarButton
        active={editor.isActive('heading', { level: 3 })}
        onClick={() => toggleHeading(3)}
        iconLeft={{ icon: <Heading3 /> }}
      />
      <ToolbarButton
        active={editor.isActive('heading', { level: 4 })}
        onClick={() => toggleHeading(4)}
        iconLeft={{ icon: <Heading4 /> }}
      />

      <ToolbarSeparator /> */}

      <ToolbarButton
        active={editor.isActive('bold')}
        onClick={toggleBold}
        iconLeft={{ icon: <Bold /> }}
      />
      <ToolbarButton
        active={editor.isActive('italic')}
        onClick={toggleItalic}
        iconLeft={{ icon: <Italic /> }}
      />
      <ToolbarButton
        active={editor.isActive('underline')}
        onClick={toggleUnderline}
        iconLeft={{ icon: <Underline /> }}
      />
      <ToolbarButton
        active={editor.isActive('strike')}
        onClick={toggleStrike}
        iconLeft={{ icon: <Strikethrough /> }}
      />

      <ToolbarSeparator />

      <ToolbarButton
        active={editor.isActive({ textAlign: 'left' })}
        onClick={() => setAlignment('left')}
        iconLeft={{ icon: <AlignLeft /> }}
      />
      <ToolbarButton
        active={editor.isActive({ textAlign: 'center' })}
        onClick={() => setAlignment('center')}
        iconLeft={{ icon: <AlignCenter /> }}
      />
      <ToolbarButton
        active={editor.isActive({ textAlign: 'right' })}
        onClick={() => setAlignment('right')}
        iconLeft={{ icon: <AlignRight /> }}
      />
      {/* <ToolbarButton
        active={editor.isActive({ textAlign: 'justify' })}
        onClick={() => setAlignment('justify')}
        iconLeft={{ icon: <AlignJustify /> }}
      /> */}

      <ToolbarSeparator />

      <ToolbarButton
        active={editor.isActive('bulletList')}
        onClick={toggleBulletList}
        disabled={editor.isActive('orderedList')}
        iconLeft={{ icon: <List /> }}
      />
      <ToolbarButton
        active={editor.isActive('orderedList')}
        onClick={toggleOrderedList}
        disabled={editor.isActive('bulletList')}
        iconLeft={{ icon: <ListOrdered /> }}
      />
      {/* <ToolbarButton
        onClick={liftListItem}
        iconLeft={{ icon: <ArrowUp /> }}
        disabled={!editor.can().liftListItem('listItem')}
      />
      <ToolbarButton
        onClick={sinkListItem}
        iconLeft={{ icon: <ArrowDown /> }}
        disabled={!editor.can().sinkListItem('listItem')}
      />

      <ToolbarSeparator /> */}

      {/* <ToolbarButton
        active={editor.isActive('highlight', { color: '#ffa8a8' })}
        onClick={() => colorizeItem('#ffa8a8')}
      >
        <span className="w-4 h-4 rounded-full bg-[#ffa8a8]" />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive('highlight', { color: '#faf594' })}
        onClick={() => colorizeItem('#faf594')}
      >
        <span className="w-4 h-4 rounded-full bg-[#faf594]" />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive('highlight', { color: '#8ce99a' })}
        onClick={() => colorizeItem('#8ce99a')}
      >
        <span className="w-4 h-4 rounded-full bg-[#8ce99a]" />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive('highlight', { color: '#CBC3E3' })}
        onClick={() => colorizeItem('#CBC3E3')}
      >
        <span className="w-4 h-4 rounded-full bg-[#CBC3E3]" />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive('highlight', { color: '#FBCEB1' })}
        onClick={() => colorizeItem('#FBCEB1')}
      >
        <span className="w-4 h-4 rounded-full bg-[#FBCEB1]" />
      </ToolbarButton> */}
    </div>
  );
};
