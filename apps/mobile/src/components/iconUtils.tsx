import React from 'react';
import { SvgProps } from 'react-native-svg';
import * as Icons from './Icons';

// FIX: Corrected the icon map to use the 'Icons' namespace and added missing icons.
export const iconComponents: { [key: string]: React.FC<SvgProps> } = {
    BuildingLibraryIcon: Icons.BuildingLibraryIcon, 
    InformationCircleIcon: Icons.InformationCircleIcon, 
    DocumentDuplicateIcon: Icons.DocumentDuplicateIcon, 
    TruckIcon: Icons.TruckIcon,
    HeartIcon: Icons.HeartIcon, 
    BuildingStorefrontIcon: Icons.ShoppingBagIcon, 
    HomeModernIcon: Icons.HomeModernIcon, 
    UserGroupIcon: Icons.UserGroupIcon, 
    BeakerIcon: Icons.BeakerIcon, 
    CakeIcon: Icons.CakeIcon, 
    FireIcon: Icons.FireIcon, 
    ShoppingBagIcon: Icons.ShoppingBagIcon,
    AcademicCapIcon: Icons.AcademicCapIcon, 
    BookOpenIcon: Icons.BookOpenIcon, 
    GiftIcon: Icons.GiftIcon, 
    FilmIcon: Icons.FilmIcon, 
    SparklesIcon: Icons.SparklesIcon, 
    BoltIcon: Icons.BoltIcon, 
    TrashIcon: Icons.TrashIcon, 
    WrenchScrewdriverIcon: Icons.WrenchScrewdriverIcon,
    BanknotesIcon: Icons.BanknotesIcon, 
    EnvelopeIcon: Icons.EnvelopeIcon,
    DevicePhoneMobileIcon: Icons.DevicePhoneMobileIcon, 
    CarIcon: Icons.CarIcon, 
    Squares2X2Icon: Icons.Squares2X2Icon, 
    PaintBrushIcon: Icons.PaintBrushIcon
};

export const getIcon = (name: string | undefined, props: SvgProps) => {
    if (!name) return <Icons.Squares2X2Icon {...props} />;
    const IconComponent = iconComponents[name];
    return IconComponent ? <IconComponent {...props} /> : <Icons.Squares2X2Icon {...props} />;
};