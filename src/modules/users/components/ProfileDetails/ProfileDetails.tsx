'use client';

import { useState } from 'react';

import { PencilSquare } from '@medusajs/icons';
import { HttpTypes } from '@medusajs/types';
import { Divider, Heading } from '@medusajs/ui';

import { Button, Card } from '@/components/atoms';
import { Modal } from '@/modules/common/components';

import { ProfileDetailsForm } from '../../forms/ProfileDetailsForm/ProfileDetailsForm';

export const ProfileDetails = ({ user }: { user: HttpTypes.StoreCustomer }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Card
        className="flex items-center justify-between bg-secondary p-4"
        data-testid="profile-details-header"
      >
        <Heading
          level="h2"
          className="heading-sm uppercase"
          data-testid="profile-details-heading"
        >
          Profile details
        </Heading>
        <Button
          variant="tonal"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 font-semibold uppercase"
          data-testid="profile-edit-button"
        >
          <PencilSquare />
          Edit details
        </Button>
      </Card>
      <Card
        className="p-0"
        data-testid="profile-details-info"
      >
        <div
          className="p-4"
          data-testid="profile-name"
        >
          <p
            className="label-md text-secondary"
            data-testid="profile-name-label"
          >
            Name
          </p>
          <p
            className="label-lg text-primary"
            data-testid="profile-name-value"
          >
            {`${user.first_name} ${user.last_name}`}
          </p>
        </div>
        <Divider />
        <div
          className="p-4"
          data-testid="profile-email"
        >
          <p
            className="label-md text-secondary"
            data-testid="profile-email-label"
          >
            Email
          </p>
          <p
            className="label-lg text-primary"
            data-testid="profile-email-value"
          >
            {user.email}
          </p>
        </div>
        <Divider />
        <div
          className="p-4"
          data-testid="profile-phone"
        >
          <p
            className="label-md text-secondary"
            data-testid="profile-phone-label"
          >
            Phone number
          </p>
          <p
            className="label-lg text-primary"
            data-testid="profile-phone-value"
          >
            {user.phone}
          </p>
        </div>
      </Card>
      {showForm && (
        <Modal
          heading="Edit profile details"
          onClose={() => setShowForm(false)}
        >
          <ProfileDetailsForm
            handleClose={() => setShowForm(false)}
            defaultValues={{
              firstName: user.first_name || '',
              lastName: user.last_name || '',
              phone: user.phone || '',
              email: user.email || ''
            }}
          />
        </Modal>
      )}
    </>
  );
};
