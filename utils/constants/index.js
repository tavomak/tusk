export const siteName = 'Tuskcontent';

export const siteUrl = 'https://tuskcontent.com';
export const siteEmail = 'infotusk@tuskcontent.com';

export const navItems = [
  {
    label: 'nav_homepage_title',
    path: '/',
    children: false,
    visible: true,
  },
  {
    label: 'nav_about_title',
    path: '/about',
    children: false,
    visible: true,
  },
  {
    label: 'nav_projects_title',
    path: '/projects',
    children: false,
    visible: true,
  },
  {
    label: 'nav_our_team_title',
    path: '/team',
    visible: false,
    children: [
      {
        label: 'nav_team_title',
        path: '/team',
      },
      {
        label: 'nav_filmmakers_title',
        path: '/filmmakers',
      },
    ],
  },
  {
    label: 'nav_contact_title',
    path: '/contact',
    children: false,
    visible: true,
  },
];

export const socialMedia = {
  linkedin: 'https://www.linkedin.com/company/tuskcontent',
  instagram: 'https://www.instagram.com/tusk.content/',
};

export const environments = {
  production: 'production',
  development: 'development',
};

export const flagIconsMapping = {
  en: 'eng',
  es: 'spa',
};

export const languages = {
  en: 'en',
  es: 'es',
};
