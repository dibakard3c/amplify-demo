import {
  compareIgnoreCase,
  formatCurrency,
  formatNumber,
} from '@estia/utils/general';
import { InAppNotification } from '@estia/typings/notifications';

export function buildMessage(notification: InAppNotification) {
  const { type, status, amountSent, amountReceived } = notification;

  // EUR to EST  → only show a notification when the transaction is completed successfully or failed
  //
  // Success Notification
  // Header : EUR to EST
  // Notification Text: "Conversion Successful. You have received <amount> EST."
  //
  // Failed Notification
  // Header : EUR to EST
  // Notification Text: "Conversion Failed. We couldn’t convert your EUR <amount>. Please try again."
  //
  //
  // EST to EUR → only show a notification when the transaction is completed successfully or with error
  //
  //   Success Notification
  // Header : EST to EUR
  // Notification Text: "Conversion Successful. You have received <amount> EUR."
  //
  // Failed Notification
  // Header : EST to EUR
  // Notification Text: "Conversion Failed. We couldn’t convert your EST <amount>. Please try again."
  //
  // Sent EST to Other Wallets → only show a notification when the transaction is completed successfully or with error
  //
  //   Success Notification
  // Header : Sent EST to wallet
  // Notification Text: "Transfer Successful. <amount> EST has been sent."
  //
  // Failed Notification
  // Header : Sent EST to wallet
  // Notification Text: "Transfer Unsuccessful. We couldn’t complete your transfer of <amount> EST. Please try again."

  if (compareIgnoreCase(type, 'EUR to EST')) {
    if (compareIgnoreCase(status, 'SUCCESS')) {
      return `Conversion successful. You have received EST ${formatNumber(amountReceived)}`;
    } else if (compareIgnoreCase(status, 'PENDING')) {
      return `Conversion in progress. You will receive EUR ${formatNumber(amountReceived)}`;
    } else {
      return `Conversion failed. We couldn’t convert your ${formatNumber(amountReceived)}. Please try again.`;
    }
  }

  if (compareIgnoreCase(type, 'EST to EUR')) {
    if (compareIgnoreCase(status, 'SUCCESS')) {
      return `Conversion successful. You have received ${formatNumber(amountReceived)}`;
    } else if (compareIgnoreCase(status, 'PENDING')) {
      return `Conversion in progress. You will receive ${formatNumber(amountReceived)}`;
    } else {
      return `Conversion failed. We couldn’t convert your EST ${formatNumber(amountReceived)}. Please try again.`;
    }
  }

  if (compareIgnoreCase(type, 'Sent EST to wallet')) {
    if (compareIgnoreCase(status, 'SUCCESS')) {
      return `Transfer successful. EST ${formatNumber(amountSent)} has been sent.`;
    } else if (compareIgnoreCase(status, 'PENDING')) {
      return `Transfer in progress. EST ${formatNumber(amountSent)} will be sent.`;
    } else {
      return `Transfer failed. We couldn’t complete your transfer of EST ${formatNumber(amountSent)}. Please try again.`;
    }
  }

  if (compareIgnoreCase(type, 'Sent Euro to bank beneficiary')) {
    if (compareIgnoreCase(status, 'SUCCESS')) {
      return `Transfer successful. ${formatCurrency(amountSent)} has been sent.`;
    } else if (compareIgnoreCase(status, 'PENDING')) {
      return `Transfer successful. ${formatCurrency(amountSent)} will be sent.`;
    } else {
      return `Transfer failed. We couldn’t complete your transfer of ${formatCurrency(amountSent)}. Please try again.`;
    }
  }
}
