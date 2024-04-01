'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import {
  deleteProduct,
  toggleProductAvailability,
} from '../../_actions/products';
import { useRouter } from 'next/navigation';

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh(); // Refresh the page to show the updated product list.
        });
      }}
    >
      {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh(); // Refresh the page to show the updated product list.
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
