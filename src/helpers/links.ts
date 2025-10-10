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
    key: 'dashboard.nav_links.transactions',
    path: '/dashboard/transactions',
    matches: [SCREENS.KYB_REQUIREMENTS],
  },
  {
    key: 'dashboard.nav_links.analytics',
    path: '/dashboard/analytics',
    matches: [
      '/dashboard/analytics/sales',
      '/dashboard/analytics/demographics',
      '/dashboard/analytics/payouts',
    ],
  },
  {
    key: 'dashboard.nav_links.retailers',
    path: '/dashboard/retailers',
  },
  {
    key: 'dashboard.nav_links.users_and_pos',
    matches: ['/dashboard/users', '/dashboard/pos'],
    path: '/dashboard/users',
  },
  {
    key: 'dashboard.nav_links.support',
    path: '/dashboard/support',
    matches: ['/dashboard/support', '/dashboard/support/feedback'],
    subMenu: [
      // { title: 'Online Chat', path: '/dashboard/support' },
      { key: 'dashboard.nav_links.ticket', path: '/dashboard/support' },
      {
        key: 'dashboard.nav_links.feedback',
        path: '/dashboard/support/feedback',
      },
    ],
    isContextMenu: true,
  },
];

export const walletLinks = [
  {
    key: 'dashboard.wallet_nav_links.convert_eur_to_est',
    subtitle_key: 'dashboard.wallet_nav_links.convert_eur_to_est_info',
    path: '/dashboard/wallet/convert-eur-to-est',
  },
  {
    key: 'dashboard.wallet_nav_links.convert_est_to_eur',
    subtitle_key: 'dashboard.wallet_nav_links.convert_est_to_eur_info',
    path: '/dashboard/wallet/convert-est-to-eur',
  },
  {
    key: 'dashboard.wallet_nav_links.send_est_to_others',
    subtitle_key: 'dashboard.wallet_nav_links.send_est_to_others_info',
    path: '/dashboard/wallet/send-est-to-other-wallet',
  },
  {
    key: 'dashboard.wallet_nav_links.receive_est_from_others',
    subtitle_key: 'dashboard.wallet_nav_links.receive_est_from_others_info',
    path: '/dashboard/wallet/receive-est',
  },
  {
    key: 'dashboard.wallet_nav_links.send_eur_to_others',
    subtitle_key: 'dashboard.wallet_nav_links.send_eur_to_others_info',
    path: '/dashboard/wallet/send-eur-to-other-iban',
  },
  {
    key: 'dashboard.wallet_nav_links.external_iban_friendly_names',
    subtitle_key:
      'dashboard.wallet_nav_links.external_iban_friendly_names_info',
    path: '/dashboard/wallet/external-iban',
  },
  {
    key: 'dashboard.wallet_nav_links.external_wallet_friendly_names',
    subtitle_key:
      'dashboard.wallet_nav_links.external_wallet_friendly_names_info',
    path: '/dashboard/wallet/external-wallet',
  },
  {
    key: 'dashboard.wallet_nav_links.my_iban',
    subtitle_key: 'dashboard.wallet_nav_links.my_iban_info',
    path: '/dashboard/wallet/my-iban',
  },
];

export const profileMgtLinks = [
  {
    icon: UserIcon,
    key: 'dashboard.profile_management.links.my_profile',
    path: '/dashboard/profile',
  },
  {
    icon: MailIcon,
    key: 'dashboard.profile_management.links.change_email',
    path: '/dashboard/profile/change-email',
  },
  {
    icon: PasswordIcon,
    key: 'dashboard.profile_management.links.change_password',
    path: '/dashboard/profile/change-password',
  },
  {
    icon: MobileIcon,
    key: 'dashboard.profile_management.links.change_mobile',
    path: '/dashboard/profile/change-mobile',
  },
  {
    icon: KybIcon,
    key: 'dashboard.profile_management.links.kyb',
    path: '/dashboard/profile/kyb',
  },
];

export const profileLinks = [
  {
    icon: UserIcon,
    key: 'dashboard.profile_nav_links.my_profile',
    subtitle_key: 'dashboard.profile_nav_links.my_profile_info',
    path: '/dashboard/profile',
  },
  {
    icon: IntegrationIcon,
    key: 'dashboard.profile_nav_links.integrations',
    subtitle_key: 'dashboard.profile_nav_links.integrations_info',
    path: '/dashboard/integrations',
  },
  {
    icon: MarketingIcon,
    key: 'dashboard.profile_nav_links.marketing',
    subtitle_key: 'dashboard.profile_nav_links.marketing_info',
    path: '/dashboard/analytics',
  },
  {
    icon: MarketingIcon,
    key: 'dashboard.profile_nav_links.merchants',
    subtitle_key: 'dashboard.profile_nav_links.merchants_info',
    path: '/dashboard/retailers',
  },
  {
    icon: AgreementIcon,
    key: 'dashboard.profile_nav_links.our_agreements',
    subtitle_key: 'dashboard.profile_nav_links.our_agreements_info',
    path: SCREENS.TERMS_AND_CONDITIONS,
  },
  { icon: LogoutIcon, key: 'logout', path: SCREENS.LOGIN },
];

export const mobileNavLinks = [
  {
    key: 'dashboard.nav_links.dashboard',
    path: '/dashboard',
  },
  {
    key: 'dashboard.nav_links.transactions',
    path: '/dashboard/transactions',
  },
  {
    key: 'dashboard.nav_links.analytics',
    path: '/dashboard/analytics',
    matches: [
      '/dashboard/analytics/sales',
      '/dashboard/analytics/demographics',
      '/dashboard/analytics/payouts',
    ],
  },
  {
    key: 'dashboard.nav_links.retailers',
    path: '/dashboard/retailers',
  },
  {
    key: 'dashboard.nav_links.users_and_pos',
    matches: ['/dashboard/users', '/dashboard/pos'],
    path: '/dashboard/users',
  },
];

export const mobileLinks: MobileLink[] = [
  {
    groupTitleKey: '',
    list: [...mobileNavLinks],
  },
  {
    groupTitleKey: 'dashboard.nav_links.wallet',
    list: walletLinks,
  },
  {
    groupTitleKey: 'dashboard.nav_links.profile_mgt',
    list: profileMgtLinks,
  },
  {
    groupTitleKey: 'dashboard.nav_links.support',
    list: [
      // { title: 'Online Chat', path: '/dashboard/support' },
      { key: 'dashboard.nav_links.ticket', path: '/dashboard/support' },
      {
        key: 'dashboard.nav_links.feedback',
        path: '/dashboard/support/feedback',
      },
    ],
  },
];
