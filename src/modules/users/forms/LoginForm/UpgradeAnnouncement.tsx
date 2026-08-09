export const UpgradeAnnouncement = () => {
  return (
    <div className="label-lg-medium flex flex-col gap-y-4">
      <span>
        We've recently upgraded our website to provide our users a better shopping experience.
      </span>
      <span className="text-yellow-600">
        If you had an account on our previous website, you'll need to reset your password before
        signing in for the first time here.
      </span>
      <span>
        Your account information has been transferred, but for security reasons, your previous
        password cannot be used.
      </span>
      <span>
        Click "Forgot Your Password?" and enter the email address associated with your account.
        We'll send you a link to create a new password.
      </span>
      <span>
        Thank you for your patience, and <b>welcome to our new and improved website!</b>
      </span>
    </div>
  );
};
