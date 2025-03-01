import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "./i18n";
import { GA_MEASUREMENT_ID } from './lib/analytics';

// Add Google Analytics Script
const script1 = document.createElement('script');
script1.async = true;
script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
`;
document.head.appendChild(script2);

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <App />
  </StrictMode>
);
