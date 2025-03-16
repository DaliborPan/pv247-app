'use client';

import { Link, QrCode as QrCodeIcon } from 'lucide-react';
import QrCode from 'react-qr-code';

import { Button } from '@/components/base/button';
import { Dialog } from '@/components/base/dialog';
import { type Lecture } from '@/db';
import { Icon } from '@/components/base/icon';

export const ShowAttendanceQrCodeAction = ({
  lecture
}: {
  lecture: Lecture;
}) => {
  const formattedAcceptAttendanceUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/accept-attendance/${lecture.attendanceToken}`
      : '';

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button
          variant="outline/primary"
          size="sm"
          iconLeft={{ icon: <QrCodeIcon /> }}
        />
      </Dialog.Trigger>

      <Dialog.Content size="6xl" title="Attendance QR Code">
        <Dialog.Header className="mb-10">
          <Dialog.Title className="text-center text-xl">
            Attendance QR Code
          </Dialog.Title>
        </Dialog.Header>

        <div className="flex flex-col items-center justify-center gap-6">
          <QrCode
            value={formattedAcceptAttendanceUrl}
            className="h-full w-1/2"
          />

          <span className="flex items-center gap-x-1 text-text-primary-color">
            <Icon icon={<Link />} className="mr-2" />
            {formattedAcceptAttendanceUrl}
          </span>
        </div>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline/primary">Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
