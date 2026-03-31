import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Animated, 
  SafeAreaView, 
  StatusBar,
  useWindowDimensions 
} from 'react-native';
import Svg, { Line, Polyline, Path, Rect } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient'; // <--- IMPORTED LINEAR GRADIENT

const COLORS = { 
  cream: '#FBF8F2', 
  navy: '#122C6F', 
  navy2: '#0E2255', 
  amber: '#EDAB0C', 
  cyan: '#1E9EC0', 
  olive: '#5E8704',
  // --- ADDED GRADIENT COLORS ---
  gradientTop: '#F8F4ED', 
  gradientBottom: '#E8DFD1'
};

// --- SVG ICONS ---
const BackIcon = ({ color = "rgba(255,255,255,0.9)" }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="19" y1="12" x2="5" y2="12" />
    <Polyline points="12 19 5 12 12 5" />
  </Svg>
);

const LockIcon = ({ color = "rgba(255,255,255,0.8)", size = 42 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

export default function OtpScreen({ navigation }: any) {
  // --- RESPONSIVE MATH ---
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const isSmallScreen = SCREEN_WIDTH < 375;
  
  // Cap width on tablets/large screens so inputs don't stretch too wide
  const CONTENT_MAX_WIDTH = Math.min(SCREEN_WIDTH, 500); 
  // Calculate exact box width dynamically: (TotalWidth - ContainerPadding - GapPadding) / 6
  const OTP_BOX_WIDTH = (CONTENT_MAX_WIDTH - (28 * 2) - (10 * 5)) / 6;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [secs, setSecs] = useState(59);
  const [isSuccess, setIsSuccess] = useState(false);
  const refs = useRef<any>([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval = setInterval(() => setSecs(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 7, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -7, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 7, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true })
    ]).start();
  };

  const handleChange = (text: string, index: number) => {
    const val = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 5) refs.current[index + 1].focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      refs.current[index - 1].focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    if (otp.join('') === '123456') {
      setIsSuccess(true);
      setTimeout(() => navigation.replace('Home'), 800); 
    } else {
      triggerShake();
    }
  };

  const isFull = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <KeyboardAvoidingView style={styles.authWrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        {/* HERO SECTION */}
        <View style={styles.authHero}>
          <View style={styles.ahBlob1} />
          <View style={styles.ahBlob2} />
          <View style={styles.authBrand}>
            <Text style={[styles.authBname, isSmallScreen && { fontSize: 16 }]}>EVERRIDE</Text>
            <Text style={styles.authBtag}>Every ride, on time</Text>
          </View>
          
          <View style={styles.otpCenter}>
            <View style={styles.otpCenterIcon}>
              <LockIcon size={isSmallScreen ? 36 : 42} />
            </View>
            <Text style={[styles.otpCenterText, isSmallScreen && { fontSize: 12 }]}>OTP VERIFICATION</Text>
          </View>
        </View>

        {/* BOTTOM SHEET - NOW USES LINEAR GRADIENT */}
        <LinearGradient 
          colors={[COLORS.gradientTop, COLORS.gradientBottom]} 
          style={styles.authSheet}
        >
          <ScrollView contentContainerStyle={{flexGrow:1, alignItems: 'center'}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            {/* Max width wrapper for large screens/tablets */}
            <View style={{ width: '100%', maxWidth: 500 }}>
              
              <View style={styles.backRow}>
                <TouchableOpacity style={styles.backIco} onPress={() => navigation.goBack()}>
                  <BackIcon color={COLORS.navy2} />
                </TouchableOpacity>
                <Text style={[styles.backLbl, isSmallScreen && { fontSize: 20 }]}>Verify OTP</Text>
              </View>

              <Animated.View style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <TextInput
                    key={i} 
                    ref={el => { refs.current[i] = el; }}
                    style={[
                      styles.otpC, 
                      { width: OTP_BOX_WIDTH }, 
                      otp[i] ? styles.otpCFilled : null,
                      isSmallScreen && { height: 52, fontSize: 20 }
                    ]}
                    keyboardType="number-pad" 
                    maxLength={1} 
                    value={otp[i]}
                    onChangeText={(t) => handleChange(t, i)} 
                    onKeyPress={(e) => handleKeyPress(e, i)} 
                    selectTextOnFocus
                  />
                ))}
              </Animated.View>

              <Text style={styles.otpInfo}>
                OTP sent to +91 <Text style={{ fontFamily: 'Poppins-Bold', color: COLORS.navy2 }}>9876543210</Text>
              </Text>
              
              {secs > 0 ? (
                <Text style={styles.otpResend}>Resend in 00:{secs < 10 ? `0${secs}` : secs}</Text>
              ) : (
                <TouchableOpacity onPress={() => setSecs(59)}>
                  <Text style={[styles.otpResend, { color: COLORS.amber }]}>Resend OTP</Text>
                </TouchableOpacity>
              )}

              <View style={[styles.demoBox, { marginBottom: 20 }]}>
                <Text style={styles.demoLbl}>⚡ Demo OTP</Text>
                <Text style={styles.demoText}>
                  <Text style={{ fontFamily: 'Poppins-Bold' }}>Use:</Text> 123456
                </Text>
              </View>

              <TouchableOpacity 
                style={[
                  styles.cta, 
                  isSuccess ? styles.ctaSuccess : styles.ctaAmber, 
                  !isFull && !isSuccess && styles.ctaDisabled,
                  isSmallScreen && { height: 56 }
                ]} 
                disabled={!isFull || isSuccess} 
                onPress={handleVerify}
              >
                <Text style={styles.ctaText}>
                  {isSuccess ? '✓ Welcome to EverRide!' : 'Verify & Continue'}
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </LinearGradient>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.navy },
  authWrap: { flex: 1, backgroundColor: COLORS.cream },
  
  // HERO SECTION
  authHero: { height: 300, backgroundColor: COLORS.navy, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, overflow: 'hidden', position: 'relative' },
  ahBlob1: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -60 },
  ahBlob2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(30,158,192,0.2)', bottom: 20, left: -20 },
  
  authBrand: { position: 'absolute', top: 56, left: 28, zIndex: 2 },
  authBname: { fontFamily: 'Syne-Bold', fontSize: 18, letterSpacing: 3, color: 'white' },
  authBtag: { fontFamily: 'Poppins-Medium', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: -2 },
  
  otpCenter: { position: 'absolute', bottom: 44, alignSelf: 'center', alignItems: 'center' },
  otpCenterIcon: { marginBottom: 12 }, 
  otpCenterText: { fontFamily: 'Poppins-Bold', fontSize: 13, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 },
  
  // BOTTOM SHEET - Added borderTopWidth and borderTopColor for glass edge
  authSheet: { 
    flex: 1, 
    marginTop: -30, 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    paddingTop: 36, 
    paddingHorizontal: 28, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF'
  },
  
  backRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  backIco: { width: 44, height: 44, borderRadius: 16, borderWidth: 1.5, borderColor: '#E8E8E0', backgroundColor: COLORS.cream, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  backLbl: { fontFamily: 'Poppins-Bold', fontSize: 22, color: COLORS.navy2, marginTop: Platform.OS === 'android' ? 4 : 0 },
  
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  otpC: { 
    height: 60, 
    borderWidth: 2, 
    borderColor: '#E5E5EA', 
    borderRadius: 16, 
    backgroundColor: '#FAFAFA', 
    textAlign: 'center', 
    fontFamily: 'Poppins-Bold', 
    fontSize: 24, 
    color: COLORS.navy2,
    paddingVertical: 0
  },
  otpCFilled: { borderColor: COLORS.amber, backgroundColor: '#FFFBEE', color: COLORS.navy },
  
  otpInfo: { fontFamily: 'Poppins-Regular', textAlign: 'center', fontSize: 14, color: '#8A8D9F', marginBottom: 6 },
  otpResend: { fontFamily: 'Poppins-Bold', textAlign: 'center', fontSize: 14, color: COLORS.cyan, marginBottom: 24 },
  
  demoBox: { backgroundColor: '#FFFBEE', borderWidth: 1, borderColor: '#FFE9A0', borderRadius: 18, paddingVertical: 16, paddingHorizontal: 20, marginTop: 20 },
  demoLbl: { fontFamily: 'Poppins-Black', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: COLORS.amber, marginBottom: 6 },
  demoText: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#665500' },
  
  cta: { width: '100%', height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  ctaAmber: { backgroundColor: COLORS.amber, shadowColor: COLORS.amber },
  ctaSuccess: { backgroundColor: COLORS.olive, shadowColor: COLORS.olive },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { fontFamily: 'Poppins-Bold', fontSize: 16, letterSpacing: 0.5, color: 'white', marginTop: Platform.OS === 'android' ? 2 : 0 },
});