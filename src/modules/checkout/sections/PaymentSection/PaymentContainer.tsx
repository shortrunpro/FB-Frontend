import React from 'react';

import AuthnetForm from './AuthnetForm';

type PaymentContainerProps = {
  clientKey: string;
  loginId: string;
  cart: any;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({ clientKey, loginId, cart }) => {
  return (
    <div className="my-4">
      <AuthnetForm
        cart={cart}
        apiLoginID={loginId}
        clientKey={clientKey}
      />
    </div>
  );
};

export default PaymentContainer;
