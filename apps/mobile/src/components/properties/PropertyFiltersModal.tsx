import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { CheckCircleIcon } from '../Icons';

interface PropertyFiltersModalProps {
    isVisible: boolean;
    onClose: () => void;
    onApply: (priceRange: { min: string; max: string }, amenities: string[]) => void;
    initialPriceRange: { min: string; max: string };
    initialAmenities: string[];
}

const availableAmenities = [
    "أمن 24 ساعة", "جراج خاص", "حديقة", "مصعد", 
    "حمام سباحة", "حديقة خاصة", "مفروشة بالكامل", "مطبخ مجهز", 
    "روف خاص", "فيو مفتوح"
];

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

const PropertyFiltersModal: React.FC<PropertyFiltersModalProps> = ({ isVisible, onClose, onApply, initialPriceRange, initialAmenities }) => {
    const [priceRange, setPriceRange] = useState(initialPriceRange);
    const [selectedAmenities, setSelectedAmenities] = useState(initialAmenities);

    useEffect(() => {
        if (isVisible) {
            setPriceRange(initialPriceRange);
            setSelectedAmenities(initialAmenities);
        }
    }, [isVisible, initialPriceRange, initialAmenities]);

    const handleAmenityChange = (amenity: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };
    
    const handleClear = () => {
        setPriceRange({ min: '', max: '' });
        setSelectedAmenities([]);
        onApply({ min: '', max: '' }, []);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalBackdrop} onPress={onClose}>
                <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.modalTitle}>فلاتر متقدمة</Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>نطاق السعر</Text>
                            <View style={styles.priceInputs}>
                                <TextInput
                                    placeholder="أقل سعر"
                                    value={priceRange.min}
                                    onChangeText={(text) => setPriceRange({ ...priceRange, min: text })}
                                    style={styles.priceInput}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.priceSeparator}>-</Text>
                                <TextInput
                                    placeholder="أعلى سعر"
                                    value={priceRange.max}
                                    onChangeText={(text) => setPriceRange({ ...priceRange, max: text })}
                                    style={styles.priceInput}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>وسائل الراحة</Text>
                            <View style={styles.amenitiesGrid}>
                                {availableAmenities.map(amenity => (
                                    <Checkbox
                                        key={amenity}
                                        label={amenity}
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                    />
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.footerButton, styles.applyButton]} onPress={() => onApply(priceRange, selectedAmenities)}>
                            <Text style={styles.applyButtonText}>تطبيق</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.footerButton, styles.clearButton]} onPress={handleClear}>
                            <Text style={styles.clearButtonText}>مسح الكل</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%', padding: 20 },
    scrollContent: { paddingBottom: 80 }, // Padding for footer
    modalTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginBottom: 20 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '600', textAlign: 'right', marginBottom: 12 },
    priceInputs: { flexDirection: 'row-reverse', alignItems: 'center', gap: 10 },
    priceInput: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 8, padding: 12, textAlign: 'center' },
    priceSeparator: { fontSize: 18 },
    amenitiesGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap' },
    checkboxContainer: { flexDirection: 'row-reverse', alignItems: 'center', width: '50%', paddingVertical: 8 },
    checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#cbd5e1', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
    checkboxChecked: { borderColor: '#0891b2', backgroundColor: '#0891b2' },
    checkboxInner: { width: 10, height: 10, backgroundColor: 'white' },
    checkboxLabel: { fontSize: 15, marginRight: 10 },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row-reverse', padding: 20, borderTopWidth: 1, borderTopColor: '#e2e8f0', backgroundColor: 'white' },
    footerButton: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
    applyButton: { backgroundColor: '#0891b2', marginLeft: 10 },
    applyButtonText: { color: 'white', fontWeight: 'bold' },
    clearButton: { backgroundColor: '#e2e8f0' },
    clearButtonText: { color: '#334155', fontWeight: 'bold' }
});

export default PropertyFiltersModal;