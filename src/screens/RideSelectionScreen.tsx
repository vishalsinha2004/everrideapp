import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  Image,
  Modal,
} from 'react-native';
import Svg, { Path, Circle, Line, Rect, Polyline } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';

const COLORS = {
  gradientTop: '#F8F4ED',
  gradientBottom: '#E8DFD1',
  navy: '#122C6F',
  navy2: '#0E2255',
  gold: '#EDAB0C',
  textGray: '#8A8D9F',
  lightGray: '#F5F6F8',
  green: '#1E8E3E',
  redSurge: '#D93025',
  borderLight: 'rgba(255, 255, 255, 0.6)',
  borderSolid: '#E5E7EB',
};

// --- ICONS ---
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Line x1="19" y1="12" x2="5" y2="12" />
    <Polyline points="12 19 5 12 12 5" />
  </Svg>
);

const UserIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.navy2} stroke="none">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

const SurgeIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.redSurge} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Line x1="12" y1="16" x2="12" y2="8" />
    <Polyline points="8 12 12 8 16 12" />
  </Svg>
);

const CashIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="2" y="6" width="20" height="12" rx="2" />
    <Circle cx="12" cy="12" r="2" />
    <Path d="M6 12h.01M18 12h.01" />
  </Svg>
);



const ChevronRight = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 18l6-6-6-6" />
  </Svg>
);

const EditIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textGray} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Svg>
);

// --- REALISTIC TRANSPORT ICONS ---
const TransportIcon = ({ id, size, forceSvgColor }: { id: string, size: number, forceSvgColor?: string }) => {
  const strokeW = "1.8";
  const svgColor = forceSvgColor || COLORS.navy2;

  switch (id) {
    case 'bike':
      return <Image source={require('../../assets/bike_icon.png')} style={{ width: size, height: size }} resizeMode="contain" />;
    case 'auto':
      return <Image source={require('../../assets/auto_icon.png')} style={{ width: size, height: size }} resizeMode="contain" />;
    case 'cab':
    case 'cab_eco':
    case 'cab_premium':
      return <Image source={require('../../assets/cab_icon.png')} style={{ width: size + 10, height: size + 10 }} resizeMode="contain" />;

    case 'bus':
      return <Image source={require('../../assets/bus_icon.png')} style={{ width: size + 10, height: size + 10 }} resizeMode="contain" />;
    case 'metro':
      return <Image source={require('../../assets/metro_icon.png')} style={{ width: size + 20, height: size + 20 }} resizeMode="contain" />;

    case 'multimode':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={svgColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M16 3h5v5" />
          <Path d="M4 20L21 3" />
          <Path d="M21 16v5h-5" />
          <Path d="M15 15l6 6" />
          <Path d="M4 4l5 5" />
        </Svg>
      );
    case 'walk':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={svgColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="4" r="2" />
          <Path d="M12 6v6" />
          <Path d="M12 12l-3 5" />
          <Path d="M12 12l3 5" />
          <Path d="M8 8l4 2 4-2" />
        </Svg>
      );
    default:
      return null;
  }
};

// --- EXPANDED RIDE DATA ---
const RIDE_OPTIONS = [
  { id: 'bike', title: 'Bike', pax: 1, desc: 'Quick Bike rides', eta: '4 mins away', drop: 'Drop 3:15 pm', price: 90, isSurge: true },
  { id: 'auto', title: 'Auto', pax: 3, desc: 'Affordable everyday transport', eta: '4 mins away', drop: 'Drop 3:17 pm', price: 170, isSurge: false },
  { id: 'cab_eco', title: 'Cab Economy', pax: 4, desc: 'Standard door-to-door rides', eta: '5 mins away', drop: 'Drop 3:18 pm', price: 210, isSurge: false },
  // { id: 'bus', title: 'Bus', pax: 1, desc: 'Eco-friendly and affordable', eta: 'On time', drop: 'Drop 3:40 pm', price: 20, isSurge: false },
  { id: 'multimode', title: 'Multimode', pax: 1, desc: 'Smart combo for best route', eta: 'Mixed', drop: 'Drop 3:25 pm', price: 50, isSurge: false },
];

// --- MULTIMODE POPUP DATA (Added Prices) ---
const MULTIMODE_LEGS = [
  { id: 'leg1', type: 'auto', name: 'Auto', time: '10 min', start: 'G-103 Sanghani Platinum', end: 'Narol Chokadi BRTS', price: 30 },
  { id: 'leg2', type: 'bus', name: 'Bus', time: '15 min', start: 'Narol Chokadi BRTS', end: 'M.J. Library BRTS', price: 20 },
  { id: 'leg3', type: 'walk', name: 'Walk', time: '2 min', start: 'M.J. Library BRTS', end: 'Final Destination', price: 0 }
];

