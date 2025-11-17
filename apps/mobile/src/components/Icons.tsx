import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const HomeIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const Squares2X2Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const HomeModernIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h4.5m0 0V3.545M2.25 10.75h7.5" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.09-1.423A7.927 7.927 0 016 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ChatBubbleOvalLeftIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.266c-.515.036-1.022.166-1.485.421a3.375 3.375 0 01-2.573 0c-.463-.255-.97-.385-1.485-.421l-3.722-.266A2.25 2.25 0 013 15.185v-4.286c0-.97.616-1.813 1.5-2.097" stroke={props.color || 'currentColor'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const Bars3Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ChevronDownIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const StarIcon: React.FC<SvgProps & { filled?: boolean }> = ({ filled = true, ...props }) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path 
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.612.049.864.86.42 1.28l-4.096 3.688a.563.563 0 00-.168.56l1.28 5.385c.175.734-.516 1.32-1.176.962l-4.66-2.735a.563.563 0 00-.585 0l-4.66 2.735c-.66.358-1.352-.228-1.176-.962l1.28-5.385a.563.563 0 00-.168-.56l-4.096-3.688c-.444-.42-.192-1.23.42-1.28l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            stroke={props.color || 'currentColor'}
            fill={filled ? props.color || 'currentColor' : 'none'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const PhoneIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const WhatsAppIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 16 16" {...props}>
    <Path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" fill={props.color || 'currentColor'}/>
  </Svg>
);

export const ShareIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const HeartIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const HeartIconSolid: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={props.color || 'currentColor'}/>
    </Svg>
);

export const ClockIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const MapPinIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <Path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ArrowLeftIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const CheckCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const AdjustmentsHorizontalIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0h7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ShoppingBagIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const BriefcaseIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M20.25 14.15v4.075c0 1.313-.964 2.505-2.25 2.505H6c-1.286 0-2.25-.992-2.25-2.25V6.225c0-1.313.964-2.505 2.25-2.505h2.25a2.25 2.25 0 012.25 2.25v.193m10.5 4.343V8.118a2.25 2.25 0 00-2.25-2.25h-2.25a2.25 2.25 0 00-2.25 2.25v.193m0-3.986V3.75a2.25 2.25 0 00-2.25-2.25h-2.25a2.25 2.25 0 00-2.25 2.25v.193M16.5 14.15v4.075" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const ArchiveBoxIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const PinIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const HandThumbUpIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M6.633 10.5l-1.875 1.875a.75.75 0 000 1.06l1.875 1.875M6.633 10.5h4.897M6.633 10.5v11.25" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const TrashIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 00-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ArrowUturnLeftIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const UserCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const BuildingStorefrontIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M13.5 21v-7.5A2.25 2.25 0 0115.75 11.25h3A2.25 2.25 0 0121 13.5V21M3 3h18M3 21h18M12 3v18M3 3a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003 21m18 0a2.25 2.25 0 002.25-2.25v-13.5A2.25 2.25 0 0021 3m-18 0h18" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const TagIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <Path d="M6 6h.008v.008H6V6z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const TruckIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-9-3.375H5.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h13.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H12M12 4.875v.01M15 4.875v.01" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const BuildingLibraryIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const DocumentDuplicateIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const QuestionMarkCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const InformationCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const BookOpenIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ArrowLeftOnRectangleIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const PencilIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const SunIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a6 6 0 100-12 6 6 0 000 12z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const MoonIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ComputerDesktopIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const Cog6ToothIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.05.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const MapIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M9 6.75V15m6-6v8.25m.5-11.25l-3 3m-3-3l3 3m0 0l-3 3m3-3l3 3M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H18.375c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const CalendarDaysIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 14.25h.008v.008H12v-.008z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const ScaleIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.818-5.62-2.24l-2.73-2.73a5.25 5.25 0 00-7.424 0l-2.73 2.73c-1.421 1.421-3.488 2.24-5.62 2.24a5.988 5.988 0 01-2.036-.243c-.483-.174-.711-.703-.59-1.202L5.25 4.97m13.5 0L12 12.75m-6.75-7.78L12 12.75" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const KeyIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const NoSymbolIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const PlusIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M12 4.5v15m7.5-7.5h-15" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const CloudArrowUpIcon: React.FC<SvgProps> = (props) => (
    <Svg viewBox="0 0 24 24" {...props}>
        <Path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

// FIX: Added missing icons
export const UserGroupIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.095-2.21-1.05-2.21H8.25c-.955 0-1.625 1.187-1.05 2.21m3.996 0l.995-1.79m-.995 1.79l-.995-1.79m0-3.093l2.494-4.491c.36-.645.037-1.462-.662-1.462h-1.666a2.25 2.25 0 00-2.12 1.433l-2.494 4.49a2.25 2.25 0 002.12 3.093h1.666c.7 0 1.258-.645.998-1.293z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const BuildingOffice2Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 10.5h6M9 14.25h6M9 18h6" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const EnvelopeIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

// FIX: Added missing QrCodeIcon for MyOffersScreen
export const QrCodeIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <Path d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.125h.75v.75h-.75v-.75zM19.125 13.5h.75v.75h-.75v-.75zM19.125 19.125h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" fill={props.color} stroke={props.color} strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// FIX: Added missing XCircleIcon for StatusBadge component
export const XCircleIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

// FIX: Added missing UserMinusIcon for StatusBadge component
export const UserMinusIcon: React.FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke={props.color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);