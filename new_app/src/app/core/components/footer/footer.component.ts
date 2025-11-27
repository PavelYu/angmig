import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { Observable } from 'rxjs';

export interface FooterLink {
  label: string;
  route?: string;
  url?: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {
  isDark$: Observable<boolean>;
  currentYear = new Date().getFullYear();
  appVersion = '1.0.0';

  companyInfo = {
    name: 'Enterprise Corp',
    tagline: 'Empowering businesses worldwide',
    email: 'support@enterprisecorp.com',
    phone: '+1 (555) 123-4567'
  };

  footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', route: '/features' },
        { label: 'Pricing', route: '/pricing' },
        { label: 'Documentation', route: '/docs' },
        { label: 'API Reference', route: '/api', external: true }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', route: '/about' },
        { label: 'Careers', route: '/careers' },
        { label: 'Blog', route: '/blog' },
        { label: 'Press Kit', route: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', route: '/help' },
        { label: 'Contact Us', route: '/contact' },
        { label: 'Status Page', url: 'https://status.enterprisecorp.com', external: true },
        { label: 'Community', url: 'https://community.enterprisecorp.com', external: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', route: '/privacy' },
        { label: 'Terms of Service', route: '/terms' },
        { label: 'Cookie Policy', route: '/cookies' },
        { label: 'GDPR', route: '/gdpr' }
      ]
    }
  ];

  socialLinks = [
    { icon: 'facebook', url: 'https://facebook.com/enterprisecorp', label: 'Facebook' },
    { icon: 'twitter', url: 'https://twitter.com/enterprisecorp', label: 'Twitter' },
    { icon: 'linkedin', url: 'https://linkedin.com/company/enterprisecorp', label: 'LinkedIn' },
    { icon: 'github', url: 'https://github.com/enterprisecorp', label: 'GitHub' }
  ];

  constructor(
    private themeService: ThemeService,
    private i18nService: I18nService
  ) {
    this.isDark$ = this.themeService.isDark$;
  }

  ngOnInit(): void {
    // Load app version from environment or package.json
    // This is a placeholder - in real app, inject environment config
  }

  getBuildInfo(): string {
    // In production, this would come from environment or build metadata
    const buildDate = new Date().toISOString().split('T')[0];
    return `${buildDate}`;
  }

  navigateToLink(link: FooterLink): void {
    if (link.external && link.url) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else if (link.route) {
      // Use router navigation
      // In real app: this.router.navigate([link.route]);
    }
  }
}
