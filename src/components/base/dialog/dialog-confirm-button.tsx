import { forwardRef } from 'react';
import { Check } from 'lucide-react';

import { Button, type ButtonProps } from '../button';

export const DialogConfirmButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    isError?: boolean;
  }
>(({ children, isError = false, isLoading, ...props }, ref) => (
  <Button
    ref={ref}
    color={isError ? 'error' : 'primary'}
    isLoading={isLoading}
    size="sm"
    iconLeft={{
      icon: <Check />
    }}
    {...props}
  >
    {children ?? 'Submit'}
  </Button>
));
