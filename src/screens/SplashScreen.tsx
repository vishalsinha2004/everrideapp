import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  ActivityIndicator,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1',
  navy: '#122C6F',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
};

interface SplashScreenProps {
  onComplete: () => void;
  isServerReady?: boolean; // Set this to true when your app finishes loading
}

export default function SplashScreen({ onComplete, isServerReady = true }: SplashScreenProps) {
  // --- ANIMATION VALUES ---
  // 1. Logo pop animation
  const logoAnim = useRef(new Animated.Value(0)).current; 
  // 2. Text sliding reveal
  const textWidth = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  // 3. Server waiting message
  const waitOpacity = useRef(new Animated.Value(0)).current;
  // 4. Final screen fade out
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const [showWaitingText, setShowWaitingText] = useState(false);

  useEffect(() => {
    // 1. The initial pop animation (at 100ms)
    const popAnimation = Animated.sequence([
      Animated.delay(100),
      Animated.spring(logoAnim, {
        toValue: 1,
        friction: 10,
        tension: 15,
        useNativeDriver: true,
      }),
    ]);

    // 2. The Text Reveal animation (slides out from behind logo at 900ms)
    const revealAnimation = Animated.sequence([
      Animated.delay(900),
      Animated.parallel([
        Animated.timing(textWidth, {
          toValue: 200,
          duration: 1800, // Increased from 1200ms
          easing: Easing.bezier(0.25, 1, 0.5, 1),
          useNativeDriver: false,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1800, // Increased from 1200ms
          useNativeDriver: false,
        }),
      ]),
    ]);

    popAnimation.start();
    revealAnimation.start();

    const waitingTimer = setTimeout(() => {
      setShowWaitingText(true);
      Animated.timing(waitOpacity, {
        toValue: 1,
        duration: 2000, // Increased from 1500ms
        useNativeDriver: true,
      }).start();
    }, 5500);

    return () => clearTimeout(waitingTimer);
  }, [logoAnim, textWidth, textOpacity, waitOpacity]);

  useEffect(() => {
    if (isServerReady) {
      const hideTimer = setTimeout(() => {
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 1200, // Increased from 800ms
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          onComplete();
        });
      }, 2000);

      return () => clearTimeout(hideTimer);
    }
  }, [isServerReady, onComplete, screenOpacity]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Background Gradient */}
      <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={StyleSheet.absoluteFillObject} />

      {/* CENTERED LOGO AND TEXT */}
      <View style={styles.animationWrapper}>
        
        {/* 1. THE LOGO */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoAnim.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 1, 1] }),
              transform: [
                { scale: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) },
                { translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
              ],
            },
          ]}
        >
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </Animated.View>

        {/* 2. THE TEXT REVEAL ("EVERRIDE") */}
        <Animated.View
          style={[
            styles.textRevealContainer,
            {
              width: textWidth,
              opacity: textOpacity,
            },
          ]}
        >
          <Text style={styles.brandText} numberOfLines={1}>
            <Text style={{ color: COLORS.navy }}>EVER</Text>
            <Text style={{ color: COLORS.gold }}>RIDE</Text>
          </Text>
        </Animated.View>

      </View>

      {/* 3. WAKING UP SERVER MESSAGE */}
      <Animated.View style={[styles.waitingContainer, { opacity: waitOpacity }]} pointerEvents="none">
        {showWaitingText && !isServerReady && (
          <>
            <ActivityIndicator size="large" color={COLORS.navy} style={styles.spinner} />
            <Text style={styles.waitingTitle}>Waking up secure server...</Text>
            <Text style={styles.waitingSub}>(This can take up to 50 seconds)</Text>
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, // Ensure Splash is always on top
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Shifts the whole block slightly left so it centers perfectly when the text slides out
    transform: [{ translateX: -10 }], 
  },
  logoContainer: {
    zIndex: 20, // Keeps the logo ABOVE the text so text slides OUT from behind it
  },
  logoImage: {
    width: 60,
    height: 60,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  textRevealContainer: {
    overflow: 'hidden', // Crucial: hides text while width is 0
    justifyContent: 'center',
    paddingLeft: 10, // Creates a small gap between the logo and text
  },
  brandText: {
    fontSize: 30,
    fontFamily: 'Syne-Bold', // Slimmer and cleaner than Black
    letterSpacing: -0.5,
  },
  waitingContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    width: '100%',
  },
  spinner: {
    marginBottom: 12,
  },
  waitingTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.navy,
    opacity: 0.7,
  },
  waitingSub: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 4,
  },
});