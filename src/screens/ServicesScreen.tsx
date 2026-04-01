import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    useWindowDimensions,
    Platform,
    StatusBar,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Rect, Line, Polygon } from 'react-native-svg';
import TopNavbar from '../components/TopNavbar';
import BottomBar from '../components/BottomBar';

// --- SHARED BRAND COLORS ---
const COLORS = {
    gradientTop: '#F8F4ED',
    gradientBottom: '#E8DFD1',
    navy: '#122C6F',
    navy2: '#0E2255',
    gold: '#EDAB0C',
    textGray: '#8A8D9F',
    whiteGlass: 'rgba(255, 255, 255, 0.85)',

    // Specific Service Accents
    green: '#5E8704',
    cyan: '#1E9EC0',
    peachDark: '#E68A00',
};

// --- PROFESSIONAL TRANSPORT SVGS ---
const TransportIcon = ({ id, color, size }: { id: string, color: string, size: number }) => {
    const strokeW = "2";
    switch (id) {
        case 'bike':
            return (
               <Image
                    source={require('../../assets/bike_icon.png')}
                    style={{ width: 45, height: 45 }}
                    resizeMode="contain"
                />
            );
        case 'cab':
            return (
                <Image
                    source={require('../../assets/cab_icon.png')}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                />
            );
        case 'auto':
            return (
                <Image
                    source={require('../../assets/auto_icon.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
            );
        case 'bus':
            return (
                <Image
                    source={require('../../assets/bus_icon.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
            );
        case 'metro':
            return (
                <Image
                    source={require('../../assets/metro_icon.png')}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                />
            );
        case 'multimode':
            return (
                <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16 3h5v5" />
                  <Path d="M4 20L21 3" />
                  <Path d="M21 16v5h-5" />
                  <Path d="M15 15l6 6" />
                  <Path d="M4 4l5 5" />
                </Svg>
            );
        default:
            return null;
    }
};

// --- SERVICES DATA ---
const SERVICES_LIST = [
    { id: 'bike', title: 'Bike', subtitle: 'Quick rides for single travelers', color: COLORS.peachDark, time: '2 min' },
    { id: 'cab', title: 'Cab', subtitle: 'Comfortable door-to-door rides', color: COLORS.navy, time: '4 min' },
    { id: 'auto', title: 'Auto', subtitle: 'Affordable everyday transport', color: COLORS.gold, time: '3 min' },
    { id: 'bus', title: 'Bus', subtitle: 'Eco-friendly and highly affordable', color: COLORS.green, time: 'On time' },
    { id: 'metro', title: 'Metro', subtitle: 'Fastest route across the city', color: COLORS.cyan, time: 'Scheduled' },
    { id: 'multimode', title: 'Multimode', subtitle: 'Smart combo', color: COLORS.navy2, time: 'Mixed' },
];

export default function ServicesScreen({ navigation }: any) {
    // TRUE RESPONSIVE MATH
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const isSmallScreen = SCREEN_WIDTH < 375;
    const numColumns = SCREEN_WIDTH < 500 ? 3 : 4;

    // Split services into rows
    const serviceRows: typeof SERVICES_LIST[] = [];
    for (let i = 0; i < SERVICES_LIST.length; i += numColumns) {
        serviceRows.push(SERVICES_LIST.slice(i, i + numColumns));
    }

    return (
        <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={styles.gradientBackground}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

                {/* Top Navigation */}
                <TopNavbar />

                <ScrollView
                    contentContainerStyle={[styles.scrollContent, isSmallScreen && { paddingHorizontal: 12 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Responsive Wrapper for Tablets/iPads */}
                    <View style={styles.responsiveWrapper}>

                        {/* Header Text */}
                        <View style={styles.headerContainer}>
                            <Text style={styles.pageTitle}>All Services</Text>
                            <Text style={styles.pageSubtitle}>Choose your ride in seconds</Text>
                        </View>

                        {/* Services Grid */}
                        <View style={styles.gridContainer}>
                            {serviceRows.map((row, rowIndex) => (
                                <View key={`row-${rowIndex}`} style={styles.gridRow}>
                                    {row.map((service) => (
                                        <TouchableOpacity
                                            key={service.id}
                                            style={styles.gridServiceCard}
                                            activeOpacity={0.7}
                                            onPress={() => navigation.navigate('SearchLocation', { selectedFilter: service.id })} // <-- ADDED FILTER NAVIGATION
                                        >
                                            {/* Icon Container */}
                                            <View style={[styles.gridIconBox, { backgroundColor: `${service.color}15` }]}>
                                                <TransportIcon id={service.id} color={service.color} size={isSmallScreen ? 36 : 44} />
                                            </View>

                                            {/* Service Name */}
                                            <Text style={[styles.gridServiceTitle, isSmallScreen && { fontSize: 13 }]}>
                                                {service.title}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>

                    </View>

                    {/* Bottom spacer so list isn't hidden behind BottomBar */}
                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>

            {/* FIXED: BottomBar active tab set to Services */}
            <BottomBar />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: { flex: 1 },
    safeArea: { flex: 1 },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    responsiveWrapper: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
    },

    headerContainer: {
        marginBottom: 24,
    },
    pageTitle: {
        fontSize: 28,
        fontFamily: 'Poppins-Black',
        color: COLORS.navy,
        marginBottom: 4,
    },
    pageSubtitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: COLORS.textGray,
        lineHeight: 20,
    },

    // GRID LAYOUT
    gridContainer: {
        gap: 16,
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },

    // GRID SERVICE CARD
    gridServiceCard: {
        flex: 1,
        backgroundColor: COLORS.whiteGlass,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        shadowColor: '#d1d5db',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },

    gridIconBox: {
        width: 70,
        height: 70,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    gridServiceTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.navy,
        textAlign: 'center',
    },
});