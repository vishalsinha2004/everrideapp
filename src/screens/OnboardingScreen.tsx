import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated, 
  SafeAreaView, 
  StatusBar, 
  useWindowDimensions, 
  Platform 
} from 'react-native';
import Svg, { Path, Polyline, Line, Circle, Polygon } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = {
  cream: '#FBF8F2', navy: '#122C6F', navy2: '#0E2255', amber: '#EDAB0C', amber2: '#FFC72C',
  cyan: '#1E9EC0', olive: '#5E8704', peach: '#FFC87D', peachDark: '#E68A00', darkBg: '#08101E',
  gradientTop: '#F8F4ED', gradientBottom: '#E8DFD1', 
};

// 1. REPLACED EMOJIS WITH STRING IDs
const ONBOARDING_DATA = [
  { id: 1, title1: 'Fast & Reliable\n', title2: 'Metro Rides.', title2Color: COLORS.cyan, desc: 'Beat the traffic with real-time Ahmedabad Metro schedules.', icon: 'metro', iconLabel: 'Metro', clayBg: COLORS.navy, clayShadow: 'rgba(18,44,111,0.6)', dot1Bg: COLORS.cyan, dot1Text: 'Metro · 4 min', dot2Bg: COLORS.amber, dot2Text: 'Thaltej ➝ Vastral', bgBase: '#0B1F50', blobColor: COLORS.cyan },
  { id: 2, title1: 'Eco-friendly\n', title2: 'BRTS & AMTS.', title2Color: COLORS.olive, desc: 'Navigate the city efficiently with live seat availability.', icon: 'bus', iconLabel: 'City Bus', clayBg: COLORS.olive, clayShadow: 'rgba(94,135,4,0.5)', dot1Bg: COLORS.olive, dot1Text: 'BRTS · On time', dot2Bg: COLORS.amber, dot2Text: 'Route 201', bgBase: '#152001', blobColor: COLORS.olive },
  { id: 3, title1: 'Comfortable\n', title2: 'Premium Cabs.', title2Color: COLORS.peachDark, desc: 'Book a premium cab in seconds for a door-to-door ride.', icon: 'cab', iconLabel: 'Book Cab', clayBg: COLORS.peach, clayShadow: 'rgba(255,200,125,0.4)', iconColor: COLORS.navy2, dot1Bg: COLORS.navy, dot1Text: 'Mini · 3 min', dot2Bg: COLORS.peach, dot2Text: 'Cab · ₹120 Est.', bgBase: '#3D2507', blobColor: COLORS.peach },
  { id: 4, title1: 'Quick & Easy\n', title2: 'City Autos.', title2Color: COLORS.cyan, desc: 'No more haggling. Get upfront fares and instant bookings.', icon: 'auto', iconLabel: 'Auto', clayBg: COLORS.cyan, clayShadow: 'rgba(30,158,192,0.4)', dot1Bg: COLORS.cyan, dot1Text: 'Auto · 2 min', dot2Bg: COLORS.amber, dot2Text: '₹45 Fixed', bgBase: '#073542', blobColor: COLORS.cyan },
  { id: 5, title1: 'Track Every\nJourney ', title2: 'Live.', title2Color: COLORS.amber, desc: 'Share your real-time location with loved ones and arrive safely.', icon: 'track', iconLabel: 'Track', clayBg: COLORS.amber, clayShadow: 'rgba(237,171,12,0.5)', dot1Bg: COLORS.amber, dot1Text: 'Live Tracking', dot2Bg: COLORS.cyan, dot2Text: 'Share Location', bgBase: '#1E0D2E', blobColor: COLORS.amber },
];

const BackIcon = () => <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><Line x1="19" y1="12" x2="5" y2="12" /><Polyline points="12 19 5 12 12 5" /></Svg>;
const NextIcon = () => <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><Line x1="5" y1="12" x2="19" y2="12" /><Polyline points="12 5 19 12 12 19" /></Svg>;
const CheckIcon = () => <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><Polyline points="20 6 9 17 4 12" /></Svg>;

