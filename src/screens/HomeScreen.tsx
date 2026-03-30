import React, { useRef } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  useWindowDimensions, // <--- Used for dynamic screen sizing
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TopNavbar from '../components/TopNavbar'; 
import BottomBar from '../components/BottomBar';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1', 
  navy: '#122C6F',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
};

const SERVICES = [
  { id: 'bus', label: 'Bus', subtitle: 'Eco-friendly', colors: ['rgba(255, 255, 255, 0.85)', 'rgba(215, 230, 195, 0.95)'], iconBg: '#5E8704' },
  { id: 'metro', label: 'Metro', subtitle: 'Fastest route', colors: ['rgba(255, 255, 255, 0.85)', 'rgba(205, 215, 235, 0.95)'], iconBg: '#122C6F' },
  { id: 'cab', label: 'Cab', subtitle: 'Door to door', colors: ['rgba(255, 255, 255, 0.85)', 'rgba(245, 220, 175, 0.95)'], iconBg: '#EDAB0C' },
  { id: 'multimode', label: 'Multimode', subtitle: 'Smart combo', colors: ['rgba(255, 255, 255, 0.85)', 'rgba(190, 230, 235, 0.95)'], iconBg: '#1E9EC0' },
];

const ServiceIcon = ({ id }: { id: string }) => {
  const size = "26";
  const color = "#FFFFFF"; 
  const strokeW = "2.2";

  switch (id) {
    case 'bus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
          <Path d="M4 11h16" />
          <Path d="M8 15h.01" />
          <Path d="M16 15h.01" />
          <Path d="M6 18v2" />
          <Path d="M18 18v2" />
        </Svg>
      );
    case 'metro':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4 3h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <Path d="M4 11h16" />
          <Path d="M12 3v8" />
          <Path d="M8 19l-2 3" />
          <Path d="M16 19l2 3" />
          <Path d="M8 15h.01" />
          <Path d="M16 15h.01" />
        </Svg>
      );
    case 'cab':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M10 7V5h4v2" />
          <Path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <Circle cx="7" cy="17" r="2" />
          <Path d="M9 17h6" />
          <Circle cx="17" cy="17" r="2" />
        </Svg>
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

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // --- RESPONSIVE MATH ---
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  // Capping the max width at 500 so cards don't look overly stretched on iPads/tablets
  const EFFECTIVE_WIDTH = Math.min(SCREEN_WIDTH, 500); 
  const HORIZONTAL_PADDING = 20;
  const CARD_GAP = 14;
  
  const CARD_WIDTH = (EFFECTIVE_WIDTH - (HORIZONTAL_PADDING * 2) - CARD_GAP) / 2;
  const CARD_HEIGHT = CARD_WIDTH * 1.05; 

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={styles.gradientBackground}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        
        <TopNavbar scrollY={scrollY} />
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } 
          )}
        >
          {/* Centering wrapper for large screens */}
          <View style={{ width: '100%', maxWidth: 500, alignSelf: 'center' }}>
            
            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
              <Svg 
                width="22" height="22" viewBox="0 0 24 24" 
                fill="none" stroke={COLORS.navy} strokeWidth="2.5" 
                strokeLinecap="round" strokeLinejoin="round" 
                style={{ marginRight: 10 }}
              >
                <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <Circle cx="12" cy="10" r="3" />
              </Svg>

              <TextInput
                style={styles.input}
                placeholder="Enter pickup location"
                placeholderTextColor={COLORS.textGray}
              />

              <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
                <Svg 
                  width="20" height="20" viewBox="0 0 24 24" 
                  fill="none" stroke="#000000" strokeWidth="2.5" 
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <Line x1="12" y1="19" x2="12" y2="23" />
                  <Line x1="8" y1="23" x2="16" y2="23" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* OFFER CARD */}
            <View style={styles.offerCard}>
              <View style={styles.offerContent}>
                <Text style={styles.offerLabel}>OUR ADS & OFFERS</Text>
                <Text style={styles.offerTitle}>Get 30% off your{'\n'}first Metro ride 🚇</Text>
                <View style={styles.dotsRow}>
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>
              <TouchableOpacity style={styles.claimBtn} activeOpacity={0.8}>
                <Text style={styles.claimBtnText}>CLAIM NOW</Text>
              </TouchableOpacity>
            </View>

            {/* SERVICES HEADER */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Services</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all →</Text>
              </TouchableOpacity>
            </View>

            {/* DYNAMIC 4-BOX GRID */}
            <View style={styles.gridContainer}>
              {SERVICES.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.cardWrapper, { width: CARD_WIDTH, height: CARD_HEIGHT }]} 
                  activeOpacity={0.8}
                >
                  <LinearGradient 
                    colors={item.colors} 
                    locations={[0, 0.9, 1]} 
                    style={styles.serviceCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.cardTopRow}>
                      <View style={[styles.iconBox, { backgroundColor: item.iconBg, shadowColor: item.iconBg, width: CARD_WIDTH * 0.38, height: CARD_WIDTH * 0.38 }]}>
                        <ServiceIcon id={item.id} />
                      </View>
                      <Text style={[styles.tinyArrow, { color: item.iconBg }]}>↗</Text>
                    </View>

                    <View style={styles.cardBottomText}>
                      <Text style={styles.serviceLabel} numberOfLines={1}>{item.label}</Text>
                      <Text style={[styles.serviceSubtitle, { color: item.iconBg }]} numberOfLines={1}>{item.subtitle}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* SECONDARY CARD */}
            <TouchableOpacity style={styles.secondaryCard} activeOpacity={0.8}>
              <View style={styles.secondaryIconBox}>
                {/* PROFESSIONAL SVG REPLACING EMOJI */}
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <Circle cx="8.5" cy="7" r="4" />
                  <Line x1="20" y1="8" x2="20" y2="14" />
                  <Line x1="23" y1="11" x2="17" y2="11" />
                </Svg>
              </View>
              <View>
                <Text style={styles.secondaryTitle}>Book for Someone Else</Text>
                <Text style={styles.secondarySubtitle}>Plan a ride for family</Text>
              </View>
            </TouchableOpacity>

          </View>
          
          <View style={{ height: 110 }} /> 
        </ScrollView>
      </SafeAreaView>

      {/* FIXED: Active tab string added */}
      <BottomBar  />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  safeArea: { flex: 1 },
  
  scrollContent: {
    paddingHorizontal: 20, 
    paddingTop: 10, 
  },

  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 24, padding: 8, paddingLeft: 16, marginBottom: 24, borderWidth: 1, borderColor: '#FFFFFF', shadowColor: '#d1d5db', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 2 },
  
  input: { flex: 1, height: 44, fontSize: 16, color: COLORS.navy, fontFamily: 'Poppins-Regular', marginTop: Platform.OS === 'android' ? 4 : 0 }, 
  
  micButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.gold, justifyContent: 'center', alignItems: 'center' },
  
  offerCard: { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#122C6F', borderRadius: 24, padding: 20, marginBottom: 28, borderWidth: 1, overflow:'visible', shadowColor: COLORS.navy, shadowOffset: { width: 0, height: 14 }, shadowOpacity: 1, shadowRadius: 24, elevation: 20 },
  offerContent: { flex: 1 },
  
  // SLIMMER FONT WEIGHTS
  offerLabel: { fontSize: 11, fontFamily: 'Poppins-SemiBold', color: COLORS.gold, letterSpacing: 1, marginBottom: 6 },
  offerTitle: { fontSize: 18, fontFamily: 'Poppins-Bold', color: '#ffffff', lineHeight: 26, marginBottom: 12 },
  
  dotsRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(244, 176, 0, 0.3)', marginRight: 6 },
  dotActive: { width: 16, backgroundColor: COLORS.gold },
  claimBtn: { backgroundColor: COLORS.gold, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, shadowColor: COLORS.gold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 17, elevation: 17 },
  claimBtnText: { color: '#000000', fontFamily: 'Poppins-SemiBold', fontSize: 12 },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  
  // SLIMMER FONT WEIGHTS
  sectionTitle: { fontSize: 20, fontFamily: 'Poppins-Bold', color: COLORS.navy },
  viewAll: { fontSize: 14, fontFamily: 'Poppins-Medium', color: COLORS.gold },

  // REMOVED 'gap' to prevent crashes on older Androids. Used 'space-between' safely.
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14, marginBottom: 20 },
  
  cardWrapper: { backgroundColor: '#ffffff', borderRadius: 28, shadowColor: 'rgba(0, 0, 0, 0.63)', shadowOffset: { width: -6, height: 10 }, shadowOpacity: 0.12, shadowRadius: 14, elevation: 6 },
  serviceCard: { flex: 1, borderRadius: 28, padding: 18, justifyContent: 'space-between', borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.9)', borderBottomWidth: 0.5, borderRightWidth: 0.5 },
  cardTopRow: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', position: 'relative' },
  tinyArrow: { position: 'absolute', top: 0, right: 0, fontSize: 16, fontWeight: '900', opacity: 0.4 },
  
  iconBox: { borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.7, shadowRadius: 8, elevation: 8 },
  
  cardBottomText: { marginTop: 10, alignItems: 'flex-start' },
  
  // SLIMMER FIXED FONTS
  serviceLabel: { fontSize: 15, fontFamily: 'Poppins-Bold', color: COLORS.navy, marginBottom: 2, textAlign: 'left' },
  serviceSubtitle: { fontSize: 12, fontFamily: 'Poppins-Medium', opacity: 0.8, textAlign: 'left' },
  
  secondaryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(254, 248, 235, 0.85)', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)', shadowColor: '#E5D6B8', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 3 },
  secondaryIconBox: { width: 52, height: 52, borderRadius: 18, backgroundColor: COLORS.gold, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  
  // SLIMMER FIXED FONTS
  secondaryTitle: { fontSize: 15, fontFamily: 'Poppins-Bold', color: COLORS.navy, marginBottom: 4 },
  secondarySubtitle: { fontSize: 13, fontFamily: 'Poppins-Regular', color: COLORS.textGray },
});