// --- LEAFLET HTML INJECTION ---
const leafletHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
  <style>
    body, html { padding: 0; margin: 0; width: 100%; height: 100%; background-color: transparent !important; }
    #map { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: transparent !important; }
    .leaflet-control-attribution { display: none; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      var map = L.map('map', { zoomControl: false, zoomAnimation: false }).setView([23.0225, 72.5714], 14);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      var pickup = L.latLng(23.0660, 72.5750); 
      var drop = L.latLng(23.0180, 72.6000);   

      var pickupIcon = L.divIcon({ className: '', html: "<div style='background-color:#1E8E3E;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);'></div>", iconSize: [20, 20], iconAnchor: [10, 10]});
      var dropIcon = L.divIcon({ className: '', html: "<div style='background-color:#D93025;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);'></div>", iconSize: [20, 20], iconAnchor: [10, 10]});

      L.marker(pickup, {icon: pickupIcon}).addTo(map);
      L.marker(drop, {icon: dropIcon}).addTo(map);

      var latlngs = [pickup, [23.0240, 72.5780], [23.0200, 72.5820], drop];
      var polyline = L.polyline(latlngs, {color: '#122C6F', weight: 4, opacity: 0.9}).addTo(map);
      
      map.fitBounds(polyline.getBounds(), { paddingBottomRight: [0, 150], paddingTopLeft: [50, 50] });
    });
  </script>
