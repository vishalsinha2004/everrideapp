import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const COLORS = {
  navy: '#122C6F',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
};

// Reusable SVG Icon Helper
const TabIcon = ({ name, active }: { name: string, active: boolean }) => {
  const color = active ? COLORS.gold : COLORS.textGray;
  
  switch (name) {
    case 'Home':
      return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M9 22V12h6v10" />
        </Svg>
      );
    case 'Services':
      return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
        </Svg>
      );
    case 'Activity':
      return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </Svg>
      );
    case 'Account':
      return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
      );
    default:
      return null;
  }
};

// Reusable tab component
const BottomTab = ({ label, active = false }: { label: string, active?: boolean }) => (
  <TouchableOpacity style={styles.tabItem} activeOpacity={0.6}>
    <View style={styles.iconContainer}>
      <TabIcon name={label} active={active} />
    </View>
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

export default function BottomBar() {
  return (
    <View style={styles.bottomNav}>
      <BottomTab label="Home" active />
      <BottomTab label="Services" />
      
      {/* Prominent Middle Button */}
      {/* <View style={styles.fastRidesWrapper}>
        <TouchableOpacity style={styles.fastRidesBtn} activeOpacity={0.9}>
          <Text style={styles.fastRidesText}>Fast{'\n'}Rides</Text>
        </TouchableOpacity>
      </View> */}
      
      <BottomTab label="Activity" />
      <BottomTab label="Account" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12, // Protects the iOS swipe bar
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly more opaque so content doesn't bleed through heavily
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: { 
    alignItems: 'center', 
    width: 65 // Widened slightly to fit the word 'Activity'
  },
  iconContainer: {
    height: 26, // Gives the icons a consistent height boundary
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: { 
    fontSize: 10, 
    fontWeight: '700', 
    color: COLORS.textGray, 
    marginTop: 4 
  },
  tabLabelActive: { 
    color: COLORS.gold 
  },
  fastRidesWrapper: { 
    top: -20 
  }, 
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
  fastRidesText: { 
    color: '#fff', 
    fontSize: 11, 
    fontWeight: '800', 
    textAlign: 'center' 
  },
});