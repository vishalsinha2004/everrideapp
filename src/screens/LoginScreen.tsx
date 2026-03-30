import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  useWindowDimensions
} from 'react-native';
import Svg, { Path, Circle, Rect, Polygon, Line } from 'react-native-svg';

const COLORS = { cream: '#FBF8F2', navy: '#122C6F', navy2: '#0E2255', cyan: '#1E9EC0', gold: '#EDAB0C' };

// --- PROFESSIONAL SVG ICONS ---
const TransportIcon = ({ id, color, size }: { id: string, color: string, size: number }) => {
  const strokeW = "2";
  switch (id) {
    case 'metro':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4 3h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <Path d="M4 11h16" /><Path d="M12 3v8" /><Path d="M8 19l-2 3" /><Path d="M16 19l2 3" /><Path d="M8 15h.01" /><Path d="M16 15h.01" />
        </Svg>
      );
    case 'bus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
          <Path d="M4 11h16" /><Path d="M8 15h.01" /><Path d="M16 15h.01" /><Path d="M6 18v2" /><Path d="M18 18v2" />
        </Svg>
      );
    case 'auto':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M5 10l-1 5v4h2v-2h12v2h2v-4l-1-5H5z" />
          <Path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
          <Circle cx="7" cy="17" r="2" /><Circle cx="17" cy="17" r="2" />
        </Svg>
      );
    case 'cab':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M10 7V5h4v2" />
          <Path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <Circle cx="7" cy="17" r="2" /><Path d="M9 17h6" /><Circle cx="17" cy="17" r="2" />
        </Svg>
      );
    default:
      return null;
  }
};

const IndianFlagIcon = () => (
  <Svg width="22" height="16" viewBox="0 0 30 20">
    <Rect width="30" height="6.6" fill="#FF9933" />
    <Rect y="6.6" width="30" height="6.6" fill="#FFFFFF" />
    <Rect y="13.2" width="30" height="6.8" fill="#138808" />
    <Circle cx="15" cy="10" r="2.5" stroke="#000080" strokeWidth="0.8" fill="none" />
  </Svg>
);

const LightningIcon = ({ color }: { color: string }) => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Svg>
);

