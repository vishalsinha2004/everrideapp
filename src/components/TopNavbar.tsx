import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Animated, Image, Dimensions } from 'react-native';

const COLORS = {
  navy: '#122C6F',
  gold: '#EDAB0C',
  // A slightly translucent version of your app's background color
  glassBg: 'rgba(248, 244, 237, 0.95)', 
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

// Accept scrollY as a prop from the parent screen
export default function TopNavbar({ scrollY }: { scrollY?: Animated.Value }) {
  // Fallback just in case scrollY isn't passed
  const safeScrollY = scrollY || new Animated.Value(0);

  // Animate opacity from 0 (transparent) to 1 (solid/glassy) between 0px and 40px of scrolling
  const bgOpacity = safeScrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* THE ANIMATED GLASS BACKGROUND */}
      <Animated.View style={[styles.glassBackground, { opacity: bgOpacity }]} />

      {/* THE HEADER CONTENT */}
      <View style={styles.headerContent}>
        
        {/* BRANDING WRAPPER (Logo + Text) */}
        <View style={styles.brandContainer}>
          {/* THE LOGO */}
          <Image 
            source={require('../../assets/logo.png')} // <-- Place your logo.png in src/assets/ folder!
            style={styles.logo}
            resizeMode="contain"
          />
          
          {/* THE DUAL-COLOR TEXT */}
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            <Text style={{ color: COLORS.navy }}>EVER</Text>
            <Text style={{ color: COLORS.gold }}>RIDE</Text>
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Allows the background to sit behind the content
    position: 'relative',
    zIndex: 100, // Keeps navbar above scrolling content
    // --- ADDED WHITE BOTTOM LINE HERE ---
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.glassBg,
    // Optional: Add a subtle bottom shadow when scrolled
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 14 : isMediumScreen ? 16 : 20,
    paddingBottom: isSmallScreen ? 12 : 16,
    // Safely handles Android notch/status bar spacing
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) : 8,
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // Aligns the logo perfectly with the text
    paddingRight: 10,
  },
  logo: {
    width: isSmallScreen ? 28 : isMediumScreen ? 30 : 32,   // Adjust this size to fit your specific logo
    height: isSmallScreen ? 28 : isMediumScreen ? 30 : 32,  // Adjust this size to fit your specific logo
    marginRight: isSmallScreen ? 6 : 8, // Adds breathing room between the logo and the text
  },
  title: {
    fontSize: getFontSize(16, 18, 20),
    // Use the exact file name of the heaviest font weight you downloaded:
    fontFamily: 'Syne-Bold', 
    letterSpacing: -0.5,
    fontWeight: '600',
  },
  avatar: {
    width: isSmallScreen ? 34 : isMediumScreen ? 36 : 38,
    height: isSmallScreen ? 34 : isMediumScreen ? 36 : 38,
    borderRadius: isSmallScreen ? 17 : isMediumScreen ? 18 : 24,
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
    fontSize: getFontSize(14, 16, 18),
    fontWeight: '600',
    color: "#000000",
    fontFamily: 'Syne-Bold',
  },
});