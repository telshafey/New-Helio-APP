import React from 'react';
import { WhatsAppIcon } from './Icons';
import { CONTACT_INFO } from '../../packages/shared-logic/src/config';

const WhatsAppFab: React.FC = () => {
    return (
        <a
            href={CONTACT_INFO.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-4 md:bottom-6 md:right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200 ease-in-out z-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="Contact us on WhatsApp"
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
};

export default WhatsAppFab;