// --- CHIP DATA ---
const CHIPS = [
  { id: 'metro', label: 'Metro' },
  { id: 'bus', label: 'BRTS' },
  { id: 'auto', label: 'Auto' },
  { id: 'cab', label: 'Cab' }
];

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  
  // --- RESPONSIVE MATH ---
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  const isShortScreen = SCREEN_HEIGHT < 700;
  const heroHeight = isShortScreen ? 260 : 300;

  const handlePhoneFocus = () => { if (!phone) setPhone('9876543210'); };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <KeyboardAvoidingView style={styles.authWrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {/* RESPONSIVE HERO SECTION */}
        <View style={[styles.authHero, { height: heroHeight }]}>
          <View style={styles.ahBlob1} />
          <View style={styles.ahBlob2} />
          
          <View style={styles.authBrand}>
            <Text style={styles.authBname}>EVERRIDE</Text>
            <Text style={styles.authBtag}>Every ride, on time</Text>
          </View>
          
          <View style={styles.authChips}>
            {CHIPS.map(chip => (
              <View key={chip.id} style={styles.achip}>
                <TransportIcon id={chip.id} color="#FFFFFF" size={14} />
                <Text style={styles.achipText}>{chip.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.authSheet}>
          <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            {/* Centering wrapper for tablets/large screens */}
            <View style={{ maxWidth: 500, width: '100%', alignSelf: 'center', paddingTop: isShortScreen ? 16 : 24 }}>
              <Text style={styles.shTitle}>Welcome!</Text>
              <Text style={styles.shSub}>Sign in or create your account{'\n'}to start riding smarter.</Text>

              <View style={[styles.inpWrap, phone.length === 10 && styles.inpWrapActive]}>
                <View style={styles.flagRow}>
                  <IndianFlagIcon />
                  <Text style={styles.flagText}>+91</Text>
                </View>
                <TextInput
                  style={styles.theInput} 
                  placeholder="Enter phone number" 
                  placeholderTextColor="#B0B0B8"
                  keyboardType="number-pad" 
                  maxLength={10} 
                  value={phone} 
                  onChangeText={setPhone} 
                  onFocus={handlePhoneFocus}
                />
              </View>

              <TouchableOpacity 
                style={[styles.cta, phone.length < 10 ? styles.ctaDisabled : styles.ctaActive]} 
                disabled={phone.length < 10}
                onPress={() => navigation.navigate('Otp')} 
              >
                <Text style={styles.ctaText}>Continue</Text>
              </TouchableOpacity>

              <Text style={styles.termsText}>
                By continuing you agree to our <Text style={styles.termsLink}>Terms</Text> & <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>

              <View style={styles.demoBox}>
                <View style={styles.demoHeader}>
                  <LightningIcon color={COLORS.gold} />
                  <Text style={styles.demoLbl}>Demo Credentials</Text>
                </View>
                <Text style={styles.demoText}>
                  <Text style={styles.demoTextBold}>Number:</Text> 9876543210{'\n'}
                  <Text style={styles.demoTextBold}>OTP:</Text> 123456
                </Text>
              </View>

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navy }, 
  authWrap: { flex: 1, backgroundColor: COLORS.cream },
  
  authHero: { backgroundColor: COLORS.navy, borderBottomLeftRadius: 48, borderBottomRightRadius: 48, overflow: 'hidden', position: 'relative' },
  ahBlob1: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -60 },
  ahBlob2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(30,158,192,0.2)', bottom: 20, left: -20 },
  
  authBrand: { position: 'absolute', top: Platform.OS === 'android' ? 40 : 56, left: 28, zIndex: 2 },
  authBname: { fontFamily: 'Syne-Bold', fontSize: 20, letterSpacing: 2, color: 'white' },
  authBtag: { fontFamily: 'Poppins-Regular', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 0 },
  
  authChips: { position: 'absolute', bottom: 44, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', paddingHorizontal: 16 },
  achip: { 
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.18)', borderWidth: 1, 
    borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, marginHorizontal: 4, marginVertical: 4 
  },
  achipText: { fontFamily: 'Poppins-SemiBold', fontSize: 12, color: 'white', marginLeft: 6, marginTop: Platform.OS === 'android' ? 2 : 0 },
  
  authSheet: { flex: 1, marginTop: -30, backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 28, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5 },
  
  shTitle: { fontFamily: 'Poppins-Black', fontSize: 28, color: COLORS.navy2, marginBottom: 4 },
  shSub: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#888', marginBottom: 28, lineHeight: 22 },
  
  inpWrap: { flexDirection: 'row', alignItems: 'center', height: 64, backgroundColor: '#F5F5F8', borderWidth: 2, borderColor: '#EAEAEA', borderRadius: 20, paddingHorizontal: 20, marginBottom: 16 },
  inpWrapActive: { borderColor: COLORS.navy, backgroundColor: 'white' },
  
  flagRow: { flexDirection: 'row', alignItems: 'center', borderRightWidth: 2, borderRightColor: '#DDD', paddingRight: 14, marginRight: 14 },
  flagText: { fontFamily: 'Poppins-Bold', fontSize: 15, color: COLORS.navy2, marginLeft: 8, marginTop: Platform.OS === 'android' ? 2 : 0 },
  
  theInput: { flex: 1, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: COLORS.navy2, height: '100%', marginTop: Platform.OS === 'android' ? 4 : 0 },
  
  cta: { width: '100%', height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  ctaActive: { backgroundColor: COLORS.navy, shadowColor: COLORS.navy },
  ctaDisabled: { backgroundColor: COLORS.navy, opacity: 0.5 },
  ctaText: { fontFamily: 'Poppins-Bold', fontSize: 16, letterSpacing: 0.5, color: 'white' },
  
  termsText: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#AAA', textAlign: 'center', lineHeight: 20 },
  termsLink: { fontFamily: 'Poppins-SemiBold', color: COLORS.cyan },
  
  demoBox: { backgroundColor: '#FFFBEE', borderWidth: 1, borderColor: '#FFE9A0', borderRadius: 18, paddingVertical: 16, paddingHorizontal: 20, marginTop: 24 },
  demoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  demoLbl: { fontFamily: 'Poppins-Bold', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: COLORS.gold, marginLeft: 6, marginTop: Platform.OS === 'android' ? 2 : 0 },
  demoText: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#665500', lineHeight: 22 },
  demoTextBold: { fontFamily: 'Poppins-Bold' },
});