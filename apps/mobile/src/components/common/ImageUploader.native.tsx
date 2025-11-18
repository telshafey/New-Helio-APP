import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TrashIcon, CloudArrowUpIcon } from '../Icons';

interface ImageUploaderProps {
    initialImages?: string[];
    onImagesChange: (images: string[]) => void;
    multiple?: boolean;
    maxFiles?: number;
    label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
    initialImages = [], 
    onImagesChange, 
    multiple = false,
    maxFiles = 5,
    label
}) => {
    const [images, setImages] = useState<string[]>(initialImages);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: !multiple,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
            allowsMultipleSelection: multiple,
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => `data:image/jpeg;base64,${asset.base64}`);
            const updatedImages = multiple ? [...images, ...newImages].slice(0, maxFiles) : newImages;
            setImages(updatedImages);
            onImagesChange(updatedImages);
        }
    };
    
    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('عذراً', 'نحن بحاجة إلى إذن الكاميرا لجعل هذا يعمل!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled) {
            const newImage = `data:image/jpeg;base64,${result.assets[0].base64}`;
            const updatedImages = multiple ? [...images, newImage].slice(0, maxFiles) : [newImage];
            setImages(updatedImages);
            onImagesChange(updatedImages);
        }
    };

    const handleUploadPress = () => {
        Alert.alert(
            'اختر صورة',
            '',
            [
                { text: 'التقط صورة', onPress: takePhoto },
                { text: 'اختر من المعرض', onPress: pickImage },
                { text: 'إلغاء', style: 'cancel' },
            ],
            { cancelable: true }
        );
    }

    const removeImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesChange(updatedImages);
    };

    const canAddMore = multiple ? images.length < maxFiles : images.length < 1;

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.grid}>
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(index)}>
                            <TrashIcon color="#fff" width={16} height={16} />
                        </TouchableOpacity>
                    </View>
                ))}
                {canAddMore && (
                    <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPress}>
                         <CloudArrowUpIcon color="#64748b" width={32} height={32} />
                         <Text style={styles.uploadText}>
                            {multiple ? `(${images.length}/${maxFiles})` : 'تحميل'}
                         </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { marginVertical: 8 },
    label: { fontSize: 14, fontWeight: '600', color: '#475569', textAlign: 'right', marginBottom: 8 },
    grid: { flexDirection: 'row-reverse', flexWrap: 'wrap' },
    imageContainer: { width: 80, height: 80, borderRadius: 8, margin: 4 },
    image: { width: '100%', height: '100%', borderRadius: 8 },
    deleteButton: { position: 'absolute', top: 4, left: 4, backgroundColor: 'rgba(239, 68, 68, 0.8)', padding: 4, borderRadius: 12 },
    uploadButton: { width: 80, height: 80, borderRadius: 8, margin: 4, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1', borderStyle: 'dashed' },
    uploadText: { fontSize: 12, color: '#64748b', marginTop: 4 }
});

export default ImageUploader;
