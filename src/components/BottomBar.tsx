import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';

const COLORS = {
  navy: '#122C6F',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
};

// RESPONSIVE BREAKPOINTS
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;
const isMediumScreen = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;

const getFontSize = (small: number, medium: number, large: number) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
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
const BottomTab = ({ label, onPress, active = false }: { label: string, onPress: () => void, active?: boolean }) => (
  <TouchableOpacity style={styles.tabItem} activeOpacity={0.6} onPress={onPress}>
    <View style={styles.iconContainer}>
      <TabIcon name={label} active={active} />
    </View>
    <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

export default function BottomBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const handleNavigation = (screenName: string) => {
    if (route.name !== screenName) {
      navigation.navigate(screenName as never);
    }
  };

  return (
    <View style={styles.bottomNav}>
      <BottomTab label="Home" active={route.name === 'Home'} onPress={() => handleNavigation('Home')} />
      <BottomTab label="Services" active={route.name === 'Services'} onPress={() => handleNavigation('Services')} />
      
      <BottomTab label="Activity" active={route.name === 'Activity'} onPress={() => handleNavigation('Activity')} />
      <BottomTab label="Account" active={route.name === 'Account'} onPress={() => handleNavigation('Account')} />
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
    paddingTop: isSmallScreen ? 10 : 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : (isSmallScreen ? 10 : 12),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
    width: isSmallScreen ? 60 : isMediumScreen ? 65 : 65
  },
  iconContainer: {
    height: isSmallScreen ? 22 : 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: { 
    fontSize: getFontSize(8, 9, 10), 
    fontWeight: '500', 
    color: COLORS.textGray, 
    marginTop: isSmallScreen ? 2 : 4,
    fontFamily: 'Poppins-Light',
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
    fontSize: getFontSize(9, 10, 11), 
    fontWeight: '600', 
    textAlign: 'center' 
  },
});