// 2. PROFESSIONAL SVG ICONS HELPER
const OnboardingIcon = ({ id, color, isSmallScreen }: { id: string, color: string, isSmallScreen: boolean }) => {
  const size = isSmallScreen ? "34" : "42"; 
  const strokeW = "2";

  switch (id) {
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
    case 'auto':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Polygon points="3 11 22 2 13 21 11 13 3 11" />
        </Svg>
      );
    case 'track':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <Circle cx="12" cy="10" r="3" />
        </Svg>
      );
    default:
      return null;
  }
};

export default function OnboardingScreen({ navigation }: any) {
  // TRUE RESPONSIVE SIZING
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  const isShortScreen = SCREEN_HEIGHT < 700;

  const [step, setStep] = useState(1);
  const data = ONBOARDING_DATA[step - 1];

  const floatAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(floatAnim, { toValue: 1, duration: 1750, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 1750, useNativeDriver: true })
    ])).start();
  }, [floatAnim]);

  const floatStyle = { 
    transform: [
      { translateY: floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -13] }) }, 
      { rotate: floatAnim.interpolate({ inputRange: [0, 1], outputRange: ['-1deg', '1deg'] }) }
    ] 
  };

  const goNext = () => step < 5 ? setStep(step + 1) : navigation.navigate('Login');
  const goBack = () => step > 1 && setStep(step - 1);

  const getClayStyle = (bgColor: string, shadowColor?: string) => ({
    backgroundColor: bgColor, borderTopWidth: 2, borderLeftWidth: 2, borderBottomWidth: 4, borderRightWidth: 4,
    borderTopColor: 'rgba(255,255,255,0.3)', borderLeftColor: 'rgba(255,255,255,0.3)', borderBottomColor: 'rgba(0,0,0,0.25)', borderRightColor: 'rgba(0,0,0,0.25)',
    shadowColor: shadowColor || bgColor, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.6, shadowRadius: 16, elevation: 10,
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: data.bgBase }]}>
      {/* FIXED: Made StatusBar translucent to prevent it from overlapping on Android */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <View style={[styles.obWrap, { backgroundColor: data.bgBase }]}>
        
        {/* Decorative Background Blobs */}
        <View style={[styles.blob, { backgroundColor: data.blobColor, top: -40, left: -40 }]} />
        <View style={[styles.blob, { backgroundColor: data.blobColor, bottom: isShortScreen ? 250 : 300, right: -40, width: 200, height: 200, opacity: 0.15 }]} />

        {/* Top Header */}
        <View style={styles.obTop}>
          <Text style={[styles.obLogo, isSmallScreen && { fontSize: 13 }]}>EVERRIDE</Text>
          {step === 1 ? (
            <TouchableOpacity style={styles.obSkipBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.obSkipText}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.obBackBtn} onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
          )}
        </View>

        {/* Visual Area */}
        <View style={styles.obVisual}>
          <View style={styles.gCircleOuter}>
            <View style={styles.gCircleMid}>
              <View style={styles.gCircleInner} />
            </View>
          </View>
          
          <Animated.View style={[styles.iconPill, getClayStyle(data.clayBg, data.clayShadow), floatStyle, isSmallScreen && { width: 90, height: 90, borderRadius: 28 }]}>
            {/* RENDER THE SVG ICON HERE */}
            <OnboardingIcon id={data.icon} color={data.iconColor || '#fff'} isSmallScreen={isSmallScreen} />
            <Text style={[styles.emLabel, { color: data.iconColor || '#fff' }, isSmallScreen && { fontSize: 8 }]}>{data.iconLabel}</Text>
          </Animated.View>
          
          {/* Adjusted Badge Positions */}
          <Animated.View style={[styles.fbadge, { top: '15%', left: '8%' }, floatStyle]}>
            <View style={[styles.fdot, { backgroundColor: data.dot1Bg }]} />
            <Text style={[styles.fbadgeText, isSmallScreen && { fontSize: 11 }]}>{data.dot1Text}</Text>
          </Animated.View>
          <Animated.View style={[styles.fbadge, { bottom: '20%', right: '5%' }, floatStyle]}>
            <View style={[styles.fdot, { backgroundColor: data.dot2Bg }]} />
            <Text style={[styles.fbadgeText, isSmallScreen && { fontSize: 11 }]}>{data.dot2Text}</Text>
          </Animated.View>
        </View>

        {/* BOTTOM CARD NOW USES LINEAR GRADIENT */}
        <LinearGradient 
          colors={[COLORS.gradientTop, COLORS.gradientBottom]} 
          style={[styles.obCard, isShortScreen && { height: 320, paddingBottom: 16 }]}
        >
          <View style={styles.obCardInner}>
            <Text style={styles.obCounter}>0{step} / 05</Text>
            <Text style={[styles.obHeading, isSmallScreen && { fontSize: 26, lineHeight: 32 }]}>
              {data.title1}<Text style={{ color: data.title2Color }}>{data.title2}</Text>
            </Text>
            <Text style={[styles.obDesc, isSmallScreen && { fontSize: 13, lineHeight: 20 }]}>{data.desc}</Text>

            <View style={styles.obRow}>
              <View style={styles.obDots}>
                {[1, 2, 3, 4, 5].map(i => (
                  <View key={i} style={[styles.odot, i === step && styles.odotActive]} />
                ))}
              </View>
              <TouchableOpacity 
                style={[styles.obNextBtn, getClayStyle(step === 5 ? COLORS.amber : COLORS.navy), isSmallScreen && { width: 56, height: 56, borderRadius: 20 }]} 
                onPress={goNext}
              >
                {step === 5 ? <CheckIcon /> : <NextIcon />}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // FIXED: Added dynamic paddingTop for Android to protect the safe area properly
  safeArea: { 
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  obWrap: { flex: 1, position: 'relative' },
  blob: { position: 'absolute', width: 260, height: 260, borderRadius: 130, opacity: 0.25 },
  
  // Adjusted top positioning to look perfect below the Safe Area padding we just added
  obTop: { 
    position: 'absolute', 
    top: 16, 
    left: 0, 
    right: 0, 
    paddingHorizontal: 24, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    zIndex: 10 
  },
  
  // POPPINS APPLIED TO ALL TEXT
  obLogo: { fontFamily: 'Syne-Bold', fontSize: 16, letterSpacing: 2, color: 'rgba(255,255,255,0.9)' },
  
  obBackBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  obSkipBtn: { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', borderWidth: 1, paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20 },
  obSkipText: { color: 'rgba(255,255,255,0.9)', fontFamily: 'Poppins-SemiBold', fontSize: 13 },
  
  obVisual: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 350 },
  
  gCircleOuter: { width: 268, height: 268, borderRadius: 134, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute' },
  gCircleMid: { width: 196, height: 196, borderRadius: 98, backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  gCircleInner: { width: 128, height: 128, borderRadius: 64, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 },
  iconPill: { width: 104, height: 104, borderRadius: 34, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  
  emLabel: { fontFamily: 'Poppins-Bold', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.9, marginTop: 6 },
  
  fbadge: { position: 'absolute', zIndex: 3, backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.25)', borderWidth: 1, borderRadius: 16, paddingVertical: 8, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' },
  fdot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  fbadgeText: { fontFamily: 'Poppins-SemiBold', fontSize: 12, color: 'white', marginTop: Platform.OS === 'android' ? 2 : 0 },
  
  obCard: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 350, 
    borderTopLeftRadius: 40, borderTopRightRadius: 40, 
    shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 20, 
    borderTopWidth: 1, borderTopColor: '#FFF' 
  },
  obCardInner: { flex: 1, paddingTop: 36, paddingHorizontal: 32, paddingBottom: 24, maxWidth: 500, alignSelf: 'center', width: '100%' },
  
  obCounter: { fontFamily: 'Poppins-Bold', fontSize: 12, letterSpacing: 2, color: '#A0A0A8', marginBottom: 12 },
  obHeading: { fontFamily: 'Poppins-Black', fontSize: 32, color: '#0E2255', lineHeight: 38, marginBottom: 12 },
  obDesc: { fontFamily: 'Poppins-Regular', fontSize: 15, lineHeight: 24, color: '#6B6B7B', marginBottom: 20, maxWidth: '95%' },
  
  obRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' },
  obDots: { flexDirection: 'row', alignItems: 'center' },
  odot: { height: 8, width: 8, borderRadius: 4, backgroundColor: '#D0D0D8', marginRight: 8 },
  odotActive: { width: 32, backgroundColor: '#122C6F' },
  obNextBtn: { width: 64, height: 64, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});