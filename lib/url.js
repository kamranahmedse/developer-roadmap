import queryString from 'query-string';
import siteConfig from 'storage/site';

export const prefixHost = (url) => {
  return /^\//.test(url) ? `${siteConfig.url}${url}` : url;
};

export const getTwitterUrl = (username) => {
  return `https://twitter.com/${username}`;
};

export const getTwitterShareUrl = ({ text, url }) => {
  const urlToShare = `${prefixHost(url)}?${queryString.stringify({
    utm_source: 'roadmap.sh',
    utm_campaign: 'share',
    utm_medium: 'twitter',
  })}`;

  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURI(urlToShare)}`;
};

export const getFacebookShareUrl = ({ text, url }) => {
  const urlToShare = `${prefixHost(url)}?${queryString.stringify({
    utm_source: 'roadmap.sh',
    utm_campaign: 'share',
    utm_medium: 'facebook',
  })}`;

  return `https://www.facebook.com/sharer/sharer.php?quote=${text}&u=${encodeURI(urlToShare)}`;
};

export const getRedditShareUrl = ({ text, url }) => {
  const urlToShare = `${prefixHost(url)}?${queryString.stringify({
    utm_source: 'roadmap.sh',
    utm_campaign: 'share',
    utm_medium: 'reddit'
  })}`;

  return `https://www.reddit.com/submit?title=${text}&url=${encodeURI(urlToShare)}`;
};

export const getHnShareUrl = ({ text, url }) => {
  const urlToShare = `${prefixHost(url)}?${queryString.stringify({
    utm_source: 'roadmap.sh',
    utm_campaign: 'share',
    utm_medium: 'hn'
  })}`;

  return `https://news.ycombinator.com/submitlink?t=${text}&u=${urlToShare}`;
};
