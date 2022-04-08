import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnected = isNetworkConnected => {
    NetInfo.fetch()
      .then(state => {
        isNetworkConnected(state.isConnected);
      })
      .catch(() => {
        isNetworkConnected(false);
      });
  },
  isEmailValid = emailField => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
      return false;
    }
    return true;
  };
