import envConfig from 'lib/env-config';

export const convertTitleToHashTitle = (title: string, prefix = '') => {
  return prefix + title.replaceAll(' ', '-').toLowerCase();
};

export const convertToAbsoluteUrl = (url?: string) => {
  const baseUrl = envConfig.SitecoreApiUrl;
  if (url?.startsWith('/')) {
    return baseUrl + url;
  }
  return url;
};

export const replaceColorTags = (text: string) => {
  // Replace #green#...#green# with <div className="text-primary-green">...</div>
  text = text.replace(/#green#(.*?)#green#/g, '<span class="text-special-success">$1</span>');
  // Replace #red#...#red# with <div className="text-primary-red">...</div>
  text = text.replace(/#red#(.*?)#red#/g, '<span class="text-special-error">$1</span>');
  return text;
};
