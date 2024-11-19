import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { PageBreakComponent } from './component';

export const PageBreakExtension = Node.create({
  name: 'pageBreakExtension',

  group: 'block',

  atom: true,

  parseHTML: () => [
    {
      tag: 'div',
      attrs: {
        'data-page-break': true
      }
    }
  ],

  renderHTML: ({ HTMLAttributes }) => [
    'div',
    mergeAttributes({
      ...HTMLAttributes,
      'data-page-break': true,
      'style':
        'line-height: 100%; margin-bottom: 0mm; page-break-before: always'
    })
  ],

  addNodeView: () => ReactNodeViewRenderer(PageBreakComponent)
});
