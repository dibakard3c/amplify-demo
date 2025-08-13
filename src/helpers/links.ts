import {
  AgreementIcon,
  IntegrationIcon,
  KybIcon,
  LogoutIcon,
  MailIcon,
  MarketingIcon,
  MobileIcon,
  PasswordIcon,
  UserIcon,
} from '@estia/assets';
import { SCREENS } from '@estia/constants/screens';
import { MobileLink } from '@estia/typings/nav-links';

export const navbarLinks = [
  // {
  //   title: 'Dashboard',
  //   path: '/dashboard',
  // },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    matches: [
      '/dashboard/analytics/sales',
      '/dashboard/analytics/demographics',
      '/dashboard/analytics/payouts',
    ],
  },
  {
    title: 'Retailers',
    path: '/dashboard/retailers',
  },
  {
    title: 'Users & POS',
    matches: ['/dashboard/users', '/dashboard/pos'],
    path: '/dashboard/users',
  },
  {
    title: 'Support',
    path: '/dashboard/support',
    matches: ['/dashboard/support', '/dashboard/support/feedback'],
    subMenu: [
      { title: 'Online Chat', path: '/dashboard/support' },
      { title: 'Ticket', path: '/dashboard/support' },
      { title: 'Feedback', path: '/dashboard/support/feedback' },
    ],
    isContextMenu: true,
  },
];

export const walletLinks = [
  {
    title: 'Convert EUR to EST',
    subtitle: 'Exchange € for EST tokens effortlessly',
    path: '/dashboard/wallet/convert-eur-to-est',
  },
  {
    title: 'Convert EST to EUR',
    subtitle: 'Easily convert your EST tokens into €',
    path: '/dashboard/wallet/convert-est-to-eur',
  },
  {
    title: 'Send EST to other Wallets',
    subtitle: 'Transfer EST tokens to external wallets',
    path: '/dashboard/wallet/send-est-to-other-wallet',
  },
  {
    title: 'Receive EST from other Wallets',
    subtitle: 'Show wallet information so others can send you EST coins',
    path: '/dashboard/wallet/receive-est',
  },
  {
    title: 'Send EUR to other IBAN',
    subtitle: 'Transfer € to External IBAN friendly names',
    path: '/dashboard/wallet/send-eur-to-other-iban',
  },
  {
    title: 'External IBAN friendly names',
    subtitle:
      'Effortlessly save and manage your External IBAN friendly names with personalized labels for quick and easy access',
    path: '/dashboard/wallet/external-iban',
  },
  {
    title: 'External Wallets friendly names',
    subtitle:
      'Effortlessly save and manage your External Wallet friendly names with personalized labels for quick and easy access',
    path: '/dashboard/wallet/external-wallet',
  },
  {
    title: 'My IBAN',
    subtitle: 'Total control of your IBAN account',
    path: '/dashboard/wallet/my-iban',
  },
];

export const profileMgtLinks = [
  {
    icon: UserIcon,
    title: 'My Profile',
    path: '/dashboard/profile',
  },
  {
    icon: MailIcon,
    title: 'Change Email',
    path: '/dashboard/profile/change-email',
  },
  {
    icon: PasswordIcon,
    title: 'Change Password',
    path: '/dashboard/profile/change-password',
  },
  {
    icon: MobileIcon,
    title: 'Change Mobile',
    path: '/dashboard/profile/change-mobile',
  },
  {
    icon: KybIcon,
    title: 'ΚΥΒ - Know Your Business',
    path: '/dashboard/profile/kyb',
  },
];

export const profileLinks = [
  {
    icon: UserIcon,
    title: 'My Profile',
    subtitle: 'Important account details',
    path: '/dashboard/profile',
  },
  {
    icon: IntegrationIcon,
    title: 'Integrations',
    subtitle:
      'Information about the Estia Payment plug-ins for various e-shops',
    path: '/dashboard/integrations',
  },
  {
    icon: MarketingIcon,
    title: 'Marketing',
    subtitle: 'Insights for all your  marketing campaigns',
    path: '/dashboard/analytics',
  },
  {
    icon: MarketingIcon,
    title: 'Merchants',
    subtitle: 'Check out our merchants list',
    path: '/dashboard/retailers',
  },
  {
    icon: AgreementIcon,
    title: 'Our Agreements',
    subtitle: 'User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent',
    path: 'https://estiapayments.io/estia-payments-s-m-p-c-privacy-policy',
  },
  { icon: LogoutIcon, title: 'Log out', path: SCREENS.LOGIN },
];

export const mobileNavLinks = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    matches: [
      '/dashboard/analytics/sales',
      '/dashboard/analytics/demographics',
      '/dashboard/analytics/payouts',
    ],
  },
  {
    title: 'Retailers',
    path: '/dashboard/retailers',
  },
  {
    title: 'Users & POS',
    matches: ['/dashboard/users', '/dashboard/pos'],
    path: '/dashboard/users',
  },
];

export const mobileLinks: MobileLink[] = [
  {
    groupTitle: '',
    list: [...mobileNavLinks],
  },
  {
    groupTitle: 'Wallet',
    list: walletLinks,
  },
  {
    groupTitle: 'Profile Management',
    list: profileMgtLinks,
  },
  {
    groupTitle: 'Support',
    list: [
      // { title: 'Online Chat', path: '/dashboard/support' },
      { title: 'Ticket', path: '/dashboard/support' },
      { title: 'Feedback', path: '/dashboard/support/feedback' },
    ],
  },
];
