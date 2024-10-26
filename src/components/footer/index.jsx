'use client'
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="header footer">
      <div className="container">
        <div className="header-inner">
          <div className="left-block footer-left">
            <span>{t('copyright')}</span>
            <div className='help'>
              <Link href=''>{t('help')}</Link>
              <Link href=''>{t('documentation')}</Link>
              <Link href=''>{t('applications')}</Link>
              <Link href=''>{t('consent')}</Link>
            </div>
            <div className='help'>
              <Link href=''>{t('russian')}</Link>
              <Link href=''>{t('kazakh')}</Link>
              <Link href=''>{t('english')}</Link>
            </div>
          </div>
          <div className="footer-right">
            <div>
              <img src="/img/facebook.png" alt="Facebook" />
            </div>
            <div>
              <img src="/img/instagram.png" alt="Instagram" />
            </div>
            <div>
              <img src="/img/vk.png" alt="VK" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
