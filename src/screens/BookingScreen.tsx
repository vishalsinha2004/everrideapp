import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  useWindowDimensions,
  Image,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import Svg, { Path, Circle, Line, Polyline, Rect, Polygon } from 'react-native-svg';
import { WebView } from 'react-native-webview';

// --- SLIM & CREAM COLOR PALETTE ---
const COLORS = {
  navy: '#122C6F',
  navy2: '#0E2255',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
  lightGray: '#F8F4ED', 
  green: '#1E8E3E',
  redSOS: '#EF4444',
  borderLight: '#E5E7EB',
  whiteGlass: 'rgba(255, 255, 255, 0.95)',
  qrBg: '#F0F4FF', 
};

// --- ICONS ---
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="19" y1="12" x2="5" y2="12" />
    <Polyline points="12 19 5 12 12 5" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

const MessageIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Svg>
);

const StarIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

const LocationDotIcon = ({ color }: { color: string }) => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill={color} stroke="none">
    <Circle cx="12" cy="12" r="8" />
  </Svg>
);

const QRIcon = () => (
  <Svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="3" width="7" height="7" rx="1" />
    <Rect x="14" y="3" width="7" height="7" rx="1" />
    <Rect x="14" y="14" width="7" height="7" rx="1" />
    <Rect x="3" y="14" width="7" height="7" rx="1" />
    <Path d="M6 6h.01M17 6h.01M17 17h.01M6 17h.01" />
    <Path d="M9 14v3M14 9h3" />
  </Svg>
);

// --- TRANSPORT ICONS ---
const TransportIcon = ({ id, size, strokeColor }: { id: string, size: number, strokeColor: string }) => {
  if (id === 'auto') return <Image source={require('../../assets/auto_icon.png')} style={{ width: size, height: size }} resizeMode="contain" />;
  if (id === 'metro') return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 3h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <Path d="M4 11h16" /><Path d="M12 3v8" /><Path d="M8 19l-2 3" /><Path d="M16 19l2 3" /><Path d="M8 15h.01" /><Path d="M16 15h.01" />
    </Svg>
  );
  if (id === 'walk') return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="4" r="2" /><Path d="M12 6v6" /><Path d="M12 12l-3 5" /><Path d="M12 12l3 5" /><Path d="M8 8l4 2 4-2" />
    </Svg>
  );
  return null;
};

// --- LEAFLET HTML ---
const leafletHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
  <style>
    body, html { padding: 0; margin: 0; width: 100%; height: 100%; background-color: #E5E5EA; }
    #map { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; }
    .leaflet-control-attribution { display: none; }
    
    .driver-pulse {
      background-color: #122C6F;
      width: 16px; height: 16px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 0 rgba(18, 44, 111, 0.4);
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(18, 44, 111, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(18, 44, 111, 0); }
      100% { box-shadow: 0 0 0 0 rgba(18, 44, 111, 0); }
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
</head>
<body>
  <div id="map"></div>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      var map = L.map('map', { zoomControl: false }).setView([23.0240, 72.5780], 15);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

      var pickup = L.latLng(23.0260, 72.5750); 
      var driver = L.latLng(23.0210, 72.5800);   

      var pickupIcon = L.divIcon({ className: '', html: "<div style='background-color:#1E8E3E;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);'></div>", iconSize: [16, 16], iconAnchor: [8, 8]});
      var driverIcon = L.divIcon({ className: '', html: "<div class='driver-pulse'></div>", iconSize: [22, 22], iconAnchor: [11, 11]});

      L.marker(pickup, {icon: pickupIcon}).addTo(map);
      L.marker(driver, {icon: driverIcon}).addTo(map);

      var latlngs = [driver, [23.0230, 72.5790], [23.0250, 72.5770], pickup];
      var polyline = L.polyline(latlngs, {color: '#122C6F', weight: 4, opacity: 0.9}).addTo(map);
      
      map.fitBounds(polyline.getBounds(), { paddingBottomRight: [0, 250], paddingTopLeft: [50, 50] });
    });
  </script>
