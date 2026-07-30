'use client';

import { useState } from 'react';

// import { ProfilePasswordForm } from "../ProfilePasswordForm/ProfilePasswordForm"
import { HttpTypes } from '@medusajs/types';
import { Divider, Heading } from '@medusajs/ui';

import { Button } from '@/components/atoms';
import { Card } from '@/components/atoms/Card/Card';
import { InfoIcon } from '@/icons';
import { sendResetPasswordEmail } from '@/lib/data/customer';
import { Modal } from '@/modules/common/components';

export const ProfilePassword = ({ user }: { user: HttpTypes.StoreCustomer }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSendResetPasswordEmail = async () => {
    const res = await sendResetPasswordEmail(user.email);
    if (res.success) {
      setShowForm(false);
    }
  };

  return (
    <>
      <Card className="mt-8 flex items-center justify-between bg-secondary p-4">
        <Heading
          level="h2"
          className="heading-sm uppercase"
        >
          Password
        </Heading>
        <Button
          variant="tonal"
          className="flex items-center gap-2 font-semibold uppercase"
          onClick={() => setShowForm(true)}
        >
          Change password
        </Button>
      </Card>
      <Card className="p-0">
        <div className="p-4">
          <p className="label-md text-secondary">Current password</p>
          <p className="label-lg text-primary">****************</p>
        </div>
        <Divider />
        <div className="p-4">
          <p className="label-md flex items-center gap-4 text-secondary">
            <InfoIcon
              size={18}
              className="text-secondary"
            />
            Always remember to choose a unique password to protect your account.
          </p>
        </div>
      </Card>
      {showForm && (
        <Modal
          heading="Change password"
          onClose={() => setShowForm(false)}
        >
          <div className="flex justify-center p-4">
            <Button
              className="px-6 py-3 !font-semibold uppercase"
              onClick={handleSendResetPasswordEmail}
            >
              Send reset password email
            </Button>
          </div>
          {/* <ProfilePasswordForm user={user} /> */}
        </Modal>
      )}
    </>
  );
};
