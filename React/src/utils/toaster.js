import React from 'react';
import { ToastMessage } from 'primereact/toast';
export const toasterRef = React.createRef();

export default class Toaster {
  /**
   * @param {ToastMessage} options
   */
  static show(options) {
    try {
      toasterRef.current.show(options);
    } catch (err) {
      console.log(err);
    }
  }
}