</body>
</html>
`;

export default function BookingScreen({ navigation, route }: any) {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  
  // Dynamic Route Params to decide what UI to show!
  const isMultiMode = route?.params?.isMultimode ?? false; 
  const rideType = route?.params?.selectedRideId ?? 'cab';

  // --- DRAG HANDLE ANIMATION LOGIC ---
  const MAX_HEIGHT = SCREEN_HEIGHT * 0.85; 
  const MIN_HEIGHT = SCREEN_HEIGHT * (isMultiMode ? 0.65 : 0.45); 
  const THRESHOLD = SCREEN_HEIGHT * 0.70;  
  
  const sheetHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;

  const toggleSheet = () => {
    const isCollapsed = (sheetHeight as any)._value < THRESHOLD;
    Animated.spring(sheetHeight, {
      toValue: isCollapsed ? MAX_HEIGHT : MIN_HEIGHT,
      useNativeDriver: false,
      bounciness: 6,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newHeight = MIN_HEIGHT - gestureState.dy;
        if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;
        if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
        sheetHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          Animated.spring(sheetHeight, { toValue: MAX_HEIGHT, useNativeDriver: false, bounciness: 6 }).start();
        } else if (gestureState.dy > 50) {
          Animated.spring(sheetHeight, { toValue: MIN_HEIGHT, useNativeDriver: false, bounciness: 6 }).start();
        } else {
          const currentHeight = (sheetHeight as any)._value;
          Animated.spring(sheetHeight, {
            toValue: currentHeight > THRESHOLD ? MAX_HEIGHT : MIN_HEIGHT,
            useNativeDriver: false,
            bounciness: 6,
          }).start();
        }
      }
    })
  ).current;

  // Render the Standard Single Driver UI Dynamically based on 'rideType'
  const renderStandardBooking = () => {
    let vehicleName = "Suzuki Dzire • White";
    let vehicleImage = require('../../assets/cab_icon.png');
    let driverInitials = "RK";
    let driverName = "Ramesh Kumar";

    if (rideType === 'auto') {
      vehicleName = "Piaggio Auto • Green";
      vehicleImage = require('../../assets/auto_icon.png');
      driverInitials = "SP";
      driverName = "Suresh Patel";
    } else if (rideType === 'bike') {
      vehicleName = "Honda Activa • Black";
      vehicleImage = require('../../assets/bike_icon.png');
      driverInitials = "AJ";
      driverName = "Amit Joshi";
    }

    return (
      <>
        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusTitle}>Arriving in 3 mins</Text>
            <Text style={styles.statusSub}>Your driver is on the way</Text>
          </View>
          <View style={styles.otpBox}>
            <Text style={styles.otpLabel}>OTP</Text>
            <Text style={styles.otpNumber}>8042</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.driverRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>{driverInitials}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>4.8</Text>
              <StarIcon />
            </View>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driverName}</Text>
            <Text style={styles.carModel}>{vehicleName}</Text>
            <Text style={styles.plateNumber}>GJ 01 AB 1234</Text>
          </View>
          <Image source={vehicleImage} style={styles.carImage} resizeMode="contain" />
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}><PhoneIcon /></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}><MessageIcon /></TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonWide]} activeOpacity={0.7}>
            <Text style={styles.actionButtonText}>Share Trip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.locationSummary}>
          <View style={styles.locRow}>
            <LocationDotIcon color={COLORS.green} />
            <Text style={styles.locText} numberOfLines={1}>G-103 Sanghani Platinum Narol</Text>
          </View>
          <View style={styles.locLine} />
          <View style={styles.locRow}>
            <LocationDotIcon color={COLORS.redSOS} />
            <Text style={styles.locText} numberOfLines={1}>Shreyarth University</Text>
          </View>
        </View>
      </>
    );
  };

  // Render the Multiple Tickets UI
  const renderMultiModeBooking = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.multiTitle}>Multimode Journey Confirmed</Text>
      <Text style={styles.multiSub}>Present QR codes at transit stations.</Text>
      
      {/* TICKET 1: Auto */}
      <View style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <View style={styles.ticketIconWrap}><TransportIcon id="auto" size={24} strokeColor={COLORS.navy2} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ticketModeName}>1. Auto Rickshaw</Text>
            <Text style={styles.ticketRouteText}>G-103 Sangani Platinum Narol to Narol Chokadi BRTS </Text>
          </View>
          <Text style={styles.ticketEtaText}>Arriving 3 min</Text>
        </View>
        <View style={styles.driverSubRow}>
          <Text style={styles.driverSubText}>Driver: Ramesh K.  •  GJ 01 AB 1234</Text>
          <View style={styles.miniOtp}><Text style={styles.miniOtpText}>OTP: 8042</Text></View>
        </View>
      </View>

      {/* TICKET 2: Metro */}
      <View style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <View style={[styles.ticketIconWrap, { backgroundColor: '#E3F2FD' }]}>
            <TransportIcon id="metro" size={20} strokeColor={COLORS.navy} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ticketModeName}>2. Bus</Text>
            <Text style={styles.ticketRouteText}>Narol Chokadi BRTS  to M.J. Library BRTS</Text>
          </View>
          <Text style={styles.ticketEtaText}>Departs 3:15 PM</Text>
        </View>
        
        {/* QR Code Box for Transit */}
        <View style={styles.qrContainer}>
          <View style={styles.qrVisual}>
            <QRIcon />
          </View>
          <View style={styles.qrDetails}>
            <Text style={styles.qrInstructions}>Tap to enlarge ticket</Text>
            <Text style={styles.qrSubText}>Scan at station gates</Text>
          </View>
          <TouchableOpacity style={styles.qrBtn}>
             <Text style={styles.qrBtnText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TICKET 3: Walk */}
      <View style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <View style={[styles.ticketIconWrap, { backgroundColor: '#F3F4F6' }]}>
            <TransportIcon id="walk" size={20} strokeColor={COLORS.textGray} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ticketModeName}>3. Walk</Text>
            <Text style={styles.ticketRouteText}>M.J. Library BRTS to Destination</Text>
          </View>
          <Text style={styles.ticketEtaText}>5 mins</Text>
        </View>
      </View>

    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      <View style={styles.mapContainer}>
        <WebView 
          source={{ html: leafletHTML }}
          style={styles.mapWebView}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          mixedContentMode="always"
        />

        <SafeAreaView style={styles.floatingHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sosButton} activeOpacity={0.8}>
            <ShieldIcon />
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <Animated.View style={[styles.bottomSheet, { height: sheetHeight }]}>
        <View {...panResponder.panHandlers} style={styles.dragHandleContainer}>
          <TouchableOpacity onPress={toggleSheet} style={styles.dragTouchArea}>
            <View style={styles.dragHandle} />
          </TouchableOpacity>
        </View>

        <View style={styles.sheetContent}>
           {/* Render Dynamic View based on Mode */}
           {isMultiMode ? renderMultiModeBooking() : renderStandardBooking()}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  
  mapContainer: { flex: 1, position: 'relative' },
  mapWebView: { flex: 1, backgroundColor: '#E5E5EA' },
  
  floatingHeader: {
    position: 'absolute', top: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    left: 16, right: 16, zIndex: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  backButton: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 5, elevation: 4,
  },
  sosButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.redSOS,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 22,
    shadowColor: COLORS.redSOS, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  sosText: {
    fontFamily: 'Poppins-Bold', fontSize: 14, color: '#FFFFFF',
    marginLeft: 6, marginTop: Platform.OS === 'android' ? 2 : 0,
  },

  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1, shadowRadius: 15, elevation: 15,
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  dragHandleContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 8 },
  dragTouchArea: { padding: 10 },
  dragHandle: { width: 44, height: 5, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.15)' },
  
  sheetContent: { paddingHorizontal: 20, flex: 1 },
  divider: { height: 1, backgroundColor: COLORS.borderLight, marginVertical: 14 },

  // STANDARD SINGLE RIDE STYLES
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: COLORS.navy },
  statusSub: { fontFamily: 'Poppins-Medium', fontSize: 13, color: COLORS.textGray },
  otpBox: { backgroundColor: '#F8F4ED', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E8DFD1' },
  otpLabel: { fontFamily: 'Poppins-SemiBold', fontSize: 10, color: COLORS.navy, textTransform: 'uppercase' },
  otpNumber: { fontFamily: 'Poppins-Black', fontSize: 20, color: COLORS.navy, letterSpacing: 2, marginTop: -2 },
  driverRow: { flexDirection: 'row', alignItems: 'center' },
  avatarWrapper: { position: 'relative', marginRight: 16 },
  avatarCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  avatarInitials: { fontFamily: 'Poppins-Bold', fontSize: 18, color: COLORS.navy, marginTop: Platform.OS === 'android' ? 2 : 0 },
  ratingBadge: { position: 'absolute', bottom: -4, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, borderWidth: 1, borderColor: COLORS.borderLight, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  ratingText: { fontFamily: 'Poppins-Bold', fontSize: 10, color: COLORS.navy, marginRight: 2, marginTop: Platform.OS === 'android' ? 2 : 0 },
  driverDetails: { flex: 1 },
  driverName: { fontFamily: 'Poppins-Bold', fontSize: 16, color: COLORS.navy },
  carModel: { fontFamily: 'Poppins-Medium', fontSize: 13, color: COLORS.textGray },
  plateNumber: { fontFamily: 'Poppins-Bold', fontSize: 13, color: COLORS.navy, backgroundColor: '#F3F4F6', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4, overflow: 'hidden' },
  carImage: { width: 70, height: 40 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  actionButton: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#F8F4ED', borderWidth: 1, borderColor: '#E8DFD1', justifyContent: 'center', alignItems: 'center' },
  actionButtonWide: { flex: 1, marginLeft: 12, borderRadius: 16, backgroundColor: COLORS.navy },
  actionButtonText: { fontFamily: 'Poppins-Bold', fontSize: 15, color: '#FFFFFF', marginTop: Platform.OS === 'android' ? 2 : 0 },
  locationSummary: { paddingLeft: 4 },
  locRow: { flexDirection: 'row', alignItems: 'center' },
  locText: { fontFamily: 'Poppins-Medium', fontSize: 13, color: COLORS.navy, marginLeft: 12 },
  locLine: { width: 2, height: 12, backgroundColor: COLORS.borderLight, marginLeft: 5, marginVertical: 2 },

  // MULTIMODE STYLES
  multiTitle: { fontFamily: 'Poppins-Black', fontSize: 20, color: COLORS.navy2, marginBottom: 2 },
  multiSub: { fontFamily: 'Poppins-Regular', fontSize: 14, color: COLORS.textGray, marginBottom: 16 },
  ticketCard: { 
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.borderLight, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 
  },
  ticketHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  ticketIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF9C4', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  ticketModeName: { fontFamily: 'Poppins-Bold', fontSize: 15, color: COLORS.navy2, marginTop: Platform.OS === 'android' ? 2 : 0 },
  ticketRouteText: { fontFamily: 'Poppins-Medium', fontSize: 12, color: COLORS.textGray },
  ticketEtaText: { fontFamily: 'Poppins-SemiBold', fontSize: 12, color: COLORS.navy2 },
  
  driverSubRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  driverSubText: { fontFamily: 'Poppins-Medium', fontSize: 12, color: COLORS.navy2 },
  miniOtp: { backgroundColor: '#F8F4ED', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#E8DFD1' },
  miniOtpText: { fontFamily: 'Poppins-Bold', fontSize: 11, color: COLORS.navy2 },

  qrContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.qrBg, borderRadius: 12, padding: 10, marginTop: 12 },
  qrVisual: { width: 50, height: 50, backgroundColor: '#FFFFFF', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  qrDetails: { flex: 1 },
  qrInstructions: { fontFamily: 'Poppins-Bold', fontSize: 13, color: COLORS.navy2 },
  qrSubText: { fontFamily: 'Poppins-Medium', fontSize: 11, color: COLORS.textGray },
  qrBtn: { backgroundColor: COLORS.navy, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  qrBtnText: { fontFamily: 'Poppins-Bold', fontSize: 12, color: '#FFFFFF', marginTop: Platform.OS === 'android' ? 2 : 0 },
});