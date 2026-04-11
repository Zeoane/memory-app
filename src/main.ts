/**
 * Entry point: Load styles and start SPA.
 */
import './styles/style.scss';

import faviconUrl from './assets/favicon.svg?url';

import { bootstrapApp } from './bootstrap-app';

const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.type = 'image/svg+xml';
faviconLink.href = faviconUrl;
document.head.appendChild(faviconLink);

bootstrapApp();
