import React from 'react';
import { SvgProps } from 'react-native-svg';
import * as Icons from './Icons';

export const iconComponents: { [key: string]: React.FC<SvgProps> } = {
    BuildingLibraryIcon: Icons.HomeIcon, 
    HeartIcon: Icons.HomeIcon, // Placeholder
    ShoppingBagIcon: Icons.HomeIcon, // Placeholder
    AcademicCapIcon: Icons.HomeIcon, // Placeholder
    DevicePhoneMobileIcon: Icons.HomeIcon, // Placeholder
    BoltIcon: Icons.HomeIcon, // Placeholder
    SparklesIcon: Icons.HomeIcon, // Placeholder
    CarIcon: Icons.HomeIcon, // Placeholder
    PaintBrushIcon: Icons.HomeIcon, // Placeholder
    CakeIcon: Icons.HomeIcon, // Placeholder
    WrenchScrewdriverIcon: Icons.HomeIcon, // Placeholder
    GiftIcon: Icons.HomeIcon, // Placeholder
    Squares2X2Icon: Icons.Squares2X2Icon,
};

export const getIcon = (name: string | undefined, props: SvgProps) => {
    if (!name) return <Icons.Squares2X2Icon {...props} />;
    const IconComponent = iconComponents[name];
    return IconComponent ? <IconComponent {...props} /> : <Icons.Squares2X2Icon {...props} />;
};
