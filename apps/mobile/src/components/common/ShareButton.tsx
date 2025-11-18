import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { ShareIcon } from '../Icons';

interface ShareButtonProps {
    title: string;
    message: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, message }) => {
    const onShare = async () => {
        try {
            await Share.share({
                title,
                message,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={onShare}>
            <ShareIcon color="#334155" width={22} height={22} />
            <Text style={styles.text}>مشاركة</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 8
    },
    text: {
        color: '#334155',
        fontWeight: 'bold'
    }
});

export default ShareButton;
