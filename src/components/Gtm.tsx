import type { GtmPropsType } from './gtm.type';

/**
 * Builds Google Tag Manager bootstrap script content.
 */
const createGtmBootstrapScript = ({ containerId }: GtmPropsType): string => {
  return `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${containerId}');
`;
};

/**
 * Renders Google Tag Manager script for document head.
 */
export const GtmScript = ({ containerId }: GtmPropsType) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: createGtmBootstrapScript({ containerId }),
      }}
    />
  );
};

/**
 * Renders Google Tag Manager noscript iframe fallback.
 */
export const GtmNoScript = ({ containerId }: GtmPropsType) => {
  return (
    <noscript>
      <iframe
        height="0"
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        style={{ display: 'none', visibility: 'hidden' }}
        title="gtm"
        width="0"
      />
    </noscript>
  );
};