</body>
</html>
`;

export default function RideSelectionScreen({ navigation }: any) {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [selectedRideId, setSelectedRideId] = useState('bike');
  const [showMultimodeModal, setShowMultimodeModal] = useState(false);

  const selectedRide = RIDE_OPTIONS.find(r => r.id === selectedRideId);

  // Handle ride selection. If Multimode is selected, show the popup.
  const handleRideSelection = (id: string) => {
    setSelectedRideId(id);
    if (id === 'multimode') {
      setShowMultimodeModal(true);
    }
  };

  return (
    <LinearGradient colors={[COLORS.gradientTop, COLORS.gradientBottom]} style={styles.gradientBackground}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* --- TOP MAP AREA --- */}
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
          androidLayerType="hardware"
        />

        <SafeAreaView style={styles.floatingHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.floatingLocations}>
          <TouchableOpacity style={styles.locationPill} activeOpacity={0.8}>
            <Text style={styles.locationText} numberOfLines={1}>G-103 Sangani Platinum Narol</Text>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationPill} activeOpacity={0.8}>
            <Text style={styles.locationText} numberOfLines={1}>Shreyarth University</Text>
            <EditIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- BOTTOM SHEET (RIDE SELECTION) --- */}
      <View style={[styles.bottomSheet, { maxHeight: SCREEN_HEIGHT * 0.58 }]}>

        <View style={styles.dragHandle} />

        {/* Scrollable Ride Options */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {RIDE_OPTIONS.map((ride) => {
            const isSelected = selectedRideId === ride.id;
            return (
              <TouchableOpacity
                key={ride.id}
                style={[styles.rideCard, isSelected && styles.rideCardSelected]}
                activeOpacity={0.8}
                onPress={() => handleRideSelection(ride.id)}
              >
                {/* Vehicle Icon */}
                <View style={styles.rideIconContainer}>
                  <TransportIcon id={ride.id} size={46} />
                </View>

                {/* Ride Details */}
                <View style={styles.rideDetails}>
                  <View style={styles.titleRow}>
                    <Text style={styles.rideTitle}>{ride.title}</Text>
                    {ride.pax > 1 && (
                      <View style={styles.paxBadge}>
                        <UserIcon />
                        <Text style={styles.paxText}>{ride.pax}</Text>
                      </View>
                    )}
                  </View>

                  {ride.desc ? <Text style={styles.rideDesc}>{ride.desc}</Text> : null}

                  <Text style={styles.rideTimeText}>
                    {ride.eta} <Text style={styles.dotSeparator}>•</Text> {ride.drop}
                  </Text>
                </View>

                {/* Price & Surge */}
                <View style={styles.priceContainer}>
                  {ride.isSurge && <SurgeIcon />}
                  <Text style={styles.priceText}>₹{ride.price}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* --- FIXED BOTTOM ACTION AREA --- */}
        <View style={styles.actionFooter}>
          <View style={styles.paymentOffersRow}>
            <TouchableOpacity style={styles.footerPill}>
              <CashIcon />
              <Text style={styles.footerPillText}>Cash</Text>
              <ChevronRight />
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity style={styles.footerPill}>
              
              <Text style={styles.footerPillText}>% Offers</Text>
              <ChevronRight />
            </TouchableOpacity>
          </View>

          {/* Slimmer, Professional Navy Button */}
          <TouchableOpacity
            style={styles.bookButton}
            activeOpacity={0.8}
            onPress={() => {
              if (selectedRideId === 'multimode') {
                setShowMultimodeModal(true);
              } else {
                navigation.navigate('Booking', { isMultimode: false, selectedRideId: selectedRide?.id });
              }
            }}
          >
            <Text style={styles.bookButtonText}>Book {selectedRide?.title}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- MULTIMODE POPUP MODAL (Matches Screenshot) --- */}
      <Modal
        visible={showMultimodeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMultimodeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select the way to travel</Text>
              <TouchableOpacity onPress={() => setShowMultimodeModal(false)} style={styles.closeBtn}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              </TouchableOpacity>
            </View>

            {/* Total Estimated Time & Price */}
            <View style={styles.modalSummary}>
              <Text style={styles.modalTotalTime}>Total: ~30 mins</Text>
              <Text style={styles.modalTotalPrice}>₹50</Text>
            </View>

            {/* The Multi-Leg Timeline */}
            <View style={styles.timelineContainer}>
              {MULTIMODE_LEGS.map((leg, index) => (
                <View key={leg.id} style={styles.timelineLeg}>
                  {/* Left Column: Icons & Lines */}
                  <View style={styles.timelineVisuals}>
                    <View style={[styles.timelineIconBox, leg.type === 'walk' && styles.timelineIconBoxWalk]}>
                      <TransportIcon id={leg.type} size={20} forceSvgColor={leg.type === 'walk' ? COLORS.textGray : COLORS.navy2} />
                    </View>
                    {/* Don't show dashed line after the last item */}
                    {index < MULTIMODE_LEGS.length - 1 && <View style={styles.timelineDashedLine} />}
                  </View>

                  {/* Right Column: Text Details */}
                  <View style={styles.timelineTextContent}>
                    <View style={styles.legHeaderRow}>
                      <Text style={styles.legTitle}>{leg.name}</Text>
                      <Text style={styles.legTime}>{leg.time} • {leg.price === 0 ? 'Free' : `₹${leg.price}`}</Text>
                    </View>
                    <Text style={styles.legSubText}>From: {leg.start}</Text>
                    <Text style={styles.legSubText}>To: {leg.end}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Confirm Journey Button */}
            <TouchableOpacity
              style={[styles.bookButton, { marginTop: 24, marginBottom: Platform.OS === 'ios' ? 20 : 0 }]}
              activeOpacity={0.8}
              onPress={() => {
                setShowMultimodeModal(false);
                navigation.navigate('Booking', { isMultimode: true, selectedRideId: 'multimode' });
              }}
            >
              <Text style={styles.bookButtonText}>Confirm Journey</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },

  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapWebView: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 0.99,
  },
  floatingHeader: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  floatingLocations: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 60 : 70,
    left: 16,
    zIndex: 10,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: 150,
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.navy2,
    marginRight: 8,
    flexShrink: 1,
  },

  bottomSheet: {
    backgroundColor: COLORS.gradientTop, // Using the cream tint
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  // GLASSMORPHISM RIDE CARDS
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  rideCardSelected: {
    borderColor: COLORS.navy,
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  rideIconContainer: {
    width: 60,
    alignItems: 'center',
    marginRight: 12,
  },
  rideDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rideTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.navy2,
    marginRight: 8,
    marginTop: Platform.OS === 'android' ? 2 : 0,
  },
  paxBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paxText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: COLORS.navy2,
    marginLeft: 4,
    marginTop: Platform.OS === 'android' ? 2 : 0,
  },
  rideDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.textGray,
    marginBottom: 2,
  },
  rideTimeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.textGray,
  },
  dotSeparator: {
    fontSize: 10,
    color: COLORS.textGray,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  priceText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.navy2,
    marginLeft: 4,
  },

  actionFooter: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  paymentOffersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  footerPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  footerPillText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.navy2,
    marginHorizontal: 8,
    marginTop: Platform.OS === 'android' ? 2 : 0,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  bookButton: {
    backgroundColor: COLORS.navy,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 2 : 0,
  },

  // --- MULTIMODE MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // Pushes modal to bottom
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: COLORS.navy2,
  },
  closeBtn: {
    padding: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
  },
  modalSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.borderSolid,
  },
  modalTotalTime: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: COLORS.navy2,
  },
  modalTotalPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: COLORS.navy2,
  },

  // TIMELINE
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineLeg: {
    flexDirection: 'row',
  },
  timelineVisuals: {
    alignItems: 'center',
    marginRight: 16,
    width: 36,
  },
  timelineIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(18, 44, 111, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineIconBoxWalk: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.borderSolid,
  },
  timelineDashedLine: {
    width: 2,
    height: 40,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginVertical: 4,
  },
  timelineTextContent: {
    flex: 1,
    paddingBottom: 24,
  },
  legHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  legTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.navy2,
  },
  legTime: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: COLORS.textGray,
  },
  legSubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: COLORS.textGray,
    marginBottom: 2,
  },
});