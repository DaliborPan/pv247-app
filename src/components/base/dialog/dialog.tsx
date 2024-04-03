import { Root } from '@radix-ui/react-dialog';
import React from 'react';

import { DialogCancelButton } from './dialog-cancel-button';
import { DialogClose } from './dialog-close';
import { DialogConfirmButton } from './dialog-confirm-button';
import { DialogContent } from './dialog-content';
import { DialogFooter } from './dialog-footer';
import { DialogHeader } from './dialog-header';
import { DialogSubtitle } from './dialog-subtitle';
import { DialogTitle } from './dialog-title';
import { DialogTrigger } from './dialog-trigger';

const Dialog = (props: React.ComponentProps<typeof Root>) => (
	<Root {...props} />
);

Dialog.Content = DialogContent;
Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogClose;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Subtitle = DialogSubtitle;

Dialog.CancelButton = DialogCancelButton;
Dialog.ConfirmButton = DialogConfirmButton;

export { Dialog };
