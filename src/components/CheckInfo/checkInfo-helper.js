export const formTextInfo = (confirmationStatus) => {
  if (confirmationStatus === 'success') {
    return {
      status: 'success',
      title: 'Ready!',
      subtitle: 'Account has been confirmed',
    };
  } else if (confirmationStatus === 'error') {
    return {
      status: 'error',
      title: 'Error',
      subtitle: 'The hash doesnt exist or it is invalid',
    };
  } else {
    return {
      status: 'info',
      title: 'Confirm your E-mail',
      subtitle: 'The link with confirmation has been sent to your email',
    };
  }
};
