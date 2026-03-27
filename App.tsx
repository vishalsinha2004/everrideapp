/**
 * Refactored React Native App
 * Enhanced Glassmorphism & Claymorphism UI with Gradient Background
 */
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 14;
const HORIZONTAL_PADDING = 20;
const CARD_WIDTH = (SCREEN_WIDTH - (HORIZONTAL_PADDING * 2) - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.05; // Slightly taller than wide
import React from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// REMOVED the bad "Color" import!

const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1', 
  navy: '#122C6F',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
};

const SERVICES = [
  { 
    id: 'bus', 
    label: 'Bus', 
    subtitle: 'Eco-friendly', 
    colors: ['rgba(255, 255, 255, 0.85)', 'rgba(215, 230, 195, 0.95)'], 
    iconBg: '#5E8704', 
    icon: '🚌' 
  },
  { 
    id: 'metro', 
    label: 'Metro', 
    subtitle: 'Fastest route', 
    colors: ['rgba(255, 255, 255, 0.85)', 'rgba(205, 215, 235, 0.95)'], 
    iconBg: '#122C6F', 
    icon: '🚇' 
  },
  { 
    id: 'cab', 
    label: 'Cab', 
    subtitle: 'Door to door', 
    colors: ['rgba(255, 255, 255, 0.85)', 'rgba(245, 220, 175, 0.95)'], 
    iconBg: '#EDAB0C', 
    icon: '🚕' 
  },
  { 
    id: 'multimode', 
    label: 'Multimode', 
    subtitle: 'Smart combo', 
    colors: ['rgba(255, 255, 255, 0.85)', 'rgba(190, 230, 235, 0.95)'], 
    iconBg: '#1E9EC0',
    icon: '🔀' 
  },
];

