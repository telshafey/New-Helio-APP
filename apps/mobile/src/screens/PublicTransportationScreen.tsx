import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useTransportation } from '../../../../packages/shared-logic/src/context/TransportationContext';
import { PhoneIcon, UserCircleIcon, MapIcon, CalendarDaysIcon, ChevronDownIcon } from '../components/Icons';

const PublicTransportationScreen = () => {
    const { transportation } = useTransportation();
    const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
    const [showFullWeek, setShowFullWeek] = useState(false);

    const todayDate = new Date();
    const todayString = todayDate.toISOString().split('T')[0];
    const todaySchedule = transportation.weeklySchedule.find(d => d.date === todayString);
    const todayDayName = todayDate.toLocaleDateString('ar-EG', { weekday: 'long' });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'internal' && styles.activeTab]} onPress={() => setActiveTab('internal')}>
                    <Text style={[styles.tabText, activeTab === 'internal' && styles.activeTabText]}>الباصات الداخلية</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'external' && styles.activeTab]} onPress={() => setActiveTab('external')}>
                    <Text style={[styles.tabText, activeTab === 'external' && styles.activeTabText]}>الباصات الخارجية</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'internal' && (
                <View style={styles.content}>
                    <SupervisorCard supervisor={transportation.internalSupervisor} title="مشرف الباصات الداخلية" />
                    <Section title={`مناوبة اليوم: ${todayDayName}`}>
                        {todaySchedule?.drivers.length > 0 ? (
                            todaySchedule.drivers.map(driver => {
                                const driverDetails = transportation.internalDrivers.find(d => d.name === driver.name);
                                return <DriverCard key={driver.name} driver={{ ...driver, avatar: driverDetails?.avatar }} />;
                            })
                        ) : <Text style={styles.emptyText}>لا يوجد سائقين مناوبين اليوم.</Text>}
                    </Section>
                    
                     <TouchableOpacity style={styles.toggleWeekButton} onPress={() => setShowFullWeek(!showFullWeek)}>
                        <Text style={styles.toggleWeekText}>{showFullWeek ? 'إخفاء جدول الأسبوع' : 'عرض جدول الأسبوع'}</Text>
                        <ChevronDownIcon color="#0891b2" width={20} height={20} style={{ transform: [{ rotate: showFullWeek ? '180deg' : '0deg' }]}}/>
                    </TouchableOpacity>

                    {showFullWeek && (
                        <Section title="الجدول الأسبوعي الكامل">
                           {transportation.weeklySchedule.map(item => {
                                const dayName = new Date(`${item.date}T00:00:00`).toLocaleDateString('ar-EG', { weekday: 'long' });
                                return (
                                    <View key={item.date} style={styles.weekDayContainer}>
                                        <Text style={styles.weekDayTitle}>{dayName} <Text style={styles.weekDayDate}>{item.date}</Text></Text>
                                        {item.drivers.length > 0 ? item.drivers.map(d => <Text key={d.name} style={styles.weekDayDriver}>{d.name}</Text>) : <Text style={styles.weekDayDriver}>لا يوجد</Text>}
                                    </View>
                                )
                           })}
                        </Section>
                    )}
                </View>
            )}

            {activeTab === 'external' && (
                <View style={styles.content}>
                    <SupervisorCard supervisor={transportation.externalSupervisor} title="مشرف الباصات الخارجية" />
                    <Section title="المسارات الخارجية">
                        {transportation.externalRoutes.map(route => (
                            <View key={route.id} style={styles.routeCard}>
                                <Text style={styles.routeName}>{route.name}</Text>
                                <Text style={styles.routeInfo}>المواعيد: {route.timings.join(' - ')}</Text>
                                <Text style={styles.routeInfo}>نقطة الانتظار: {route.waitingPoint}</Text>
                            </View>
                        ))}
                    </Section>
                </View>
            )}
        </ScrollView>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);

const SupervisorCard: React.FC<{ supervisor: {name: string, phone: string}, title: string }> = ({ supervisor, title }) => (
    <View style={styles.supervisorCard}>
        <UserCircleIcon color="#0891b2" width={40} height={40}/>
        <View style={styles.supervisorInfo}>
            <Text style={styles.supervisorName}>{supervisor.name}</Text>
            <Text style={styles.supervisorTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${supervisor.phone}`)}>
            <PhoneIcon color="#fff" width={20} height={20}/>
        </TouchableOpacity>
    </View>
);

const DriverCard: React.FC<{ driver: { name: string, phone: string, avatar?: string } }> = ({ driver }) => (
    <View style={styles.driverCard}>
        <UserCircleIcon color="#475569" width={40} height={40}/>
        <View style={styles.supervisorInfo}>
            <Text style={styles.supervisorName}>{driver.name}</Text>
            <Text style={styles.supervisorTitle}>{driver.phone}</Text>
        </View>
        <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${driver.phone}`)}>
            <PhoneIcon color="#fff" width={20} height={20}/>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    tabContainer: { flexDirection: 'row-reverse', padding: 16, backgroundColor: 'white' },
    tabButton: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 8 },
    activeTab: { backgroundColor: '#0891b2' },
    tabText: { fontWeight: 'bold', color: '#334155' },
    activeTabText: { color: 'white' },
    content: { padding: 16 },
    section: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 12 },
    supervisorCard: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 12, elevation: 2, marginBottom: 16 },
    supervisorInfo: { flex: 1, marginRight: 12 },
    supervisorName: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
    supervisorTitle: { fontSize: 14, color: '#64748b', textAlign: 'right' },
    driverCard: { flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 8 },
    callButton: { backgroundColor: '#22c55e', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    emptyText: { textAlign: 'center', color: '#64748b' },
    routeCard: { borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingVertical: 12 },
    routeName: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
    routeInfo: { fontSize: 14, color: '#475569', textAlign: 'right', marginTop: 4 },
    toggleWeekButton: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 4, padding: 10 },
    toggleWeekText: { color: '#0891b2', fontWeight: 'bold' },
    weekDayContainer: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    weekDayTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
    weekDayDate: { fontSize: 12, fontWeight: 'normal', color: '#64748b' },
    weekDayDriver: { textAlign: 'right', marginTop: 4, color: '#334155' }
});

export default PublicTransportationScreen;