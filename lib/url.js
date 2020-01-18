import siteConfig from 'content/site';

export const prefixHost = (url) => {
  // if it starts with forward slash then prefix site URL
  // @todo proper handling of full URLs and trailing slashes
  return /^\//.test(url) ? `${siteConfig.url.web}${url}` : url;
};

export const getTwitterUrl = (username) => {
  return `https://twitter.com/${username}`;
};

export const getTwitterShareUrl = ({ text, url }) => {
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURI(prefixHost(url))}`;
};

export const getFacebookShareUrl = ({ text, url }) => {
  return `https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${encodeURI(prefixHost(url))}`;
};

export const getRedditShareUrl = ({ text, url }) => {
  return `https://www.reddit.com/submit?title=${text}&url=${encodeURI(prefixHost(url))}`;
};

export const getHnShareUrl = ({ text, url }) => {
  return `https://news.ycombinator.com/submitlink?t=${text}&u=${prefixHost(url)}`;
};
