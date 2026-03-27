import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Animated, Image } from 'react-native';

const COLORS = {
  navy: '#122C6F',
  gold: '#EDAB0C',
  // A slightly translucent version of your app's background color
  glassBg: 'rgba(248, 244, 237, 0.95)', 
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
            source={require('../assets/logo.png')} // <-- Place your logo.png in src/assets/ folder!
            style={styles.logo}
            resizeMode="contain"
          />
          
          {/* THE DUAL-COLOR TEXT */}
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            <Text style={{ color: "#000000" }}>EVER</Text>
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
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    // Safely handles Android notch/status bar spacing
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30) : 10,
  },
  brandContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', // Aligns the logo perfectly with the text
    paddingRight: 10,
  },
  logo: {
    width: 32,   // Adjust this size to fit your specific logo
    height: 32,  // Adjust this size to fit your specific logo
    marginRight: 8, // Adds breathing room between the logo and the text
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontStyle:'italic',
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
});