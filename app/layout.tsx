import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Lab - Criando Aplicações de IA de Forma Profissional',
  description: 'Aprenda na prática a desenvolver soluções avançadas com LLM, RAG e Agentes usando ferramentas como CrewAI, langGraph, composio e Open Research.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>
        
        {/* Facebook Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
        
        {/* UTM Tracking Script */}
        <Script id="utm-tracking" strategy="afterInteractive">
          {`
            function getParameterByName(name) {
              var url = window.location.href;
              name = name.replace(/[\\[\\]]/g, '\\\\$&');
              var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                  results = regex.exec(url);
              if (!results) return null;
              if (!results[2]) return '';
              return decodeURIComponent(results[2].replace(/\\+/g, ' '));
            }

            function saveUtmParams() {
              var utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
              var savedParams = {};
              
              utmParams.forEach(function(param) {
                var value = getParameterByName(param);
                if (value) {
                  savedParams[param] = value;
                  localStorage.setItem(param, value);
                } else if (localStorage.getItem(param)) {
                  savedParams[param] = localStorage.getItem(param);
                }
              });
              
              return savedParams;
            }

            // Save UTM parameters when page loads
            document.addEventListener('DOMContentLoaded', function() {
              var utmParams = saveUtmParams();
              
              // Add UTM params to all forms
              document.querySelectorAll('form').forEach(function(form) {
                for (var param in utmParams) {
                  if (utmParams.hasOwnProperty(param)) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = param;
                    input.value = utmParams[param];
                    form.appendChild(input);
                  }
                }
              });
            });
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* Facebook Pixel (noscript) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXXX&ev=PageView&noscript=1"
          />
        </noscript>
        
        {children}
      </body>
    </html>
  );
}
