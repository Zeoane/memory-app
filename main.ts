/**
 * Entry point: Load styles and start SPA.
 */
import './style.scss';

import faviconUrl from './src/assets/favicon.svg?url';
import { bootstrapApp } from './src/app/bootstrap-app';

const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.type = 'image/svg+xml';
faviconLink.href = faviconUrl;
document.head.appendChild(faviconLink);

void bootstrapApp();