export default function App() {
  return (
    <LinearGradient 
      colors={[COLORS.gradientTop, COLORS.gradientBottom]} 
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>EVERRIDE</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <Text style={styles.pinIcon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pickup location"
              placeholderTextColor={COLORS.textGray}
            />
            <TouchableOpacity style={styles.micButton} activeOpacity={0.8}>
              <Text style={styles.micIcon}>🎤</Text>
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

          {/* SERVICES SECTION HEADER */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>

          {/* --- ENHANCED 4-BOX GRID --- */}
          <View style={styles.gridContainer}>
            {SERVICES.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.cardWrapper}
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
          <View 
            style={[
              styles.iconBox, 
              { 
                backgroundColor: item.iconBg, 
                shadowColor: item.iconBg 
              }
            ]}
          >
            <Text style={styles.iconText}>{item.icon}</Text>
          </View>
          <Text style={[styles.tinyArrow, { color: item.iconBg }]}>↗</Text>
        </View>

                  <View style={styles.cardBottomText}>
                    <Text style={styles.serviceLabel}>{item.label}</Text>
                    <Text style={[styles.serviceSubtitle, { color: item.iconBg }]}>{item.subtitle}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* SECONDARY CARD */}
          <TouchableOpacity style={styles.secondaryCard} activeOpacity={0.8}>
            <View style={styles.secondaryIconBox}>
              <Text style={styles.iconText}>👥</Text>
            </View>
            <View>
              <Text style={styles.secondaryTitle}>Book for Someone Else</Text>
              <Text style={styles.secondarySubtitle}>Plan a ride for family</Text>
            </View>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
          
          <View style={{ height: 110 }} /> 
        </ScrollView>
      </SafeAreaView>

      {/* BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNav}>
        <BottomTab icon="🏠" label="Home" active />
        <BottomTab icon="↗️" label="Services" />
        <View style={styles.fastRidesWrapper}>
          <TouchableOpacity style={styles.fastRidesBtn} activeOpacity={0.9}>
            <Text style={styles.fastRidesText}>Fast{'\n'}Rides</Text>
          </TouchableOpacity>
        </View>
        <BottomTab icon="🎁" label="Offers" />
        <BottomTab icon="👤" label="Profile" />
      </View>
    </LinearGradient>
  );
}

const BottomTab = ({ icon, label, active = false }: any) => (
  <TouchableOpacity style={styles.tabItem}>
    <Text style={{ fontSize: 22, opacity: active ? 1 : 0.5 }}>{icon}</Text>
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30 : 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: COLORS.navy,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',                  
    shadowOffset: { width: 0, height: 6 },   
    shadowOpacity: 0.15,                     
    shadowRadius: 10,                        
    elevation: 8,                            
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.navy,
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    padding: 8,
    paddingLeft: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#d1d5db',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  pinIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, height: 40, fontSize: 16, color: COLORS.navy, fontWeight: '500' },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: { fontSize: 18 },

  offerCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#122C6F',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    overflow:'visible',
    shadowColor: COLORS.navy,                  
    shadowOffset: { width: 0, height: 14 },  
    shadowOpacity: 1,                     
    shadowRadius: 24,                        
    elevation: 20,                            
  },
  offerContent: { flex: 1 },
  offerLabel: { fontSize: 11, fontWeight: '800', color: COLORS.gold, letterSpacing: 1, marginBottom: 6 },
  offerTitle: { fontSize: 18, fontWeight: '900', color: '#ffffff', lineHeight: 24, marginBottom: 12 },
  dotsRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(244, 176, 0, 0.3)', marginRight: 6 },
  dotActive: { width: 16, backgroundColor: COLORS.gold },
  claimBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 1,                    
    shadowRadius: 17,                       
    elevation: 17,                          
  },
  claimBtnText: { color: '#000000', fontWeight: '800', fontSize: 12 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.navy },
  viewAll: { fontSize: 14, fontWeight: '700', color: COLORS.gold },

  gridContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: CARD_GAP,
  marginBottom: 20,
},
  cardWrapper: {
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  backgroundColor: '#ffffff',
  borderRadius: 28,
  shadowColor: 'rgba(0, 0, 0, 0.63)',
  shadowOffset: { width: -6, height: 10 },
  shadowOpacity: 0.12,
  shadowRadius: 14,
  elevation: 6,
},
 serviceCard: {
  flex: 1,
  borderRadius: 28,
  padding: 18,
  justifyContent: 'space-between',
  borderWidth: 1.5,
  borderColor: 'rgba(255, 255, 255, 0.9)',
  borderBottomWidth: 0.5,
  borderRightWidth: 0.5,
},
  
  cardTopRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    width: '100%',
    position: 'relative',
  },
  tinyArrow: { 
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 16, 
    fontWeight: '900', 
    opacity: 0.4, 
  },
  iconBox: {
  width: CARD_WIDTH * 0.38,         // ~38% of card width
  height: CARD_WIDTH * 0.38,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.4)',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.7,
  shadowRadius: 8,
  elevation: 8,
},
  iconText: {
  fontSize: CARD_WIDTH * 0.16,      // scales with card size
  textAlign: 'center',
  textAlignVertical: 'center',
  includeFontPadding: false,
},

  cardBottomText: { 
    marginTop: 10,
    alignItems: 'flex-start',
  },
  serviceLabel: {
  fontSize: CARD_WIDTH * 0.12,      // ~18-22px on most phones
  fontWeight: '900',
  color: COLORS.navy,
  marginBottom: 2,
  textAlign: 'left',                // Left-align like the icon
},
  serviceSubtitle: {
  fontSize: CARD_WIDTH * 0.075,     // ~11-13px on most phones
  fontWeight: '700',
  opacity: 0.8,
  textAlign: 'left',
},
  
  secondaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 248, 235, 0.85)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#E5D6B8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  secondaryIconBox: { width: 52, height: 52, borderRadius: 18, backgroundColor: COLORS.gold, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  secondaryTitle: { fontSize: 16, fontWeight: '900', color: COLORS.navy, marginBottom: 4 },
  secondarySubtitle: { fontSize: 13, fontWeight: '500', color: COLORS.textGray },
  arrowIcon: { marginLeft: 'auto', fontSize: 20, color: COLORS.gold, fontWeight: 'bold' },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: { alignItems: 'center', width: 60 },
  tabLabel: { fontSize: 10, fontWeight: '700', color: COLORS.textGray, marginTop: 4 },
  tabLabelActive: { color: COLORS.gold },
  fastRidesWrapper: { top: -20 },
  fastRidesBtn: {
    backgroundColor: COLORS.navy,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fastRidesText: { color: '#fff', fontSize: 11, fontWeight: '800', textAlign: 'center' },
});